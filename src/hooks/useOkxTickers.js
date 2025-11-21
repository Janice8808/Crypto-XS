import { useEffect, useRef, useState } from "react";

export function useOkxTickers(symbols = []) {
  const [tickers, setTickers] = useState({});
  const wsRef = useRef(null);

  useEffect(() => {
    if (!symbols.length) return;

    const ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public");
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("OKX trades WS 已连接");

      const subs = symbols.map((s) => ({
        channel: "trades",
        instId: s,
      }));

      ws.send(JSON.stringify({
        op: "subscribe",
        args: subs,
      }));
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (!msg.data || !msg.data[0]) return;

      const d = msg.data[0];
      const inst = d.instId; // BTC-USDT
      const sym = inst.replace("-USDT", "");

      const price = Number(d.p); // 最新成交价

      setTickers((prev) => ({
        ...prev,
        [inst]: {
          symbol: sym,
          price,
          change: prev[inst]?.change ?? 0, // 保留旧涨跌幅
        },
      }));
    };

    return () => ws.close();
  }, [symbols]);

  return tickers;
}
