import { useEffect, useRef, useState } from "react";

export function useOkxTickers(symbols = []) {
  const [tickers, setTickers] = useState({});
  const wsRef = useRef(null);

  useEffect(() => {
    if (!symbols.length) return;

    const ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public");
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("OKX 多币 WS 已连接");

      const subs = symbols.map((s) => ({
        channel: "tickers",
        instId: s, // 如 BTC-USDT
      }));

      ws.send(
        JSON.stringify({
          op: "subscribe",
          args: subs,
        })
      );
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (!msg.data || !msg.data[0]) return;

      const d = msg.data[0];
      const inst = d.instId; // BTC-USDT
      const sym = inst.replace("-USDT", "");

      const last = Number(d.last || 0);
      const open = Number(d.open24h || 0);
      const change = open ? ((last - open) / open) * 100 : 0;

      setTickers((prev) => ({
        ...prev,
        [inst]: {
          symbol: sym,
          price: last,
          change: change.toFixed(2),
        },
      }));
    };

    ws.onclose = () => console.log("OKX WS 断开");
    ws.onerror = (err) => console.log("WS 错误:", err);

    return () => ws.close();
  }, [symbols]);

  return tickers;
}
