import React, { useState, useEffect, useRef } from "react";
import { apiFetch } from "@/api/http";
import { useUserBalances } from "@/hooks/useUserBalances";
import { createOrder } from "@/api/order";   // ⭐ 新增
import { useTicker } from "@/hooks/useTicker";

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

// 遮罩 & 底部弹窗
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

// 下单弹窗组件
const OrderForm = ({ symbol, modalType, price, onClose }) => {
  const [customAmount, setCustomAmount] = useState("");
  const [localBalance, setLocalBalance] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const { balances: userBalances, controlMode } = useUserBalances();

  const buyPrice = price;

  const periods = [
    { time: 60, percent: 0.25 },
    { time: 90, percent: 0.3 },
    { time: 120, percent: 0.37 },
    { time: 180, percent: 0.5 },
    { time: 360, percent: 0.7 },
  ];

  // 同步后台余额
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

  // 确认下单
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

  // 前端立即扣款（UI）
  setLocalBalance((prev) => prev - amount);

  try {
    const data = await createOrder({
      symbol,
      amount,
      direction: modalType === "Buy Up" ? "LONG" : "SHORT",
    });

    // 后端下单失败
    if (!data || data.error) {
      setLocalBalance((prev) => prev + amount);
      alert(data?.error || "Order failed");
      return;
    }

    // ⭐ 正确定义 p
    const p = periods.find((x) => x.time === selectedPeriod);

    // ⭐ 正确设置 countdown（只设置一次）
    setCountdown({
      ...p,
      amount,
      startPrice: buyPrice,
      orderId: data.order.id,   // ⭐ 很关键！
    });

    // 正确开启倒计时
    setTimeLeft(p.time);

  } catch (err) {
    // 网络失败恢复扣款
    setLocalBalance((prev) => prev + amount);
    alert("Network error");
  }
};


  // 倒计时逻辑
  useEffect(() => {
    if (!countdown || timeLeft <= 0) return;

    const timer = setTimeout(() => {
      if (timeLeft > 1) setTimeLeft((t) => t - 1);
      else handleFinish();
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, countdown]);

  // 完成结算
  const handleFinish = async () => {
    const { amount, percent, startPrice } = countdown;

    let isWin;
    if (controlMode === "win") isWin = true;
    else if (controlMode === "lose") isWin = false;
    else isWin = Math.random() > 0.5;

    const profit = isWin ? amount * percent : -amount;
    const closePrice = startPrice + (Math.random() * 100 - 50);

    setLocalBalance((prev) => (isWin ? prev + amount + profit : prev));

    try {
await apiFetch("/api/order/settle", {
  method: "POST",
  body: JSON.stringify({
    orderId: countdown.orderId,   // ⭐ 用刚才保存的 orderId
    isWin,
    percent,
  }),
});

    } catch (err) {}

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
  // 倒计时界面
  if (countdown) {
    const progress = ((countdown.time - timeLeft) / countdown.time) * 100;
    const arcColor = modalType === "Buy Fall" ? "#e74c3c" : "#26a17b";

    return (
      <div style={{ textAlign: "center", padding: "10px" }}>
        <h2
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            marginBottom: "10px",
            color: "#555",
          }}
        >
          {symbol}
        </h2>

        {/* 圆圈倒计时 */}
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
              color: "#555",
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
            color: "#555",
          }}
        >
          <div>
            close a position{" "}
            <span style={{ float: "right" }}>
              {(countdown.startPrice + (Math.random() * 200 - 100)).toFixed(2)}
            </span>
          </div>
          <div>
            Cycle <span style={{ float: "right" }}>{countdown.time}</span>
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
            <span style={{ float: "right" }}>{countdown.amount.toFixed(2)}</span>
          </div>
          <div>
            buy{" "}
            <span style={{ float: "right" }}>
              {countdown.startPrice.toFixed(2)}
            </span>
          </div>
          <div>
            Expected{" "}
            <span style={{ float: "right" }}>
              {(countdown.amount * countdown.percent).toFixed(2)}
            </span>
          </div>
        </div>

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
          }}
          disabled
        >
          continue
        </button>
      </div>
    );
  }

  // 结算结果
  if (result) {
    const isWin = result.profit > 0;

    return (
      <div style={{ textAlign: "center", padding: "10px" }}>
        <h2
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            marginBottom: "10px",
            color: "#555",
          }}
        >
          {symbol}
        </h2>

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
            color: "#555",
          }}
        >
          <div>
            Closing unit price{" "}
            <span style={{ float: "right" }}>
              {result.closePrice.toFixed(2)}
            </span>
          </div>
          <div>
            Cycle{" "}
            <span style={{ float: "right" }}>{result.cycle}</span>
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
          }}
          onClick={() => window.location.reload()}
        >
          continue
        </button>
      </div>
    );
  }

  // 初始下单界面
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

// =================== 主交易页面 ===================
const Trade = () => {
  const [currentSymbol, setCurrentSymbol] = useState("BTCUSDT");
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");


const symbolsList = ["BTCUSDT", "ETHUSDT", "LTCUSDT", "XRPUSDT"];

const handleSymbolChange = (symbol) => {
  setCurrentSymbol(symbol);
  setShowMenu(false);
};

// ⭐ 使用前端直接连接 Binance 的实时行情 Hook
const {
  price,
  changePercent,
  low,
  high,
  amount24h,
} = useTicker(currentSymbol);

// ⭐ changePercent 在这里才有值，所以 priceColor 要写在这里
const priceColor = changePercent >= 0 ? "#2ecc71" : "#e74c3c";



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

        <div style={{ width: "24px" }} />
      </div>

      {/* 行情条 */}
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

      {/* 底部 买涨/买跌 */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          padding: "12px 16px",
          borderTop: "1px solid #eee",
        }}
      >
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

      {/* 下单弹窗 */}
      {showModal && (
        <BottomModal onClose={() => setShowModal(false)}>
          <OrderForm symbol={currentSymbol} modalType={modalType} price={price} />
        </BottomModal>
      )}
    </div>
  );
};

export default Trade;
