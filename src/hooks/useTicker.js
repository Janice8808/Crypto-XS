import { useEffect, useRef, useState } from "react";

export default function useTicker(symbol) {
  const wsRef = useRef(null);
  const [price, setPrice] = useState("--");
  const [changePercent, setChangePercent] = useState(0);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(0);
  const [amount24h, setAmount24h] = useState(0);

  useEffect(() => {
    if (wsRef.current) wsRef.current.close();

    // ⭐ 前端直接连 Binance，不走后端
    const WS_URL = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`;
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.e !== "24hrTicker") return;

        setPrice(parseFloat(data.c));
        setChangePercent(parseFloat(data.P));
        setLow(parseFloat(data.l));
        setHigh(parseFloat(data.h));
        setAmount24h(parseFloat(data.v));
      } catch (err) {
        console.error("Ticker parse error:", err);
      }
    };

    ws.onerror = (err) => console.error("WS Error:", err);
    ws.onclose = () => console.log("Ticker WS closed:", symbol);

    return () => ws.close();
  }, [symbol]);

  return {
    price,
    changePercent,
    low,
    high,
    amount24h,
  };
}
