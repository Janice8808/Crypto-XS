// src/pages/CoinDetail.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserBalance } from "@/api/user";
import { apiFetch } from "@/api/http";
import { useTranslation } from "react-i18next";

// ====== OKX WebSocket 地址 ======
const OKX_WS = "wss://ws.okx.com:8443/ws/v5/public";

const SYMBOLS = [
  "BTC-USDT","ETH-USDT","BNB-USDT","SOL-USDT","XRP-USDT",
  "DOGE-USDT","ADA-USDT","TRX-USDT","AVAX-USDT","DOT-USDT",
  "LTC-USDT","LINK-USDT","ATOM-USDT","FIL-USDT","BCH-USDT",
  "MATIC-USDT","TON-USDT","ICP-USDT","APT-USDT","NEAR-USDT",
  "SAND-USDT","MANA-USDT","ARB-USDT","OP-USDT","SUI-USDT"
];

export default function CoinDetail() {
  const { t } = useTranslation();          // ⭐ 多语言
  const { symbol } = useParams();
  const navigate = useNavigate();
  const upperSymbol = (symbol || "BTCUSDT").toUpperCase();
  const [showDrawer, setShowDrawer] = useState(false);
  const [side, setSide] = useState("buy");
  const [orderType, setOrderType] = useState("limit");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [allTickers, setAllTickers] = useState({});
  const [availableUsdt, setAvailableUsdt] = useState(0);
  const [lastPrice, setLastPrice] = useState(null);
  const [changePct, setChangePct] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");
// ========== 多币种行情 ==========  
useEffect(() => {
  const ws = new WebSocket(OKX_WS);

  ws.onopen = () => {
    ws.send(JSON.stringify({
      op: "subscribe",
      args: SYMBOLS.map((instId) => ({
        channel: "tickers",
        instId
      }))
    }));
  };

  ws.onmessage = (evt) => {
    const msg = JSON.parse(evt.data);
    if (!msg.data) return;

    const d = msg.data[0];
    const instId = d.instId;          // e.g. BTC-USDT
    const base = instId.split("-")[0]; // BTC

    const open = Number(d.open24h);
    const last = Number(d.last);
    const pct = ((last - open) / open) * 100;

    setAllTickers((prev) => ({
      ...prev,
      [base]: {
        price: last,
        change: pct
      }
    }));
  };

  return () => ws.close();
}, []);

  // ====== 实时 ticker ======
  useEffect(() => {
    const instId = upperSymbol.replace("USDT", "-USDT");
    const ws = new WebSocket(OKX_WS);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          op: "subscribe",
          args: [{ channel: "tickers", instId }]
        })
      );
    };

    ws.onmessage = (evt) => {
      const msg = JSON.parse(evt.data);
      if (!msg.data) return;

      const d = msg.data[0];
      setLastPrice(Number(d.last));
      const open = Number(d.open24h);
      const pct = ((d.last - open) / open) * 100;
      setChangePct(pct);
    };

    return () => ws.close();
  }, [upperSymbol]);

  // ===== 盘口 books5 =====
  const [orderBook, setOrderBook] = useState({ asks: [], bids: [] });

  useEffect(() => {
    const instId = upperSymbol.replace("USDT", "-USDT");
    const ws = new WebSocket(OKX_WS);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          op: "subscribe",
          args: [{ channel: "books5", instId }]
        })
      );
    };

    ws.onmessage = (evt) => {
      const msg = JSON.parse(evt.data);
      if (!msg.data) return;

      const d = msg.data[0];

      setOrderBook({
        asks: d.asks.map(([p, qty]) => ({
          price: Number(p).toFixed(2),
          qty: Number(qty).toFixed(4),
        })),
        bids: d.bids.map(([p, qty]) => ({
          price: Number(p).toFixed(2),
          qty: Number(qty).toFixed(4),
        })),
      });
    };

    return () => ws.close();
  }, [upperSymbol]);

  // ===== 获取用户可用余额 =====
  useEffect(() => {
    async function loadBalance() {
      try {
        const res = await fetchUserBalance();
        const usdt = res?.balances?.USDT ?? 0;
        setAvailableUsdt(Number(usdt));
      } catch (_) {}
    }
    loadBalance();
  }, []);

  // ===== 快捷百分比按钮 =====
  const handlePercentClick = (percent) => {
    if (!price) return;
    const p = Number(price);
    if (!p) return;
    const total = (availableUsdt * percent) / 100;
    const q = total / p;
    setQty(q.toFixed(4));
  };

  // ===== 下单 =====
  const handleSubmit = async () => {
    setSubmitMsg("");
    if (!qty || Number(qty) <= 0) {
      setSubmitMsg(t("Enter Quantity"));
      return;
    }

    try {
      setSubmitting(true);

      await apiFetch("/api/order/create", {
        method: "POST",
        body: JSON.stringify({
          symbol: upperSymbol,
          amount: Number(qty)
        }),
      });

      setSubmitMsg(t("Order Success"));
      setQty("");
    } catch (err) {
      setSubmitMsg(err.message || t("Order Failed"));
    } finally {
      setSubmitting(false);
    }
  };

  // ===== 样式 =====
  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
  };

  const topBarStyle = {
    height: 48,
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  };

  const cardStyle = {
    margin: "20px 16px",
    marginTop: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    display: "grid",
    gridTemplateColumns: "1.2fr 0.9fr",
    columnGap: 8,
  };

  const labelStyle = {
    fontSize: 12,
    color: "#999",
  };

  return (
    <div style={containerStyle}>
      
      {/* ==================== 左侧抽屉 ==================== */}
{showDrawer && (
  <div
    onClick={() => setShowDrawer(false)}
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

<div
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: showDrawer ? "75%" : "0",
    height: "100%",
    backgroundColor: "#fff",
    zIndex: 9999,
    boxShadow: showDrawer ? "2px 0 10px rgba(0,0,0,0.2)" : "none",
    transition: "width 0.28s ease",
    overflow: "hidden",
  }}
>
  {/* 内容可滚动 */}
  <div style={{ height: "100%", overflowY: "auto", overflowX: "hidden" }}>

    {/* 标题 */}
    <div
      style={{
        padding: "16px",
        fontWeight: 600,
        fontSize: "16px",
        borderBottom: "1px solid #eee",
        background: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      Markets
    </div>

    {/* 表头 */}
    <div
      style={{
        padding: "10px 16px",
        display: "flex",
        justifyContent: "space-between",
        fontSize: 13,
        color: "#7d7d7d",
        borderBottom: "1px solid #eee",
        background: "#fff",
        position: "sticky",
        top: 50,
        zIndex: 1,
        fontWeight: 600,
      }}
    >
      <span>Symbol</span>
      <span>Price</span>
    </div>

  {/* 币种列表（完全实时） */}  
{SYMBOLS.map((instId) => {
  const base = instId.split("-")[0];    // BTC
  const data = allTickers[base] || {};

  const price = data.price || 0;
  const change = data.change || 0;
  const up = change >= 0;

  return (
    <div
      key={instId}
      onClick={() => {
        navigate(`/coin/${base + "USDT"}`);
        setShowDrawer(false);
      }}
      style={{
        padding: "14px 16px",
        borderBottom: "1px solid #f5f5f5",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img
          src={`/coin-icons/${base}.png`}
          style={{ width: 26, height: 26, borderRadius: "50%" }}
        />
        <span style={{ fontWeight: 600, color: "#6e6e6e" }}>
          {base}/USDT
        </span>
      </div>

      <div style={{ textAlign: "right" }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: up ? "#22c55e" : "#dc2626"
          }}
        >
          {price.toFixed(4)}
        </div>
        <div
          style={{
            fontSize: 12,
            color: up ? "#22c55e" : "#dc2626"
          }}
        >
          {up ? "+" : ""}
          {change.toFixed(2)}%
        </div>
      </div>
    </div>
  );
})}

  </div>
</div>

      {/* ===== 顶部导航 ===== */}
      <div style={topBarStyle}>
<div
  onClick={() => setShowDrawer(true)}
  style={{ padding: 8, marginRight: 8, cursor: "pointer" }}
>
  <div style={{ width: 18, height: 2, backgroundColor: "#333", marginBottom: 3 }} />
  <div style={{ width: 18, height: 2, backgroundColor: "#333", marginBottom: 3 }} />
  <div style={{ width: 12, height: 2, backgroundColor: "#333", marginBottom: 3 }} />
  <div style={{ width: 12, height: 2, backgroundColor: "#333" }} />
</div>

        {/* 币对标题 */}
        <div style={{ flex: 1, textAlign: "left" }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#222" }}>
            {upperSymbol.replace(/USDT$/, "/USDT")}
          </div>

          {lastPrice && (
            <div
              style={{
                fontSize: 11,
                color: changePct >= 0 ? "#16a34a" : "#dc2626",
              }}
            >
              {lastPrice.toFixed(2)} ({changePct?.toFixed(2)}%)
            </div>
          )}
        </div>

        {/* 占位图标 */}
<div
  onClick={() => navigate("/trade")}
  style={{
    width: 24,
    height: 24,
    borderRadius: 12,
    border: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 10,
    color: "#999",
    cursor: "pointer"          // 🔥 加这个更像按钮
  }}
>
  📈
</div>

      </div>

      {/* ===== 主体区：左下单 + 右盘口 ===== */}
      <div style={cardStyle}>
        
        {/* ===== 左侧：下单 ===== */}
        <div>
          {/* 买卖 */}
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <button
              onClick={() => setSide("buy")}
              style={{
                flex: 1,
                height: 38,
                borderRadius: 6,
                border: "none",
                fontSize: 14,
                fontWeight: 600,
                color: side === "buy" ? "#fff" : "#16a34a",
                backgroundColor: side === "buy" ? "#16a34a" : "#e5f9ed",
              }}
            >
              {t("Buy")}
            </button>

            <button
              onClick={() => setSide("sell")}
              style={{
                flex: 1,
                height: 38,
                borderRadius: 6,
                border: "none",
                fontSize: 14,
                fontWeight: 600,
                color: side === "sell" ? "#fff" : "#dc2626",
                backgroundColor: side === "sell" ? "#dc2626" : "#fee2e2",
              }}
            >
              {t("Sell")}
            </button>
          </div>

          {/* 限价/市价 */}
          <div style={{ display: "flex", gap: 16, fontSize: 13, marginBottom: 8 }}>
            <button
              onClick={() => setOrderType("limit")}
              style={{
                border: "none",
                background: "transparent",
                color: orderType === "limit" ? "#22c55e" : "#666",
                fontWeight: orderType === "limit" ? 600 : 400,
                cursor: "pointer",
              }}
            >
              {t("Limit Order")}
            </button>

            <button
              onClick={() => setOrderType("market")}
              style={{
                border: "none",
                background: "transparent",
                color: orderType === "market" ? "#22c55e" : "#666",
                fontWeight: orderType === "market" ? 600 : 400,
                cursor: "pointer",
              }}
            >
              {t("Market Order")}
            </button>
          </div>

          {/* 价格输入（限价） */}
          {orderType === "limit" && (
            <div style={{ marginBottom: 8 }}>
              <div
                style={{
                  border: "1px solid #e5e5e5",
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 8px",
                  backgroundColor: "#ffffff",
                  height: 34,
                }}
              >
                <input
                  style={{
                    border: "none",
                    outline: "none",
                    flex: 1,
                    fontSize: 13,
                  }}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder={t("Price")}
                />

                {/* - 按钮 */}
                <button
                  type="button"
                  onClick={() =>
                    setPrice((prev) =>
                      (Number(prev || lastPrice || 0) - 0.1).toFixed(2)
                    )
                  }
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#555",
                    padding: "0 6px",
                    fontSize: 14,
                  }}
                >
                  -
                </button>

                {/* + 按钮 */}
                <button
                  type="button"
                  onClick={() =>
                    setPrice((prev) =>
                      (Number(prev || lastPrice || 0) + 0.1).toFixed(2)
                    )
                  }
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#555",
                    padding: "0 6px",
                    fontSize: 14,
                  }}
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* 数量输入 */}
          <div style={{ marginBottom: 8 }}>
            <div
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                padding: "0 8px",
                backgroundColor: "#ffffff",
                height: 34,
              }}
            >
              <input
                style={{
                  border: "none",
                  outline: "none",
                  flex: 1,
                  fontSize: 13,
                }}
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                placeholder={t("Enter Quantity")}
              />

              <button
                type="button"
                onClick={() =>
                  setQty((prev) =>
                    (Number(prev || 0) - 0.001 > 0
                      ? Number(prev || 0) - 0.001
                      : 0
                    ).toFixed(3)
                  )
                }
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#555",
                  padding: "0 6px",
                  fontSize: 14,
                }}
              >
                -
              </button>

              <button
                type="button"
                onClick={() =>
                  setQty((prev) =>
                    (Number(prev || 0) + 0.001).toFixed(3)
                  )
                }
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#555",
                  padding: "0 6px",
                  fontSize: 14,
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* 百分比按钮 */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, marginTop: 4 }}>
            {[25, 50, 75, 100].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => handlePercentClick(p)}
                style={{
                  flex: 1,
                  marginRight: p === 100 ? 0 : 4,
                  height: 26,
                  borderRadius: 14,
                  border: "1px solid #e5e5e5",
                  fontSize: 11,
                  backgroundColor: "#fafafa",
                  cursor: "pointer",
                  color: "#555",
                }}
              >
                {p}%
              </button>
            ))}
          </div>

          {/* 可用余额 */}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
            <span style={labelStyle}>{t("Available")}</span>
            <span style={{ fontSize: 12, color: "#111" }}>
              {availableUsdt.toFixed(4)} USDT
            </span>
          </div>

          {/* Turnover 成交额 */}
          <div style={{ marginBottom: 10 }}>
            <div
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                padding: "0 8px",
                backgroundColor: "#ffffff",
                height: 34,
              }}
            >
              <input
                style={{
                  border: "none",
                  outline: "none",
                  flex: 1,
                  fontSize: 13,
                }}
                placeholder={t("Turnover")}
                readOnly
                value={
                  price && qty
                    ? (Number(price) * Number(qty)).toFixed(4)
                    : ""
                }
              />
              <span style={{ fontSize: 12, color: "#555" }}>USDT</span>
            </div>
          </div>

          {/* 下单按钮 */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            style={{
              width: "100%",
              height: 40,
              borderRadius: 6,
              border: "none",
              backgroundColor: "#16a34a",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              marginTop: 4,
              cursor: "pointer",
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting
              ? t("Submitting")
              : side === "buy"
              ? t("Buy")
              : t("Sell")}
          </button>

          {submitMsg && (
            <div
              style={{
                marginTop: 6,
                fontSize: 12,
                color: submitMsg.includes("成功") ? "#16a34a" : "#dc2626",
              }}
            >
              {submitMsg}
            </div>
          )}
        </div>

        {/* ===== 右侧：盘口 ===== */}
        <div style={{ paddingLeft: 8, borderLeft: "1px solid #f1f1f1", fontSize: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#999", marginBottom: 4 }}>
            <span>{t("Price")}</span>
            <span>{t("Quantity")}</span>
          </div>

          {/* 卖盘 */}
          {orderBook.asks.map((row, idx) => (
            <div
              key={"ask" + idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 2,
                color: "#dc2626",
              }}
            >
              <span>{row.price}</span>
              <span>{row.qty}</span>
            </div>
          ))}

          <div style={{ borderTop: "1px dashed #eee", margin: "4px 0" }} />

          {/* 买盘 */}
          {orderBook.bids.map((row, idx) => (
            <div
              key={"bid" + idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 2,
                color: "#16a34a",
              }}
            >
              <span>{row.price}</span>
              <span>{row.qty}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== 下方 Limit Order 区域 ===== */}
      <div
        style={{
          margin: "28px 16px 120px 16px",
          marginTop: 0,
          backgroundColor: "#ffffff",
          borderRadius: 12,
          padding: "18px 16px 48px 16px",
          minHeight: 240,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#888" }}>
            {t("Limit Order")}
          </div>

          <div style={{ width: 20, height: 20, cursor: "pointer" }}>
            <div style={{ width: "100%", height: 2, backgroundColor: "#aaa", marginBottom: 4 }}></div>
            <div style={{ width: "70%", height: 2, backgroundColor: "#aaa", marginBottom: 4 }}></div>
            <div style={{ width: "55%", height: 2, backgroundColor: "#aaa" }}></div>
          </div>
        </div>

        {/* 空状态 */}
        <div style={{ marginTop: 40, textAlign: "center", color: "#bbb", fontSize: 13 }}>
          <div style={{ marginBottom: 10 }}>
            <div
              style={{
                width: 36,
                height: 44,
                margin: "0 auto",
                opacity: 0.25,
                borderRadius: 4,
                border: "1.5px solid #ccc",
                borderColor: "#ddd",
                position: "relative",
              }}
            >
              <div style={{ width: "70%", height: 2, backgroundColor: "#ccc", position: "absolute", top: 12, left: "15%" }} />
              <div style={{ width: "50%", height: 2, backgroundColor: "#ccc", position: "absolute", top: 20, left: "15%" }} />
              <div style={{ width: "65%", height: 2, backgroundColor: "#ccc", position: "absolute", top: 28, left: "15%" }} />
            </div>
          </div>

          {t("No Order")}
        </div>
      </div>
    </div>
  );
}
