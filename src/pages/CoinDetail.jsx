// src/pages/CoinDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserBalance } from "@/api/user";
import { apiFetch } from "@/api/http";

// 永远使用线上 API
const API_BASE = "https://pankouhoutai.shop/api";

export default function CoinDetail() {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const upperSymbol = (symbol || "BTCUSDT").toUpperCase();

  const [side, setSide] = useState("buy");
  const [orderType, setOrderType] = useState("limit");

  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");

  const [availableUsdt, setAvailableUsdt] = useState(0);
  const [lastPrice, setLastPrice] = useState(50000);
  const [changePct, setChangePct] = useState(0);

  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");

  // ====== 返回市场页 ======
  const handleBack = () => {
    navigate("/market");
  };

  // ====== 模拟实时盘口（每秒刷新）======
  const [orderBook, setOrderBook] = useState({ asks: [], bids: [] });

  useEffect(() => {
    const timer = setInterval(() => {
      const base = Number(lastPrice || 50000);

      const gen = (isAsk) => {
        return Array.from({ length: 5 }).map(() => {
          const diff = (Math.random() * 3 + 0.1) * (isAsk ? 1 : -1);
          return {
            price: (base + diff).toFixed(4),
            qty: (Math.random() * 0.02 + 0.001).toFixed(4),
          };
        });
      };

      setOrderBook({
        asks: gen(true),
        bids: gen(false),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [lastPrice]);

  // ===== 获取用户余额 =====
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

  // ====== 下单 ======
  const handleSubmit = async () => {
    setSubmitMsg("");
    if (!qty || Number(qty) <= 0) {
      setSubmitMsg("请输入数量");
      return;
    }

    try {
      setSubmitting(true);

      await apiFetch("/api/order/create", {
        method: "POST",
        body: JSON.stringify({
          symbol: upperSymbol,
          amount: Number(qty),
        }),
      });

      setSubmitMsg("下单成功");
      setQty("");
    } catch (err) {
      setSubmitMsg(err.message || "下单失败，请检查是否已登录");
    } finally {
      setSubmitting(false);
    }
  };

  // ===== UI 样式 =====
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

  const smallButtonBase = {
    borderRadius: 4,
    border: "1px solid #ddd",
    padding: "4px 8px",
    fontSize: 12,
    backgroundColor: "#ffffff",
    cursor: "pointer",
  };

  const inputWrapperStyle = {
    border: "1px solid #e5e5e5",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    backgroundColor: "#ffffff",
    height: 34,
  };

  const inputStyle = {
    border: "none",
    outline: "none",
    flex: 1,
    fontSize: 13,
  };

  return (
    <div style={containerStyle}>

      {/* 顶部 */}
      <div style={topBarStyle}>
        <div onClick={handleBack} style={{ padding: 8, marginRight: 8, cursor: "pointer" }}>
          <div style={{ width: 18, height: 2, backgroundColor: "#333", marginBottom: 3 }} />
          <div style={{ width: 18, height: 2, backgroundColor: "#333", marginBottom: 3 }} />
          <div style={{ width: 12, height: 2, backgroundColor: "#333", marginBottom: 3 }} />
          <div style={{ width: 12, height: 2, backgroundColor: "#333" }} />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{upperSymbol.replace("USDT", "/USDT")}</div>
          <div style={{ fontSize: 11, color: changePct >= 0 ? "#16a34a" : "#dc2626" }}>
            {lastPrice} ({changePct.toFixed(2)}%)
          </div>
        </div>

        <div style={{ width: 24, height: 24, borderRadius: 12, border: "1px solid #ddd", textAlign: "center" }}>
          📈
        </div>
      </div>

      {/* 交易区域 */}
      <div style={cardStyle}>
        {/* 左侧下单 */}
        <div>
          {/* 买卖按钮 */}
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
              Buy
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
              Sell
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
              }}
            >
              limit order
            </button>

            <button
              onClick={() => setOrderType("market")}
              style={{
                border: "none",
                background: "transparent",
                color: orderType === "market" ? "#22c55e" : "#666",
                fontWeight: orderType === "market" ? 600 : 400,
              }}
            >
              market order
            </button>
          </div>

          {/* 限价才显示价格 */}
          {orderType === "limit" && (
            <div style={{ marginBottom: 8 }}>
              <div style={inputWrapperStyle}>
                <input
                  style={inputStyle}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                />
                <button
                  type="button"
                  onClick={() => setPrice((p) => (Number(p || lastPrice) - 0.1).toFixed(2))}
                  style={{ ...smallButtonBase, border: "none", color: "#555" }}
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => setPrice((p) => (Number(p || lastPrice) + 0.1).toFixed(2))}
                  style={{ ...smallButtonBase, border: "none", color: "#555" }}
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* 数量 */}
          <div style={{ marginBottom: 8 }}>
            <div style={inputWrapperStyle}>
              <input
                style={inputStyle}
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                placeholder="Enter quantity"
              />
              <button
                type="button"
                onClick={() => setQty((prev) => Math.max(Number(prev) - 0.001, 0).toFixed(3))}
                style={{ ...smallButtonBase, border: "none", color: "#555" }}
              >
                -
              </button>
              <button
                type="button"
                onClick={() => setQty((prev) => (Number(prev) + 0.001).toFixed(3))}
                style={{ ...smallButtonBase, border: "none", color: "#555" }}
              >
                +
              </button>
            </div>
          </div>

          {/* 百分比按钮 */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            {[25, 50, 75, 100].map((p) => (
              <button
                key={p}
                onClick={() => {
                  if (!price) return;
                  const q = ((availableUsdt * p) / 100) / Number(price);
                  setQty(q.toFixed(4));
                }}
                style={{
                  flex: 1,
                  marginRight: p === 100 ? 0 : 4,
                  height: 26,
                  borderRadius: 14,
                  border: "1px solid #e5e5e5",
                  fontSize: 11,
                  backgroundColor: "#fafafa",
                  color: "#555",
                }}
              >
                {p}%
              </button>
            ))}
          </div>

          {/* 可用余额 */}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
            <span style={labelStyle}>Available</span>
            <span style={{ color: "#111" }}>{availableUsdt.toFixed(4)} USDT</span>
          </div>

          {/* Turnover */}
          <div style={{ marginBottom: 10 }}>
            <div style={inputWrapperStyle}>
              <input
                style={inputStyle}
                value={price && qty ? (Number(price) * Number(qty)).toFixed(4) : ""}
                readOnly
                placeholder="Turnover"
              />
              <span style={{ fontSize: 12, color: "#555" }}>USDT</span>
            </div>
          </div>

          {/* 下单按钮 */}
          <button
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
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting ? "Submitting..." : side === "buy" ? "Buy" : "Sell"}
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

        {/* ====== 右侧盘口 ====== */}
        <div style={{ paddingLeft: 8, borderLeft: "1px solid #f1f1f1", fontSize: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#999", marginBottom: 4 }}>
            <span>Price</span>
            <span>Quantity</span>
          </div>

          {/* 卖盘（红色） */}
          {orderBook.asks.map((row, idx) => (
            <div
              key={`ask-${idx}`}
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

          {/* 分割线 */}
          <div style={{ borderTop: "1px dashed #eee", margin: "4px 0" }} />

          {/* 买盘（绿色） */}
          {orderBook.bids.map((row, idx) => (
            <div
              key={`bid-${idx}`}
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

      {/* ====== 空订单区域 ====== */}
      <div
        style={{
          margin: "28px 16px 120px 16px",
          backgroundColor: "#ffffff",
          borderRadius: 12,
          padding: "18px 16px 48px 16px",
          minHeight: 240,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 600, color: "#888", marginBottom: 14 }}>
          limit order
        </div>

        <div
          style={{
            marginTop: 40,
            textAlign: "center",
            color: "#bbb",
            fontSize: 13,
          }}
        >
          <div style={{ marginBottom: 10 }}>
            <div
              style={{
                width: 36,
                height: 44,
                margin: "0 auto",
                opacity: 0.25,
                borderRadius: 4,
                border: "1.5px solid #ccc",
                position: "relative",
              }}
            >
              <div style={{ width: "70%", height: 2, backgroundColor: "#ccc", position: "absolute", top: 12, left: "15%" }} />
              <div style={{ width: "50%", height: 2, backgroundColor: "#ccc", position: "absolute", top: 20, left: "15%" }} />
              <div style={{ width: "65%", height: 2, backgroundColor: "#ccc", position: "absolute", top: 28, left: "15%" }} />
            </div>
          </div>

          No delegated order
        </div>
      </div>
    </div>
  );
}
