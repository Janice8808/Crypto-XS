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

      const subs = symbols.map((s) => ({
        channel: "trades",
        instId: s,
      }));

      ws.send(
        JSON.stringify({
          op: "subscribe",
          args: subs,
        })
      );
    };

    ws.onmessage = (event) => {
      let msg;
      try {
        msg = JSON.parse(event.data);
      } catch {
        return;
      }

      if (!msg.data || !msg.data[0]) return;

      const d = msg.data[0];
      const inst = d.instId; 
      const sym = inst.replace("-USDT", "");

      const last = Number(d.last || 0);
      const open = Number(d.open24h || 0);
      const change = open ? ((last - open) / open) * 100 : 0;

      setTickers((prev) => ({
        ...prev,
        [inst]: {
          symbol: sym,
          price: last,
          change: Number(change.toFixed(2)), // ⭐ 修复为数字
        },
      }));

      if (onUpdate) onUpdate(); // ⭐ 强制刷新 UI
    };

    ws.onerror = (err) => console.log("WS 错误:", err);
    ws.onclose = () => console.log("OKX WS 断开");

    return () => ws.close();
  }, [symbols]);

  return tickers;
}
