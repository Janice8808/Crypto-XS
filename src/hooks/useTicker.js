import { useState, useEffect } from "react";

export default function useTicker() {
  const [price, setPrice] = useState("--");

  useEffect(() => {
    const ws = new WebSocket("wss://pankouhoutai.shop/ticker");

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      // Binance ticker 返回 lastPrice 字段（或者 c 字段）
      setPrice(data.c || data.lastPrice);
    };

    ws.onclose = () => console.log("Ticker WS closed");
    return () => ws.close();
  }, []);

  return price;
}
