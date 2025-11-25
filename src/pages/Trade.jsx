import React, { useState, useEffect, useRef } from "react";
import { apiFetch } from "@/api/http";
import { useUserBalances } from "@/hooks/useUserBalances";
import { createOrder } from "@/api/order";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { coinIcons } from "../assets/coinIcons";
import { useOkxTickers } from "@/hooks/useOkxTickers";

const SYMBOLS = [
  "BTC-USDT","ETH-USDT","BNB-USDT","SOL-USDT","XRP-USDT",
  "DOGE-USDT","ADA-USDT","TRX-USDT","AVAX-USDT","DOT-USDT",
  "LTC-USDT","LINK-USDT","ATOM-USDT","FIL-USDT","BCH-USDT",
  "MATIC-USDT","TON-USDT","ICP-USDT","APT-USDT","NEAR-USDT",
  "SAND-USDT","MANA-USDT","ARB-USDT","OP-USDT","SUI-USDT"
];

/* ===================== TradingView 图表 ===================== */
const TradingViewWidget = ({ symbol, onPrice }) => {
  const containerRef = useRef(null);
  const tvWidgetRef = useRef(null);
  const widgetId = useRef(`tv_${symbol}_${Date.now()}`);

  useEffect(() => {
    let mounted = true;

    const loadTV = () =>
      new Promise((resolve) => {
        if (window.TradingView?.widget) return resolve();

        if (document.getElementById("tv_script")) {
          const wait = () =>
            window.TradingView?.widget ? resolve() : setTimeout(wait, 50);
          return wait();
        }

        const script = document.createElement("script");
        script.id = "tv_script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.onload = resolve;
        document.body.appendChild(script);
      });

    const init = async () => {
      await loadTV();
      if (!mounted || !containerRef.current) return;

      tvWidgetRef.current = new window.TradingView.widget({
        container_id: widgetId.current,
        symbol: `BINANCE:${symbol}`,
        interval: "1",
        timezone: "Etc/UTC",
        style: "1",
        locale: "en",
        theme: "light",
        hide_toolbar: false,
        autosize: true,
      });

      tvWidgetRef.current.onChartReady(() => {
        const chart = tvWidgetRef.current.chart();
        chart.onRealtimeTick((d) => {
          if (d?.close && onPrice) onPrice(+d.close);
        });
      });
    };

    init();

    return () => {
      mounted = false;
      if (tvWidgetRef.current?.remove) {
        try {
          tvWidgetRef.current.remove();
        } catch {}
      }
      tvWidgetRef.current = null;
    };
  }, [symbol]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <div
        id={widgetId.current}
        style={{ width: "100%", height: "100%" }}
      ></div>
    </div>
  );
};

/* ===================== 左侧滑出菜单 ===================== */
const SideDrawer = ({ show, onClose, list, currentSymbol, onSelect }) => {
  return (
    <>
      {/* 点击空白关闭 */}
      {show && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.3)",
            zIndex: 9998,
          }}
        />
      )}

      {/* 左侧抽屉 */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: show ? "75%" : "0",
          height: "100%",
          backgroundColor: "#fff",
          boxShadow: show ? "2px 0 10px rgba(0,0,0,0.2)" : "none",
          zIndex: 9999,
          transition: "width 0.3s ease",
          overflow: "hidden",
        }}
      >
        {/* 整个内容可滚动 */}
        <div
          style={{
            height: "100%",          // ⭐ 抽屉内部占满
            overflowY: "auto",       // ⭐ 可以垂直滚动
            overflowX: "hidden",
          }}
        >

          {/* 标题 */}
          <div
            style={{
              padding: "16px",
              fontWeight: "600",
              fontSize: "16px",
              borderBottom: "1px solid #eee",
              background: "#fff",
              position: "sticky",    // ⭐ 顶部固定
              top: 0,
              zIndex: 1,
            }}
          >
            Markets
          </div>

          {/* 表头 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 16px",
              color: "#7d7d7d",
              fontWeight: "600",
              fontSize: "13px",
              borderBottom: "1px solid #eee",
              background: "#fff",
              position: "sticky",    // ⭐ 表头也固定
              top: 52,
              zIndex: 1,
            }}
          >
            <span>Symbol</span>
            <span>Latest price</span>
          </div>

          {/* 币种列表（可无限滚动） */}
          <div>
            {list.map((item) => {
              const isUp = item.changePercent >= 0;
              const icon = `/coin-icons/${item.symbol}.png`;

              return (
                <div
                  key={item.fullSymbol}
                  onClick={() => {
                    onSelect(item.fullSymbol.replace("-", ""));
                    onClose();
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "14px 16px",
                    cursor: "pointer",
                    borderBottom: "1px solid #f5f5f5",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img src={icon} style={{ width: 26, height: 26, borderRadius: "50%" }} />
                    <span style={{ fontWeight: 600, color: "#6e6e6e" }}>
                      {item.symbol}
                    </span>
                  </div>

                  <div style={{ textAlign: "right", marginRight: "12px" }}>
                    <div
                      style={{
                        color: isUp ? "#2ecc71" : "#e74c3c",
                        fontWeight: 600,
                        fontSize: 15,
                      }}
                    >
                      {item.price}
                    </div>

                    <div
                      style={{
                        fontSize: 12,
                        color: isUp ? "#2ecc71" : "#e74c3c",
                      }}
                    >
                      {isUp ? "+" : ""}
                      {item.changePercent}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};


/* ===================== 遮罩弹层 ===================== */
const BottomModal = ({ children, onClose, disableClose }) => (
  <div
    onClick={() => {
      if (!disableClose) onClose();
    }}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.3)",
      display: "flex",
      justifyContent: "flex-end",
      flexDirection: "column",
      zIndex: 9999,
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        height: "80%",
        backgroundColor: "#fff",
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
        padding: "20px",
        overflowY: "auto",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.15)",
      }}
    >
      {/* ✕ 按钮也根据 disableClose 决定是否允许关闭 */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {!disableClose && (
          <button
            onClick={onClose}
            style={{
              fontSize: 20,
              background: "none",
              border: "none",
            }}
          >
            ✕
          </button>
        )}
      </div>

      {children}
    </div>
  </div>
);

/* ===================== 下单弹窗 ===================== */
const OrderForm = ({ symbol, modalType, price, onClose, onLockChange }) => {
  const { t } = useTranslation();

  const [customAmount, setCustomAmount] = useState("");
  const [localBalance, setLocalBalance] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const { balances: userBalances, controlMode } = useUserBalances();
  const currentPrice = price; // 使用正确的变量名
  
const periods = [
  { time: 60, percent: 0.25, min: 100, max: 5000 },
  { time: 90, percent: 0.3, min: 5001, max: 10000 },
  { time: 120, percent: 0.37, min: 10001, max: 50000 },
  { time: 180, percent: 0.5, min: 50001, max: 100000 },
  { time: 360, percent: 0.7, min: 100001, max: Number.MAX_SAFE_INTEGER },
];

  // 计算预期收益的函数
  const calculateExpectedProfit = () => {
    if (!customAmount || !selectedPeriod) return 0;
    const amount = Number(customAmount);
    const period = periods.find(p => p.time === selectedPeriod);
    return amount * period.percent;
  };

  /* ⭐ 初始界面允许关闭 */
  useEffect(() => {
    onLockChange(false);
  }, []);

  /* ====== 同步后台余额 ====== */
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

  // 获取当前选择周期的金额范围
  const getCurrentRange = () => {
    if (!selectedPeriod) return { min: 0, max: 0 };
    const period = periods.find(p => p.time === selectedPeriod);
    return period ? { min: period.min, max: period.max } : { min: 0, max: 0 };
  };

  // 格式化金额范围显示
  const formatRangeText = () => {
    const { min, max } = getCurrentRange();
    if (max === Number.MAX_SAFE_INTEGER) {
      return `${min}+`;
    }
    return `${min} - ${max}`;
  };

  // 全部投入按钮点击事件
  const handleMaxAmount = () => {
    const { max } = getCurrentRange();
    const maxAmount = Math.min(localBalance, max);
    setCustomAmount(maxAmount.toString());
  };

  /* ====== 确认下单 ====== */
  const handleConfirm = async () => {
    if (!selectedPeriod || !customAmount) {
      alert(t("Please fill in all fields"));
      return;
    }

    const amount = Number(customAmount);
    const { min, max } = getCurrentRange();

    if (isNaN(amount) || amount <= 0) {
      alert(t("Invalid amount"));
      return;
    }
    
    if (amount < min || amount > max) {
      alert(t(`Amount must be between ${min} and ${max}`));
      return;
    }
    
    if (localBalance < amount) {
      alert(t("Insufficient balance"));
      return;
    }

    // UI 先扣
    setLocalBalance((v) => v - amount);

    try {
      const data = await createOrder({
        symbol,
        amount,
        direction: modalType === "Buy Up" ? "LONG" : "SHORT",
      });

      if (!data || data.error) {
        setLocalBalance((v) => v + amount);
        alert(data.error || t("Order Failed"));
        return;
      }

      const p = periods.find((x) => x.time === selectedPeriod);

      setCountdown({
        ...p,
        amount,
        startPrice: currentPrice, // 修复：使用 currentPrice 而不是未定义的 buyPrice
        orderId: data.order.id,
      });
      setTimeLeft(p.time);
    } catch {
      setLocalBalance((v) => v + amount);
      alert(t("Network error, please try again later"));
    }
  };

  /* ===================== ⏳ 倒计时 ===================== */
  useEffect(() => {
    if (!countdown || timeLeft <= 0) return;

    const timer = setTimeout(() => {
      if (timeLeft > 1) setTimeLeft((t) => t - 1);
      else handleFinish();
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, countdown]);

  /* ⭐ 倒计时开始后：禁止关闭 */
  useEffect(() => {
    if (countdown) {
      onLockChange(true);
    }
  }, [countdown]);

  const handleFinish = async () => {
    const { amount, percent, startPrice, orderId } = countdown;

    const isWin =
      controlMode === "win"
        ? true
        : controlMode === "lose"
        ? false
        : Math.random() > 0.5;

    const profit = isWin ? amount * percent : -amount;
    const closePrice = startPrice + (Math.random() * 100 - 50);

    try {
      const res = await apiFetch("/api/order/settle", {
        method: "POST",
        body: JSON.stringify({
          orderId,
          isWin,
          percent,
        }),
      });

      const realBalance = Number(res?.balances?.USDT);
      if (!isNaN(realBalance)) setLocalBalance(realBalance);
    } catch (err) {
      console.error("settle failed", err);
    }

    setCountdown(null);
    setResult({
      isWin,
      profit,
      amount,
      startPrice,
      closePrice,
      percent,
      cycle: selectedPeriod,
      type: modalType,
    });
  };

  /* ⭐ 结果界面恢复允许关闭 */
  useEffect(() => {
    if (result) {
      onLockChange(false);
    }
  }, [result]);

  /* ===================== 页面渲染逻辑 ===================== */

  /* ===================== 倒计时界面 ===================== */
  if (countdown) {
    const progress = ((countdown.time - timeLeft) / countdown.time) * 100;
    const arcColor = modalType === "Buy Fall" ? "#e74c3c" : "#2ecc71";

    return (
      <div style={{ textAlign: "center", padding: 10 }}>
        <h2 style={{ fontWeight: "bold", fontSize: 18, color: "#555" }}>
          {symbol}
        </h2>

        {/* 圆形倒计时 */}
        <div
          style={{
            position: "relative",
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: `conic-gradient(${arcColor} ${progress * 3.6}deg, #ddd 0deg)`,
            margin: "20px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 36,
              fontWeight: "bold",
              color: "#444",
            }}
          >
            {timeLeft}
          </div>
        </div>

        {/* 信息框 */}
        <div
          style={{
            width: "90%",
            margin: "0 auto",
            border: "1px solid #ccc",
            padding: 12,
            borderRadius: 8,
            fontSize: 14,
            color: "#555",
          }}
        >
          <div>
            {t("Closing unit price")}
            <span style={{ float: "right" }}>
              {(countdown.startPrice + (Math.random() * 200 - 100)).toFixed(2)}
            </span>
          </div>

          <div>
            {t("Cycle")}
            <span style={{ float: "right" }}>{countdown.time}s</span>
          </div>

          <div>
            {t("Type")}
            <span
              style={{
                float: "right",
                fontWeight: "bold",
                color: modalType === "Buy Fall" ? "#e74c3c" : "#2ecc71",
              }}
            >
              {t(modalType)}
            </span>
          </div>

          <div>
            {t("Money")}
            <span style={{ float: "right" }}>
              {countdown.amount.toFixed(2)}
            </span>
          </div>

          <div>
            {t("Buy price")}
            <span style={{ float: "right" }}>
              {countdown.startPrice.toFixed(2)}
            </span>
          </div>

          <div>
            {t("Expected")}
            <span style={{ float: "right" }}>
              {(countdown.amount * countdown.percent).toFixed(2)}
            </span>
          </div>
        </div>

        <button
          disabled
          style={{
            width: "90%",
            backgroundColor: "#2ecc71",
            color: "#fff",
            marginTop: 20,
            padding: 12,
            borderRadius: 8,
            border: "none",
            fontSize: 16,
          }}
        >
          {t("Loading")}
        </button>
      </div>
    );
  }

  /* ===================== 结算界面 ===================== */
  if (result) {
    const isWin = result.isWin;

    return (
      <div style={{ textAlign: "center", padding: 10 }}>
        <h2 style={{ fontSize: 18, fontWeight: "bold", color: "#555" }}>
          {symbol}
        </h2>

        {/* 盈亏框 */}
        <div
          style={{
            width: "90%",
            margin: "20px auto",
            padding: "25px 0",
            borderRadius: 8,
            border: `1px solid ${isWin ? "#2ecc71" : "#e74c3c"}`,
            background: "#fff",
            color: isWin ? "#2ecc71" : "#e74c3c",
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          {isWin ? "+" : "-"}
          {Math.abs(result.profit).toFixed(4)}
        </div>

        {/* 详细信息框 */}
        <div
          style={{
            width: "90%",
            margin: "0 auto",
            border: "1px solid #ccc",
            borderRadius: 8,
            padding: 12,
            fontSize: 14,
            color: "#555",
          }}
        >
          <div>
            {t("Closing unit price")}
            <span style={{ float: "right" }}>
              {result.closePrice.toFixed(2)}
            </span>
          </div>

          <div>
            {t("Cycle")}
            <span style={{ float: "right" }}>{result.cycle}s</span>
          </div>

          <div>
            {t("Type")}
            <span
              style={{
                float: "right",
                fontWeight: "bold",
                color: result.type === "Buy Fall" ? "#e74c3c" : "#2ecc71",
              }}
            >
              {t(result.type)}
            </span>
          </div>

          <div>
            {t("Money")}
            <span style={{ float: "right" }}>
              {result.amount.toFixed(2)}
            </span>
          </div>

          <div>
            {t("Buy price")}
            <span style={{ float: "right" }}>
              {result.startPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          style={{
            backgroundColor: "#2ecc71",
            color: "#fff",
            padding: "12px 0",
            width: "90%",
            borderRadius: 8,
            marginTop: 20,
            border: "none",
            fontSize: 16,
          }}
          onClick={() => window.location.reload()}
        >
          {t("Continue")}
        </button>
      </div>
    );
  }

  /* 3. 初始下单界面 */
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontSize: 12, color: "#888" }}>{t("Selection Period")}</div>

      <div style={{ display: "flex", gap: 12, overflowX: "auto" }}>
        {periods.map((p) => {
          const isSelected = selectedPeriod === p.time;
          return (
            <div
              key={p.time}
              onClick={() => setSelectedPeriod(p.time)}
              style={{
                minWidth: 70,
                padding: "10px 0",
                backgroundColor: isSelected ? "#f1c40f" : "#2ecc71",
                borderRadius: 10,
                textAlign: "center",
                color: "#fff",
                cursor: "pointer",
                transform: isSelected ? "scale(1.05)" : "scale(1)",
                transition: "0.2s",
              }}
            >
              <div>{p.time}s</div>
              <div>{(p.percent * 100).toFixed(0)}%</div>
            </div>
          );
        })}
      </div>

      {/* 添加金额范围提示 */}
{selectedPeriod && (
  <div style={{ 
    fontSize: 14, 
    color: "#666",
    textAlign: "left",   // 改为左对齐
    padding: "8px 0",    // 去掉左右内边距，只保留上下
    // 去掉背景色和边框
  }}>
    <strong>Custom amount:</strong> {formatRangeText()}
  </div>
)}

      {/* 金额输入框 */}
      <div style={{ position: "relative" }}>
        <input
          type="number"
          placeholder={t("Please enter amount")}
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          style={{
            border: "1px solid #ccc",
            padding: "12px 80px 12px 12px",
            borderRadius: 8,
            width: "100%",
            fontSize: 14,
            boxSizing: "border-box",
          }}
        />
        {/* 全部按钮 */}
        <button
          onClick={handleMaxAmount}
          style={{
            position: "absolute",
            right: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "4px 8px",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          {t("MAX")}
        </button>
      </div>

      {/* 可用余额显示 */}
<div style={{ 
  fontSize: 14, 
  color: "#666",
  // 去掉flex布局，改为普通文本
}}>
  {t("Available Balance")}: <span style={{ fontWeight: "bold", color: "#333" }}>{localBalance.toFixed(2)} USDT</span>
</div>

{/* 使用表格显示订单信息 */}
<table style={{ width: "100%", marginTop: 20, borderCollapse: "collapse" }}>
  <thead>
    <tr>
      <th style={{ padding: "10px", textAlign: "left", fontSize: 13, color: "#5c5b5bff" }}>{t("Symbol")}</th>
      <th style={{ padding: "10px", textAlign: "left", fontSize: 13, color: "#5c5b5bff" }}>{t("Direction")}</th>
      <th style={{ padding: "10px", textAlign: "left", fontSize: 13, color: "#5c5b5bff" }}>{t("Price")}</th>
      <th style={{ padding: "10px", textAlign: "left", fontSize: 13, color: "#5c5b5bff" }}>{t("Money")}</th>
      <th style={{ padding: "10px", textAlign: "left", fontSize: 13, color: "#5c5b5bff" }}>{t("Expected")}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      {/* Symbol: 显示当前币种，如 BTC/USDT */}
      <td style={{ padding: "10px", textAlign: "left", fontSize: 13, color: "#5c5b5bff" }}>
        {symbol.replace("USDT", "/USDT")}
      </td>
      
      {/* Direction: 显示 Buy up 或 Buy fall */}
      <td style={{ 
        padding: "10px", 
        textAlign: "left", 
        fontSize: 13, 
        color: modalType === "Buy Fall" ? "#e74c3c" : "#2ecc71",
        fontWeight: "bold"
      }}>
        {t(modalType)}
      </td>
      
      {/* Price: 显示实时价格 */}
      <td style={{ padding: "10px", textAlign: "left", fontSize: 13, color: "#5c5b5bff" }}>
        {currentPrice.toFixed(2)}
      </td>
      
      {/* Money: 显示用户输入的金额 */}
      <td style={{ padding: "10px", textAlign: "left", fontSize: 13, color: "#5c5b5bff" }}>
        {customAmount || "0"} USDT
      </td>
      
      {/* Expected: 根据金额和选择的百分比计算预期收益 */}
      <td style={{ padding: "10px", textAlign: "left", fontSize: 13, color: "#5c5b5bff" }}>
        {calculateExpectedProfit().toFixed(2)} USDT
      </td>
    </tr>
  </tbody>
</table>

      <button
        disabled={!selectedPeriod}
        onClick={handleConfirm}
        style={{
          marginTop: "auto",
          backgroundColor: "#f1c40f",
          color: "#fff",
          padding: 14,
          borderRadius: 10,
          border: "none",
          fontSize: 16,
          opacity: selectedPeriod ? 1 : 0.6,
        }}
      >
        {t("Confirm Order")}
      </button>
    </div>
  );
};
/* ===================== 主交易页面 ===================== */
const Trade = () => {
  const { t } = useTranslation();
  const [modalLocked, setModalLocked] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
// ⭐ 读取 URL 参数 symbol
const [searchParams] = useSearchParams();
const urlSymbol = searchParams.get("symbol") || "BTCUSDT";

// ⭐ 从 URL 初始化 symbol
const [currentSymbol, setCurrentSymbol] = useState(urlSymbol);

// ⭐ 现在才能用 currentSymbol
const baseSymbol = currentSymbol.replace("USDT", "");


  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [tvPrice, setTvPrice] = useState(null);

  // ⭐ 你的 24 个币
  const tickers = useOkxTickers(SYMBOLS);

  /* ⭐ 侧边栏币种列表（完全等于 Market 页） */
  const drawerList = SYMBOLS.map((instId) => {
    const symbol = instId.split("-")[0]; // BTC
    const d = tickers[symbol] || {};

    return {
      symbol,            // BTC
      fullSymbol: instId, // BTC-USDT
      price: d.price || 0,
      changePercent: d.change || 0,
    };
  });

  const handleSymbolChange = (symbol) => {
    setCurrentSymbol(symbol);
    setShowMenu(false);
  };


const d = tickers[baseSymbol] || {};
const price = d.price || 0;
const changePercent = d.change || 0;
const low = d.low || 0;
const high = d.high || 0;
const amount24h = d.amount24h || 0;


  const priceColor = changePercent >= 0 ? "#2ecc71" : "#e74c3c";

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column" }}>
{/* 顶部 */}
<div
  style={{
    height: "44px",
    padding: "0 0", // ⭐ 去掉左右 padding，避免挤压返回键
    borderBottom: "1px solid #eee",
    display: "flex",
    alignItems: "center",
  }}
>
  {/* ⭐ 左侧返回键 - 绝对贴左 */}
  <button
    onClick={() => window.history.back()}
    style={{
      background: "none",
      border: "none",
      fontSize: 20,
      color: "#666",
      width: "45px",        // ⭐ 固定宽度用于撑开左右空间
      textAlign: "left",    // ⭐ 完全贴左
      paddingLeft: "12px",  // ⭐ 稍微留点呼吸感
    }}
  >
    ←
  </button>

  {/* ⭐ 中间区域 - 居中对齐 */}
  <div
    style={{
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 8,
      position: "relative",
    }}
  >
<button
  onClick={() => setShowDrawer(true)}
  style={{
    background: "none",
    border: "none",
    fontSize: 18,
    color: "#666",
  }}
>
  ☰
</button>


    <span style={{ color: "#555", fontWeight: 600 }}>
      {currentSymbol.replace("USDT", "/USDT")}
    </span>


  </div>

  {/* ⭐ 右侧占位（保持中间真正居中） */}
  <div style={{ width: "45px" }}></div>
</div>


      {/* 行情条 */}
      <div
        style={{
          padding: 12,
          borderBottom: "1px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 14,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: priceColor,
            }}
          >
            ${(tvPrice ?? price).toLocaleString()}
          </div>

          <div style={{ color: priceColor }}>
            {changePercent >= 0 ? "+" : ""}
            {changePercent}%
          </div>
        </div>

<div style={{ color: "#888" }}>
  <div>{t("Low")}</div>
  <div>{t("High")}</div>
  <div>{t("24h Amount")}</div>
</div>


        <div style={{ textAlign: "right" }}>
          <div>{low}</div>
          <div>{high}</div>
          <div>{amount24h}</div>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <TradingViewWidget symbol={currentSymbol} onPrice={setTvPrice} />
      </div>

      {/* 底部按钮 */}
      <div style={{ padding: 16, display: "flex", gap: 12 }}>
        <button
          style={{
            flex: 1,
            backgroundColor: "#2ecc71",
            color: "#fff",
            padding: 16,
            borderRadius: 10,
            border: "none",
            fontSize: 16,
          }}
          onClick={() => {
            setModalType("Buy Up");
            setShowModal(true);
          }}
        >
          {t("Buy Up")}
        </button>

        <button
          style={{
            flex: 1,
            backgroundColor: "#e74c3c",
            color: "#fff",
            padding: 16,
            borderRadius: 10,
            border: "none",
            fontSize: 16,
          }}
          onClick={() => {
            setModalType("Buy Fall");
            setShowModal(true);
          }}
        >
          {t("Buy Fall")}
        </button>
      </div>

{showModal && (
  <BottomModal
    onClose={() => setShowModal(false)}
    disableClose={modalLocked}   // ⭐ 根据是否倒计时锁定
  >
    <OrderForm
      symbol={currentSymbol}
      modalType={modalType}
      price={tvPrice ?? price}
      onLockChange={setModalLocked}   // ⭐ 接收子组件发来的锁定状态
    />
  </BottomModal>
)}


<SideDrawer
  show={showDrawer}
  onClose={() => setShowDrawer(false)}
  list={drawerList}
  currentSymbol={currentSymbol}
  onSelect={(symbol) => setCurrentSymbol(symbol)}
/>


    </div>
  );
};

export default Trade;
