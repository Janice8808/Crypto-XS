// src/pages/CoinDetail.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserBalance } from "@/api/user";
import { apiFetch } from "@/api/http";

// 从环境变量里拿后端地址（比如 https://pankouhoutai.shop/api）
// 强制使用线上后端，不依赖 VITE_API_BASE
const API_BASE = "https://pankouhoutai.shop/api";

// WebSocket：直接连线上 ticker
const WS_BASE = "wss://pankouhoutai.shop";


export default function CoinDetail() {
  const { symbol } = useParams(); // 例如 btcusdt
  const navigate = useNavigate();
  const upperSymbol = (symbol || "BTCUSDT").toUpperCase();

  const [side, setSide] = useState("buy"); // buy / sell
  const [orderType, setOrderType] = useState("limit"); // limit / market

  const [price, setPrice] = useState(""); // 价格输入框
  const [qty, setQty] = useState(""); // 数量输入框

  const [availableUsdt, setAvailableUsdt] = useState(0);
  const [lastPrice, setLastPrice] = useState(null);
  const [changePct, setChangePct] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");

  // ===== 顶部点击左侧四横杠，返回市场列表 =====
  const handleBack = () => {
    navigate("/markets");
  };

  // ===== WebSocket 实时价格 =====
  useEffect(() => {
    const ws = new WebSocket(`wss://pankouhoutai.shop/ticker`);

    ws.onmessage = (evt) => {
      try {
        const data = JSON.parse(evt.data);
        // 后端目前是 BTCUSDT 一个流，这里兼容 symbol 判断
        if (!data.s || data.s.toUpperCase() !== upperSymbol) return;
        setLastPrice(Number(data.c));
        setChangePct(Number(data.P));
        if (!price) {
          setPrice(data.c); // 首次自动带入价格
        }
      } catch (_) {}
    };

    return () => ws.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upperSymbol]);

  // ===== 获取用户可用余额 =====
  useEffect(() => {
    async function loadBalance() {
      try {
        const res = await fetchUserBalance();
        const usdt = res?.balances?.USDT ?? 0;
        setAvailableUsdt(Number(usdt));
      } catch (_) {
        // 未登录就不显示余额
      }
    }
    loadBalance();
  }, []);

  // ===== 根据最新价模拟一个简单的盘口（右侧价格列表） =====
const { asks, bids } = useMemo(() => {
  if (!lastPrice) return { asks: [], bids: [] };
  const p = Number(lastPrice);

  // 数量范围真实一点
  const genQty = () =>
    (Math.random() * 0.02 + 0.0003).toFixed(4);

  // 价格波动真实一点
  const genPriceLevels = (direction) => {
    let list = [];
    let base = p;

    for (let i = 0; i < 5; i++) {
      // 偏移范围：0.1 - 1.2 美金，但逐层递增
      let offset = (Math.random() * 1.1 + 0.1) * (i + 1);

      let price =
        direction === "ask"
          ? base + offset
          : base - offset;

      list.push({
        price: price.toFixed(4),
        qty: genQty(),
      });
    }

    return list;
  };

  return {
    asks: genPriceLevels("ask"),
    bids: genPriceLevels("bid"),
  };
}, [lastPrice]);

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
      setSubmitMsg("请输入数量");
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

      setSubmitMsg("下单成功");
      // 下单成功后清空数量
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
      {/* 顶部导航栏 */}
      <div style={topBarStyle}>
        {/* 左侧四条横杠图标 */}
        <div
          onClick={handleBack}
          style={{ padding: 8, marginRight: 8, cursor: "pointer" }}
        >
          <div
            style={{
              width: 18,
              height: 2,
              backgroundColor: "#333",
              marginBottom: 3,
            }}
          />
          <div
            style={{
              width: 18,
              height: 2,
              backgroundColor: "#333",
              marginBottom: 3,
            }}
          />
          <div
            style={{
              width: 12,
              height: 2,
              backgroundColor: "#333",
              marginBottom: 3,
            }}
          />
          <div style={{ width: 12, height: 2, backgroundColor: "#333" }} />
        </div>
        {/* 中间币对名称 */}
        <div style={{ flex: 1, textAlign: "left" }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#222",
            }}
          >
            {upperSymbol.replace("USDT", "/USDT")}
          </div>
          {lastPrice && (
            <div
              style={{
                fontSize: 11,
                color: changePct >= 0 ? "#16a34a" : "#dc2626",
              }}
            >
              {lastPrice} ({changePct?.toFixed(2)}%)
            </div>
          )}
        </div>
        {/* 右侧小图标占位 */}
        <div
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
          }}
        >
          📈
        </div>
      </div>

      {/* 主体卡片：左侧下单、右侧盘口 */}
      <div style={cardStyle}>
        {/* 左侧：下单区域 */}
        <div>
          {/* 买卖切换 */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 8,
            }}
          >
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

          {/* 限价 / 市价 */}
          <div
            style={{
              display: "flex",
              gap: 16,
              fontSize: 13,
              marginBottom: 8,
            }}
          >
            <button
              onClick={() => setOrderType("limit")}
              style={{
                border: "none",
                background: "transparent",
                color:
                  orderType === "limit" ? "#22c55e" : "#666",
                fontWeight: orderType === "limit" ? 600 : 400,
                cursor: "pointer",
              }}
            >
              limit order
            </button>
            <button
              onClick={() => setOrderType("market")}
              style={{
                border: "none",
                background: "transparent",
                color:
                  orderType === "market" ? "#22c55e" : "#666",
                fontWeight: orderType === "market" ? 600 : 400,
                cursor: "pointer",
              }}
            >
              market order
            </button>
          </div>

          {/* 价格输入 */}
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
                  onClick={() =>
                    setPrice((prev) =>
                      (Number(prev || lastPrice || 0) - 0.1).toFixed(2)
                    )
                  }
                  style={{
                    ...smallButtonBase,
                    marginRight: 4,
                    border: "none",
                    color: "#555",
                  }}
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setPrice((prev) =>
                      (Number(prev || lastPrice || 0) + 0.1).toFixed(2)
                    )
                  }
                  style={{
    ...smallButtonBase,
    border: "none",
    color: "#555",   // ⭐ 加这一行
  }}
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* 数量输入 */}
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
                onClick={() =>
                  setQty((prev) =>
                    (Number(prev || 0) - 0.001 > 0
                      ? Number(prev || 0) - 0.001
                      : 0
                    ).toFixed(3)
                  )
                }
                style={{
                  ...smallButtonBase,
                  marginRight: 4,
                  border: "none",
                  color: "#555",
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
    ...smallButtonBase,
    border: "none",
    color: "#555",   // ⭐ 加这一行
  }}
              >
                +
              </button>
            </div>
          </div>

          {/* 百分比按钮 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
              marginTop: 4,
            }}
          >
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              marginBottom: 6,
            }}
          >
            <span style={labelStyle}>Available</span>
            <span style={{ fontSize: 12, color: "#111" }}>
              {availableUsdt.toFixed(4)} USDT
            </span>
          </div>

          {/* Turnover 输入 */}
          <div style={{ marginBottom: 10 }}>
            <div style={inputWrapperStyle}>
              <input
                style={inputStyle}
                placeholder="Turnover"
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

          {/* 绿色按钮（未登录时可以写 Login，这里统一“Place Order”） */}
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
            {submitting ? "Submitting..." : side === "buy" ? "Buy" : "Sell"}
          </button>

          {submitMsg && (
            <div
              style={{
                marginTop: 6,
                fontSize: 12,
                color: submitMsg.includes("成功")
                  ? "#16a34a"
                  : "#dc2626",
              }}
            >
              {submitMsg}
            </div>
          )}
        </div>

        {/* 右侧：盘口列表 */}
        <div
          style={{
            paddingLeft: 8,
            borderLeft: "1px solid #f1f1f1",
            fontSize: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#999",
              marginBottom: 4,
            }}
          >
            <span>Price</span>
            <span>Quantity</span>
          </div>

          {/* 卖盘（红色） */}
          {asks.map((row, idx) => (
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

          {/* 分割线 */}
          <div
            style={{
              borderTop: "1px dashed #eee",
              margin: "4px 0",
            }}
          />

          {/* 买盘（绿色） */}
          {bids.map((row, idx) => (
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
        {/* 顶部：limit order + 图标 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#888",
            }}
          >
            limit order
          </div>

          <div
            style={{
              width: 20,
              height: 20,
              cursor: "pointer",
            }}
          >
            {/* 三条横线图标 */}
            <div
              style={{
                width: "100%",
                height: 2,
                backgroundColor: "#aaa",
                marginBottom: 4,
              }}
            ></div>
            <div
              style={{
                width: "70%",
                height: 2,
                backgroundColor: "#aaa",
                marginBottom: 4,
              }}
            ></div>
            <div
              style={{
                width: "55%",
                height: 2,
                backgroundColor: "#aaa",
              }}
            ></div>
          </div>
        </div>

        {/* 空状态 */}
        <div
          style={{
            marginTop: 40,
            textAlign: "center",
            color: "#bbb",
            fontSize: 13,
          }}
        >
          {/* 空图标（浅灰） */}
          <div style={{ marginBottom: 10 }}>
            <div
              style={{
                width: 36,
                height: 44,
                margin: "0 auto",
                opacity: 0.25,
                borderRadius: 4,
                border: "1.5px solid #ccc",
                borderStyle: "solid",
                borderColor: "#ddd",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "70%",
                  height: 2,
                  backgroundColor: "#ccc",
                  position: "absolute",
                  top: 12,
                  left: "15%",
                }}
              ></div>
              <div
                style={{
                  width: "50%",
                  height: 2,
                  backgroundColor: "#ccc",
                  position: "absolute",
                  top: 20,
                  left: "15%",
                }}
              ></div>
              <div
                style={{
                  width: "65%",
                  height: 2,
                  backgroundColor: "#ccc",
                  position: "absolute",
                  top: 28,
                  left: "15%",
                }}
              ></div>
            </div>
          </div>

          No delegated order
        </div>
      </div>
    </div>
  );
}
