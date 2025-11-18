import React, { useState, useEffect, useRef } from "react";
import { apiFetch } from "@/api/http";
import { useUserBalances } from "@/hooks/useUserBalances";

// TradingView 图表组件
const TradingViewWidget = ({ symbol }) => {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!widgetRef.current) return;
    widgetRef.current.innerHTML = "";

    const initWidget = () => {
      new window.TradingView.widget({
        container_id: widgetRef.current.id,
        symbol: `BINANCE:${symbol}`,
        interval: "1",
        timezone: "Etc/UTC",
        theme: "light",
        style: "1",
        locale: "en",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
        hideideas: true,
      });
    };

    if (!window.TradingView) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = initWidget;
      document.body.appendChild(script);
    } else {
      initWidget();
    }
  }, [symbol]);

  return <div ref={widgetRef} id="tv_widget" style={{ flex: 1, minHeight: 0 }} />;
};

// 弹窗遮罩 + 底部弹窗组件
const BottomModal = ({ children, onClose }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.3)",
    }}
    onClick={onClose}
  >
    <div
      style={{
        height: "80%",
        backgroundColor: "#fff",
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        padding: "20px 20px 10px 20px",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <button
          onClick={onClose}
          style={{
            fontSize: "18px",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>{children}</div>
    </div>
  </div>
);

// ✅ 下单弹窗组件，带真实余额显示 + 可点击选择周期
const OrderForm = ({ symbol, modalType, price, onClose }) => {
  const [customAmount, setCustomAmount] = useState("");
  const [localBalance, setLocalBalance] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  // ⭐ 从后端拿余额 + 控盘模式（记得顶部 import useUserBalances）
  const { balances: userBalances, controlMode } = useUserBalances();

  const buyPrice = price;

  const periods = [
    { time: 60, percent: 0.25 },
    { time: 90, percent: 0.3 },
    { time: 120, percent: 0.37 },
    { time: 180, percent: 0.5 },
    { time: 360, percent: 0.7 },
  ];

// ⭐ 当后端余额变化时，同步到本地 localBalance（这里用 USDT）
useEffect(() => {
  const usdt = Number(
    userBalances?.USDT ??
    userBalances?.usdt ??
    userBalances?.USD ??
    userBalances?.USDC ??
    0
  );
  setLocalBalance(usdt);
}, [userBalances]);


// ✅ 确认下单
const handleConfirm = async () => {
  if (!selectedPeriod || !customAmount) {
    alert("Please select a period and enter amount");
    return;
  }

  const amount = parseFloat(customAmount);
  if (isNaN(amount) || amount <= 0) {
    alert("Invalid amount");
    return;
  }

  if (localBalance < amount) {
    alert("Insufficient balance");
    return;
  }

  // 1️⃣ 本地先扣钱，做个乐观更新
  setLocalBalance((prev) => prev - amount);

  try {
    // 用你已经在用的 apiFetch，自动带 baseURL/headers/token
    const data = await apiFetch("/api/order/create", {
      method: "POST",
      body: JSON.stringify({
        amount,
        period: selectedPeriod,
        type: modalType,     // "Buy Up" / "Buy Fall"
        symbol: "USDT",      // 你现在是用 USDT 余额
        price: buyPrice,     // 当前买入价
      }),
    });

    // 如果后端返回错误结构（有 error 字段）
    if (!data || data.error) {
      // 回滚本地余额
      setLocalBalance((prev) => prev + amount);
      alert(data?.error || "Order create failed");
      return;
    }

    // ✅ 与后端余额同步（以服务端为准）
    if (typeof data.balance === "number") {
      setLocalBalance(data.balance);
    }

    console.log("✅ 订单创建 & 后端余额已更新:", data);

    // 3️⃣ 进入倒计时阶段
    const p = periods.find((x) => x.time === parseInt(selectedPeriod));
    setCountdown({
      ...p,
      amount,
      startPrice: buyPrice,
    });
    setTimeLeft(p.time);
  } catch (err) {
    console.error("❌ 创建订单失败:", err);
    // 网络出问题，回滚
    setLocalBalance((prev) => prev + amount);
    alert("Network error, please try again");
  }
};



  // ✅ 倒计时逻辑
  useEffect(() => {
    if (!countdown || timeLeft <= 0) return;

    const timer = setTimeout(() => {
      if (timeLeft > 1) {
        setTimeLeft((t) => t - 1);
      } else {
        handleFinish();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, countdown]);

const handleFinish = async () => {
  const { amount, percent, startPrice } = countdown;

  // ⭐ 根据控盘模式决定输赢
  let isWin;
  if (controlMode === "win") {
    isWin = true;               // 控赢：固定赢
  } else if (controlMode === "lose") {
    isWin = false;              // 控输：固定输
  } else if (controlMode === "random") {
    isWin = Math.random() > 0.5; // 随机
  } else {
    // normal 或 undefined → 当随机
    isWin = Math.random() > 0.5;
  }

  const profit = isWin ? amount * percent : -amount;
  const closePrice = startPrice + (Math.random() * 100 - 50);

  // 1️⃣ 本地 UI 更新（赢：退本金 + 利润；输：不返）
  setLocalBalance((prev) => {
    if (isWin) return prev + amount + profit;
    return prev;
  });

  // 2️⃣ 通知后端结算
  try {
    await apiFetch("/api/user/balance/settle", {
      method: "POST",
      body: JSON.stringify({
        amount,
        percent,
        isWin,
        symbol: "USDT",
      }),
    });

    console.log("✅ 结算同步成功");
  } catch (err) {
    console.error("❌ 结算同步失败:", err);
  }

  // 3️⃣ 完成结算显示
  setCountdown(null);
  setResult({
    isWin,
    profit,
    amount,
    startPrice,
    closePrice,
    percent,
    type: modalType,
    cycle: selectedPeriod,
  });
};

  // ✅ 倒计时圆圈
  const CircleTimer = ({ time, total }) => {
    const percent = ((total - time) / total) * 100;
    return (
      <div
        style={{
          position: "relative",
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: `conic-gradient(#f1c40f ${percent * 3.6}deg, #ddd 0deg)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "20px auto",
        }}
      >
        <div
          style={{
            position: "absolute",
            background: "#fff",
            borderRadius: "50%",
            width: 120,
            height: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          {time}
        </div>
      </div>
    );
  };

// 🕒 倒计时界面（灰色文字版本）
if (countdown) {
  const progress = ((countdown.time - timeLeft) / countdown.time) * 100;
  const arcColor = modalType === "Buy Fall" ? "#e74c3c" : "#26a17b";

  return (
    <div style={{ textAlign: "center", padding: "10px" }}>
      {/* 标题 */}
      <h2
        style={{
          fontWeight: "bold",
          fontSize: "18px",
          marginBottom: "10px",
          color: "#555", // 改灰色
        }}
      >
        {symbol}
      </h2>

      {/* 圆形倒计时 */}
      <div
        style={{
          position: "relative",
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: `conic-gradient(${arcColor} ${
            progress * 3.6
          }deg, #ddd 0deg)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "20px auto",
        }}
      >
        <div
          style={{
            position: "absolute",
            background: "#fff",
            borderRadius: "50%",
            width: 120,
            height: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            fontWeight: "bold",
            color: "#555", // 数字也改灰色
          }}
        >
          {timeLeft}
        </div>
      </div>

      {/* 信息框 */}
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "12px",
          marginTop: "10px",
          textAlign: "left",
          fontSize: "14px",
          lineHeight: "1.8",
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
          color: "#555", // 全局字体灰
        }}
      >
        <div>
          close a position{" "}
          <span style={{ float: "right" }}>
            {(countdown.startPrice + (Math.random() * 200 - 100)).toFixed(2)}
          </span>
        </div>
        <div>
          Cycle{" "}
          <span style={{ float: "right" }}>{countdown.time.toFixed(0)}</span>
        </div>
        <div>
          Type{" "}
          <span
            style={{
              float: "right",
              color: modalType === "Buy Fall" ? "#e74c3c" : "#26a17b",
              fontWeight: "bold",
            }}
          >
            {modalType}
          </span>
        </div>
        <div>
          Money{" "}
          <span style={{ float: "right" }}>
            {countdown.amount.toFixed(2)}
          </span>
        </div>
        <div>
          buy{" "}
          <span style={{ float: "right" }}>{countdown.startPrice.toFixed(2)}</span>
        </div>
        <div>
          Expected{" "}
          <span style={{ float: "right" }}>
            {(countdown.amount * countdown.percent).toFixed(2)}
          </span>
        </div>
      </div>

      {/* continue 按钮 */}
      <button
        style={{
          backgroundColor: "#26a17b",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "12px 0",
          marginTop: "20px",
          width: "90%",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        disabled
      >
        continue
      </button>
    </div>
  );
}

// ✅ 倒计时结束后显示结算画面
if (result) {
  const isWin = result.profit > 0;

  return (
    <div style={{ textAlign: "center", padding: "10px" }}>
      {/* 标题 */}
      <h2
        style={{
          fontWeight: "bold",
          fontSize: "18px",
          marginBottom: "10px",
          color: "#555", // 灰色标题
        }}
      >
        {symbol}
      </h2>

      {/* 盈亏金额框 */}
      <div
        style={{
          border: `1px solid ${isWin ? "#26a17b" : "#e74c3c"}`,
          borderRadius: "8px",
          padding: "25px 0",
          margin: "20px auto",
          width: "90%",
          color: isWin ? "#26a17b" : "#e74c3c",
          fontSize: "22px",
          fontWeight: "bold",
          backgroundColor: "#fff",
        }}
      >
        {isWin ? "+" : "-"}
        {Math.abs(result.profit).toFixed(4)}
      </div>

      {/* 信息框 */}
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "12px",
          textAlign: "left",
          fontSize: "14px",
          lineHeight: "1.8",
          width: "90%",
          margin: "0 auto",
          color: "#555", // 全部灰色
        }}
      >
        <div>
          Closing unit price{" "}
          <span style={{ float: "right" }}>
            {result.closePrice.toFixed(2)}
          </span>
        </div>
        <div>
          Cycle <span style={{ float: "right" }}>{result.cycle}</span>
        </div>
        <div>
          Type{" "}
          <span
            style={{
              float: "right",
              color: modalType === "Buy Fall" ? "#e74c3c" : "#26a17b",
              fontWeight: "bold",
            }}
          >
            {modalType}
          </span>
        </div>
        <div>
          Money{" "}
          <span style={{ float: "right" }}>
            {result.amount.toFixed(2)}
          </span>
        </div>
        <div>
          buy{" "}
          <span style={{ float: "right" }}>
            {result.startPrice.toFixed(2)}
          </span>
        </div>
      </div>

      {/* continue 按钮 */}
      <button
        style={{
          backgroundColor: "#26a17b",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "12px 0",
          marginTop: "20px",
          width: "90%",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => window.location.reload()}
      >
        continue
      </button>
    </div>
  );
}


  // 🎯 初始下单界面（保留你的原样式）
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        minHeight: 0,
      }}
    >
      <div style={{ fontSize: "12px", color: "#999" }}>Selection Period</div>
      <div
        style={{
          display: "flex",
          gap: "12px",
          overflowX: "auto",
          paddingBottom: "8px",
        }}
      >
        {periods.map((p) => {
          const isSelected = selectedPeriod === p.time;
          return (
            <div
              key={p.time}
              onClick={() => setSelectedPeriod(p.time)}
              style={{
                minWidth: "70px",
                flex: "0 0 auto",
                backgroundColor: isSelected ? "#f1c40f" : "#2ecc71",
                borderRadius: "10px",
                padding: "10px 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "#fff",
                fontSize: "12px",
                textAlign: "center",
                cursor: "pointer",
                transform: isSelected ? "scale(1.05)" : "scale(1)",
                transition: "all 0.2s ease",
              }}
            >
              <div>{p.time}s</div>
              <div>{(p.percent * 100).toFixed(0)}%</div>
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: "12px", color: "#999" }}>Custom amount</div>
      <input
        type="number"
        placeholder="Please enter amount"
        value={customAmount}
        onChange={(e) => setCustomAmount(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          color: "#2ecc71",
          fontSize: "14px",
        }}
      />

      <div style={{ fontSize: "12px", color: "#999" }}>
  Balance:{" "}
  <span style={{ color: "#2ecc71", fontWeight: "bold" }}>
    {localBalance.toFixed(4)} USDT
  </span>
</div>



      <button
        style={{
          marginTop: "auto",
          backgroundColor: "#f1c40f",
          color: "#fff",
          padding: "14px",
          borderRadius: "10px",
          border: "none",
          fontSize: "16px",
          cursor: "pointer",
          opacity: selectedPeriod ? 1 : 0.6,
        }}
        disabled={!selectedPeriod}
        onClick={handleConfirm}
      >
        Confirm Order
      </button>
    </div>
  );
};


// 主交易页面
const Trade = () => {
  const [currentSymbol, setCurrentSymbol] = useState("BTCUSDT");
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [price, setPrice] = useState(0);
  const [changePercent, setChangePercent] = useState(0);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(0);
  const [amount24h, setAmount24h] = useState(0);
  const wsRef = useRef(null);

  const symbolsList = ["BTCUSDT", "ETHUSDT", "LTCUSDT", "XRPUSDT"];
  const priceColor = changePercent >= 0 ? "#2ecc71" : "#e74c3c";

  const handleSymbolChange = (symbol) => {
    setCurrentSymbol(symbol);
    setShowMenu(false);
  };

  useEffect(() => {
    if (wsRef.current) wsRef.current.close();
    const ws = new WebSocket("wss://crypto-ht.onrender.com");
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrice(parseFloat(data.c));
      setChangePercent(parseFloat(data.P));
      setLow(parseFloat(data.l));
      setHigh(parseFloat(data.h));
      setAmount24h(parseFloat(data.v));
    };

    return () => ws.close();
  }, [currentSymbol]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        overflow: "hidden",
      }}
    >
      {/* 顶部导航 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderBottom: "1px solid #eee",
          color: "#666",
          position: "relative",
        }}
      >
        <button
          onClick={() => window.history.back()}
          style={{
            fontSize: "18px",
            color: "#666",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          ←
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            gap: "5px",
            position: "relative",
          }}
        >
          <button
            onClick={() => setShowMenu(!showMenu)}
            style={{
              fontSize: "18px",
              color: "#666",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            ☰
          </button>
          <span>{currentSymbol}</span>
          {showMenu && (
            <div
              style={{
                position: "absolute",
                top: "30px",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "6px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                zIndex: 10,
              }}
            >
              {symbolsList.map((symbol) => (
                <div
                  key={symbol}
                  onClick={() => handleSymbolChange(symbol)}
                  style={{
                    padding: "10px 14px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                    color: "#666",
                  }}
                >
                  {symbol}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ width: "24px" }}></div>
      </div>

      {/* 行情信息 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px",
          borderBottom: "1px solid #eee",
          fontSize: "14px",
          color: "#666",
          backgroundColor: "#fafafa",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "22px", fontWeight: "bold", color: priceColor }}>
            ${price.toLocaleString()}
          </span>
          <span style={{ fontSize: "14px", color: priceColor }}>
            {changePercent >= 0 ? "+" : ""}
            {changePercent}%
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <span>Low</span>
          <span>High</span>
          <span>24h Amount</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <span>{low}</span>
          <span>{high}</span>
          <span>{amount24h}</span>
        </div>
      </div>

      {/* TradingView 图表 */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <TradingViewWidget symbol={currentSymbol} />
      </div>

      {/* 底部买涨/买跌按钮 */}
      <div style={{ display: "flex", gap: "12px", padding: "12px 16px", borderTop: "1px solid #eee" }}>
        <button
          style={{
            flex: 1,
            backgroundColor: "#2ecc71",
            color: "#fff",
            padding: "16px 0",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
          onClick={() => {
            setModalType("Buy Up");
            setShowModal(true);
          }}
        >
          Buy Up
        </button>

        <button
          style={{
            flex: 1,
            backgroundColor: "#e74c3c",
            color: "#fff",
            padding: "16px 0",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
          onClick={() => {
            setModalType("Buy Fall");
            setShowModal(true);
          }}
        >
          Buy Fall
        </button>
      </div>

      {/* 弹窗 */}
      {showModal && (
        <BottomModal onClose={() => setShowModal(false)}>
          <OrderForm symbol={currentSymbol} modalType={modalType} price={price} />
        </BottomModal>
      )}
    </div>
  );
};

export default Trade;
