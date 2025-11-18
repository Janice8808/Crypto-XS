import React, { useState, useEffect } from "react";

function RealTimeTicker() {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    // ⭐ 自动区分 本地 / 生产环境 的 WebSocket 地址
    const wsUrl = import.meta.env.PROD
      ? "wss://crypto-ht.onrender.com"   // Cloudflare Pages → 连接 Render 后端
      : "ws://localhost:5000";           // 本地开发

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("✅ Frontend WS connected:", wsUrl);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // 不是 ticker 数组 → 忽略（比如后台管理员通知）
        if (!Array.isArray(data)) return;

        setPrices((prev) => {
          const updated = { ...prev };

          data.forEach((item) => {
            const symbol = item.s.replace("USDT", "");
            updated[symbol] = parseFloat(item.c).toFixed(2);
          });

          return updated;
        });
      } catch (err) {
        console.error("解析 WebSocket 消息失败:", err);
      }
    };

    ws.onerror = (err) => {
      console.error("❌ WebSocket 错误:", err);
    };

    ws.onclose = () => {
      console.log("⚠️ WebSocket 已断开:", wsUrl);
    };

    return () => ws.close();
  }, []);

  // 转换成数组渲染
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
