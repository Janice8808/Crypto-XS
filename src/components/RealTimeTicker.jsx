import React, { useState, useEffect } from "react";

function RealTimeTicker() {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    // ⭐ 永远连线上行情后端
    const wsUrl = "wss://pankouhoutai.shop/ticker";
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("✅ Frontend Ticker WS connected:", wsUrl);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        setPrices((prev) => {
          const updated = { ...prev };

          // ⭐ Binance ticker 是单条数据，不是数组
          const symbol = data.s ? data.s.replace("USDT", "") : "";
          const price = data.c ? parseFloat(data.c).toFixed(2) : null;

          if (symbol) {
            updated[symbol] = price;
          }

          return updated;
        });
      } catch (err) {
        console.error("解析 WebSocket 消息失败:", err);
      }
    };

    ws.onerror = (err) => {
      console.error("❌ Ticker WebSocket 错误:", err);
    };

    ws.onclose = () => {
      console.log("⚠️ Ticker WebSocket 已断开:", wsUrl);
    };

    return () => ws.close();
  }, []);

  const coins = Object.entries(prices).map(([symbol, price]) => ({
    symbol,
    price,
  }));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {coins.length > 0 ? (
        coins.map((coin) => (
          <div
            key={coin.symbol}
            className="p-4 bg-gray-100 rounded-lg shadow text-center text-gray-800 hover:bg-gray-200 transition"
          >
            <div className="font-bold text-lg">{coin.symbol}</div>
            <div className="text-blue-600 text-xl">
              {coin.price ? `$${coin.price}` : "加载中..."}
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-2 text-center text-gray-500">加载中...</div>
      )}
    </div>
  );
}

export default RealTimeTicker;
