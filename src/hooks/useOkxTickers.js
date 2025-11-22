import { useEffect, useRef, useState } from "react";

export function useOkxTickers(symbols = [], onUpdate = null) {
  const [tickers, setTickers] = useState({});
  const wsRef = useRef(null);

  useEffect(() => {
    if (!symbols.length) return;

    const ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public");
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("OKX 多币 WS 已连接");

      const subs = [
        ...symbols.map((s) => ({
          channel: "tickers",
          instId: s,
        })),
        ...symbols.map((s) => ({
          channel: "candle24h",
          instId: s,
        })),
      ];

      ws.send(JSON.stringify({ op: "subscribe", args: subs }));
    };

    ws.onmessage = (event) => {
      let msg;
      try {
        msg = JSON.parse(event.data);
      } catch {
        return;
      }

      if (!msg.data || !msg.data[0]) return;

      const inst = msg.arg?.instId;
      if (!inst) return;

      // ============= Tick 数据 =============
      if (msg.arg.channel === "tickers") {
        const d = msg.data[0];
        const last = Number(d.last || 0);
        const open = Number(d.open24h || 0);
        const change = open ? ((last - open) / open) * 100 : 0;

        setTickers((prev) => ({
          ...prev,
          [inst]: {
            ...(prev[inst] || {}),
            price: last,
            change: Number(change.toFixed(2)),
          },
        }));
      }

      // ============= K 线数据 =============
      if (msg.arg.channel === "candle24h") {
        const k = msg.data[0]; // 数组
        const open = Number(k[1]);
        const high = Number(k[2]);
        const low = Number(k[3]);
        const close = Number(k[4]);
        const vol = Number(k[5]);

        setTickers((prev) => ({
          ...prev,
          [inst]: {
            ...(prev[inst] || {}),
            high,
            low,
            amount24h: vol,
          },
        }));
      }

      if (onUpdate) onUpdate();
    };

    ws.onerror = (err) => console.log("WS 错误:", err);
    ws.onclose = () => console.log("OKX WS 断开");

    return () => ws.close();
  }, [symbols]);

  return tickers;
}
