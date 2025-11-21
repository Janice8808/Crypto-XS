// src/pages/CoinDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserBalance } from "@/api/user";
import { apiFetch } from "@/api/http";

export default function CoinDetail() {
  const { symbol } = useParams(); // e.g. BTCUSDT
  const navigate = useNavigate();
  const upperSymbol = (symbol || "BTCUSDT").toUpperCase();

  const okxSymbol = upperSymbol.replace("USDT", "-USDT"); // OKX 格式：BTC-USDT

  const [lastPrice, setLastPrice] = useState(null);
  const [changePct, setChangePct] = useState(null);
  const [bids, setBids] = useState([]); // 买盘（绿色）
  const [asks, setAsks] = useState([]); // 卖盘（红色）

  const [side, setSide] = useState("buy");
  const [orderType, setOrderType] = useState("limit");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [availableUsdt, setAvailableUsdt] = useState(0);
  const [submitMsg, setSubmitMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleBack = () => navigate("/market");

  // ---------------------
  // ⭐ OKX WebSocket 实时行情
  // ---------------------
  useEffect(() => {
    const ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public");

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          op: "subscribe",
          args: [
            {
              channel: "books5", // 5 档盘口
              instId: okxSymbol,
            },
          ],
        })
      );
    };

    ws.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);

        if (!data.data) return;

        const book = data.data[0];

        // bids = 买盘（绿色）
        setBids(book.bids.map((b) => ({ price: b[0], qty: b[1] })));

        // asks = 卖盘（红色）
        setAsks(book.asks.map((a) => ({ price: a[0], qty: a[1] })));

        // 最新价 = 中间价（OKX 没有 last，需要手动取中间）
        const mid = (parseFloat(book.bids[0][0]) + parseFloat(book.asks[0][0])) / 2;
        setLastPrice(mid.toFixed(4));

        // 涨跌幅需要用 ticker 或自己处理，这里先写 null
        setChangePct(null);
      } catch (err) {}
    };

    ws.onerror = () => {};
    return () => ws.close();
  }, [okxSymbol]);

  // ---------------------
  // 可用余额
  // ---------------------
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchUserBalance();
        const usdt = res?.balances?.USDT ?? 0;
        setAvailableUsdt(Number(usdt));
      } catch {}
    })();
  }, []);

  // ---------------------
  // 快捷按钮百分比
  // ---------------------
  const handlePercentClick = (p) => {
    if (!price || !availableUsdt) return;
    const total = (availableUsdt * p) / 100;
    setQty((total / Number(price)).toFixed(4));
  };

  // ---------------------
  // 下单
  // ---------------------
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
      setSubmitMsg(err.message || "下单失败");
    } finally {
      setSubmitting(false);
    }
  };

  // ---------------------
  // UI
  // ---------------------
  const label = { fontSize: 12, color: "#999" };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      {/* 顶部 */}
      <div
        style={{
          height: 48,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          background: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <div
          onClick={handleBack}
          style={{ width: 24, cursor: "pointer", marginRight: 12 }}
        >
          <div style={{ height: 2, background: "#333", marginBottom: 4 }} />
          <div style={{ height: 2, background: "#333", marginBottom: 4 }} />
          <div style={{ height: 2, background: "#333", marginBottom: 4 }} />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>
            {upperSymbol.replace("USDT", "/USDT")}
          </div>
          <div style={{ fontSize: 12, color: "#16a34a" }}>
            {lastPrice ? `$${lastPrice}` : "--"}
          </div>
        </div>

        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            border: "1px solid #ddd",
            fontSize: 10,
            color: "#555",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          📈
        </div>
      </div>

      {/* 主体 */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          margin: "16px",
          padding: 12,
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: 12,
        }}
      >
        {/* 左侧下单 */}
        <div>
          {/* 买卖切换 */}
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <button
              onClick={() => setSide("buy")}
              style={{
                flex: 1,
                height: 38,
                borderRadius: 6,
                border: "none",
                background: side === "buy" ? "#16a34a" : "#e5f9ed",
                color: side === "buy" ? "#fff" : "#16a34a",
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
                background: side === "sell" ? "#dc2626" : "#fee2e2",
                color: side === "sell" ? "#fff" : "#dc2626",
              }}
            >
              Sell
            </button>
          </div>

          {/* 限价市价 */}
          <div style={{ display: "flex", gap: 20, fontSize: 12, marginBottom: 8 }}>
            <span
              onClick={() => setOrderType("limit")}
              style={{
                cursor: "pointer",
                color: orderType === "limit" ? "#22c55e" : "#555",
              }}
            >
              limit
            </span>
            <span
              onClick={() => setOrderType("market")}
              style={{
                cursor: "pointer",
                color: orderType === "market" ? "#22c55e" : "#555",
              }}
            >
              market
            </span>
          </div>

          {/* 价格输入 */}
          {orderType === "limit" && (
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: 6,
                height: 34,
                display: "flex",
                alignItems: "center",
                padding: "0 8px",
                marginBottom: 8,
              }}
            >
              <input
                style={{ flex: 1, border: "none", outline: "none" }}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />
            </div>
          )}

          {/* 数量输入 */}
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: 6,
              height: 34,
              display: "flex",
              alignItems: "center",
              padding: "0 8px",
              marginBottom: 8,
            }}
          >
            <input
              style={{ flex: 1, border: "none", outline: "none" }}
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              placeholder="Quantity"
            />
          </div>

          {/* 百分比 */}
          <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
            {[25, 50, 75, 100].map((p) => (
              <button
                key={p}
                onClick={() => handlePercentClick(p)}
                style={{
                  flex: 1,
                  borderRadius: 16,
                  border: "1px solid #ddd",
                  background: "#fafafa",
                  fontSize: 11,
                }}
              >
                {p}%
              </button>
            ))}
          </div>

          {/* 可用余额 */}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
            <span style={label}>Available</span>
            <span>{availableUsdt.toFixed(4)} USDT</span>
          </div>

          {/* 成交额 */}
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: 6,
              height: 34,
              display: "flex",
              alignItems: "center",
              padding: "0 8px",
              marginBottom: 14,
            }}
          >
            <input
              style={{ flex: 1, border: "none", outline: "none" }}
              value={price && qty ? (Number(price) * Number(qty)).toFixed(4) : ""}
              readOnly
              placeholder="Turnover"
            />
            <span style={{ fontSize: 12 }}>USDT</span>
          </div>

          {/* 下单 */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            style={{
              width: "100%",
              height: 40,
              border: "none",
              borderRadius: 6,
              background: side === "buy" ? "#16a34a" : "#dc2626",
              color: "#fff",
              fontSize: 15,
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

        {/* 右侧盘口 */}
        <div style={{ borderLeft: "1px solid #eee", paddingLeft: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#999", fontSize: 12 }}>
            <span>Price</span>
            <span>Qty</span>
          </div>

          {/* asks 卖盘（红） */}
          {asks.map((a, i) => (
            <div
              key={"ask" + i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#dc2626",
                fontSize: 12,
                marginTop: 2,
              }}
            >
              <span>{a.price}</span>
              <span>{a.qty}</span>
            </div>
          ))}

          <div style={{ borderTop: "1px dashed #ddd", margin: "6px 0" }} />

          {/* bids 买盘（绿） */}
          {bids.map((b, i) => (
            <div
              key={"bid" + i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#16a34a",
                fontSize: 12,
                marginTop: 2,
              }}
            >
              <span>{b.price}</span>
              <span>{b.qty}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
