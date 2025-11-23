import React, { useEffect, useState, useRef } from "react";

// ⭐ 你的后端行情 WebSocket 地址（不要改）
const WS_URL = "wss://pankouhoutai.shop/ticker?symbol=BTCUSDT";

const CryptoMarket = () => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    // ====== 连接你的后端行情 WS ======
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("📡 Market WS connected:", WS_URL);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data); // Binance 原始 ticker JSON

        // Binance ticker 数据格式需要 c = 最新价
        setPrice({
          symbol: data.s,
          last: parseFloat(data.c),
          change: parseFloat(data.P),
          high: parseFloat(data.h),
          low: parseFloat(data.l),
          volume: parseFloat(data.v),
        });
      } catch (e) {}
    };

    ws.onerror = (err) => {
      console.log("❌ Market WS error:", err);
    };

    ws.onclose = () => {
      console.log("⚠️ Market WS closed");
    };

    return () => ws.close();
  }, []);

  return (
    <div style={{ padding: "16px", color: "#000" }}>
      <h2 style={{ marginBottom: "12px" }}>BTCUSDT 实时行情（后端 WS）</h2>

      {!price ? (
        <div>加载中...</div>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>交易对</th>
              <th>最新价</th>
              <th>涨跌幅(%)</th>
              <th>24H 最高</th>
              <th>24H 最低</th>
              <th>成交量</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{price.symbol}</td>
              <td>{price.last}</td>
              <td style={{ color: price.change >= 0 ? "green" : "red" }}>
                {price.change}%
              </td>
              <td>{price.high}</td>
              <td>{price.low}</td>
              <td>{price.volume}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CryptoMarket;
