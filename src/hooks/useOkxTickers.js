import { useEffect, useRef, useState } from "react";

export function useOkxTickers() {
  const [tickers, setTickers] = useState({});
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public");
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("OKX 全量行情 WebSocket 已连接");

      ws.send(
        JSON.stringify({
          op: "subscribe",
          args: [
            {
              channel: "tickers",
              instType: "SPOT"  // ⭐ 一次性订阅全部现货
            }
          ]
        })
      );
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (!msg.data || !Array.isArray(msg.data)) return;

      const update = {};
      msg.data.forEach((d) => {
        const base = d.instId.replace("-USDT", "");
        const last = Number(d.last);
        const open = Number(d.open24h);
        const change = open ? ((last - open) / open) * 100 : 0;

        update[base] = {
          symbol: base,
          price: last,
          change: Number(change.toFixed(2)),

          // 额外字段（如果你需要高/低/24h量）
          high: Number(d.high24h),
          low: Number(d.low24h),
          amount24h: Number(d.volCcy24h), 
        };
      });

      // ⭐ 一次性更新所有币
      setTickers(update);
    };

    ws.onerror = () => console.log("OKX WS 错误");
    ws.onclose = () => console.log("OKX WS 断开");

    return () => ws.close();
  }, []);

  return tickers;
}
