import React, { useState, useEffect, useRef } from "react";
import { apiFetch } from "@/api/http";
import { useUserBalances } from "@/hooks/useUserBalances";
import { createOrder } from "@/api/order";
import { useTicker } from "@/hooks/useTicker";
import { useTranslation } from "react-i18next";

/* ===================== TradingView 图表 ===================== */
const TradingViewWidget = ({ symbol, onPrice }) => {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!widgetRef.current) return;
    widgetRef.current.innerHTML = "";

    const initWidget = () => {
      const widget = new window.TradingView.widget({
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

      widget.onChartReady(() => {
        const chart = widget.chart();
        chart.onRealtimeTick((data) => {
          if (data?.close && onPrice) onPrice(Number(data.close));
        });
      });
    };

    if (!window.TradingView) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = initWidget;
      document.body.appendChild(script);
    } else initWidget();
  }, [symbol]);

  return <div ref={widgetRef} id="tv_widget" style={{ flex: 1, minHeight: 0 }} />;
};

/* ===================== 遮罩弹层 ===================== */
const BottomModal = ({ children, onClose }) => (
  <div
    onClick={onClose}
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
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={onClose} style={{ fontSize: 20, background: "none", border: "none" }}>
          ✕
        </button>
      </div>
      {children}
    </div>
  </div>
);

/* ===================== 下单弹窗 ===================== */
const OrderForm = ({ symbol, modalType, price, onClose }) => {
  const { t } = useTranslation();

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

  /* ====== 确认下单 ====== */
  const handleConfirm = async () => {
    if (!selectedPeriod || !customAmount) {
      alert(t("Please fill in all fields"));
      return;
    }

    const amount = Number(customAmount);
    if (isNaN(amount) || amount <= 0) {
      alert(t("Invalid amount"));
      return;
    }
    if (localBalance < amount) {
      alert(t("Insufficient balance"));
      return;
    }

    // UI 先扣：效果更真实
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
        startPrice: buyPrice,
        orderId: data.order.id,
      });
      setTimeLeft(p.time);
    } catch {
      setLocalBalance((v) => v + amount);
      alert(t("Network error, please try again later"));
    }
  };
  /* ===================== 倒计时 ===================== */
  useEffect(() => {
    if (!countdown || timeLeft <= 0) return;

    const timer = setTimeout(() => {
      if (timeLeft > 1) setTimeLeft((t) => t - 1);
      else handleFinish();
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, countdown]);

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

  /* ===================== 倒计时界面 UI ===================== */
  if (countdown) {
    const progress = ((countdown.time - timeLeft) / countdown.time) * 100;
    const arcColor =
      modalType === "Buy Fall" ? "#e74c3c" : "#2ecc71";

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
            background: `conic-gradient(${arcColor} ${
              progress * 3.6
            }deg, #ddd 0deg)`,
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
              {(
                countdown.startPrice +
                (Math.random() * 200 - 100)
              ).toFixed(2)}
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
                color:
                  modalType === "Buy Fall" ? "#e74c3c" : "#2ecc71",
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

  /* ===================== 初始下单界面 ===================== */
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

      <div style={{ fontSize: 12, color: "#888" }}>{t("Custom amount")}</div>

      <input
        type="number"
        placeholder={t("Please enter amount")}
        value={customAmount}
        onChange={(e) => setCustomAmount(e.target.value)}
        style={{
          border: "1px solid #ccc",
          padding: 12,
          borderRadius: 8,
          width: "100%",
          fontSize: 14,
        }}
      />

      <div style={{ fontSize: 12, color: "#666" }}>
        {t("Balance")}:{" "}
        <span style={{ color: "#2ecc71", fontWeight: "bold" }}>
          {localBalance.toFixed(4)} USDT
        </span>
      </div>

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
  const [currentSymbol, setCurrentSymbol] = useState("BTCUSDT");
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [tvPrice, setTvPrice] = useState(null);

  const symbolsList = ["BTCUSDT", "ETHUSDT", "LTCUSDT", "XRPUSDT"];

  const handleSymbolChange = (symbol) => {
    setCurrentSymbol(symbol);
    setShowMenu(false);
  };

  const { price, changePercent, low, high, amount24h } =
    useTicker(currentSymbol);

  const priceColor = changePercent >= 0 ? "#2ecc71" : "#e74c3c";

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 顶部 */}
      <div
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid #eee",
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => window.history.back()}
          style={{
            background: "none",
            border: "none",
            fontSize: 18,
            color: "#666",
          }}
        >
          ←
        </button>

        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            gap: 6,
            position: "relative",
          }}
        >
          <button
            onClick={() => setShowMenu(!showMenu)}
            style={{
              background: "none",
              border: "none",
              fontSize: 18,
              color: "#666",
            }}
          >
            ☰
          </button>

          <span>{currentSymbol}</span>

          {showMenu && (
            <div
              style={{
                position: "absolute",
                top: 30,
                background: "#fff",
                border: "1px solid #ccc",
                borderRadius: 6,
                zIndex: 10,
              }}
            >
              {symbolsList.map((s) => (
                <div
                  key={s}
                  onClick={() => handleSymbolChange(s)}
                  style={{
                    padding: "10px 14px",
                    cursor: "pointer",
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
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

        <div>
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
        <BottomModal onClose={() => setShowModal(false)}>
          <OrderForm
            symbol={currentSymbol}
            modalType={modalType}
            price={tvPrice ?? price}
          />
        </BottomModal>
      )}
    </div>
  );
};

export default Trade;
