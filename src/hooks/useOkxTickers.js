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

      const symbol = inst.split("-")[0].toUpperCase(); // ⭐ 修复关键！

// ============= Tick 数据（包含 24h high/low/volume）=============
if (msg.arg.channel === "tickers") {
  const d = msg.data[0];

  const last = Number(d.last || 0);
  const open = Number(d.open24h || 0);
  const change = open ? ((last - open) / open) * 100 : 0;

  // ⭐ 新增：直接从 tickers 频道取 24h 信息（最准确）
  const high = Number(d.high24h || 0);
  const low = Number(d.low24h || 0);
  const amount24h = Number(d.vol24h || 0);

  setTickers((prev) => ({
    ...prev,
    [symbol]: {
      ...(prev[symbol] || {}),
      symbol,
      price: last,
      change: Number(change.toFixed(2)),
      high,
      low,
      amount24h,
    },
  }));
}


      // ============= K 线数据 =============
      if (msg.arg.channel === "candle24h") {
        const k = msg.data[0];

        const high = Number(k[2]);
        const low = Number(k[3]);
        const vol = Number(k[5]);

        setTickers((prev) => ({
          ...prev,
          [symbol]: {
            ...(prev[symbol] || {}),
            symbol,        // ⭐ 写入 symbol
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
