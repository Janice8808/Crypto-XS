useEffect(() => {
  const pair = toUSDT(currentSymbol).toLowerCase(); // btcusdt

  // ⭐ 自动区分 本地 / 上线（Cloudflare Pages 前端）
  const WS_URL = import.meta.env.PROD
  ? "wss://crypto-ht.onrender.com"
  : "ws://localhost:5000";

  const ws = new WebSocket(WS_URL);

  ws.onopen = () => {
    console.log("🔥 Trade WS connected:", WS_URL);
  };

  ws.onmessage = (e) => {
    try {
      const d = JSON.parse(e.data);

      // 🔥 后端推送的行情：盘口必须包含 bids / asks
      if (!d.bids || !d.asks) return; // 非盘口（订单/提现通知）直接跳过

      setOrderBook({
        bids: d.bids.map(([p, q]) => ({
          price: parseFloat(p),
          qty: parseFloat(q),
        })),
        asks: d.asks.map(([p, q]) => ({
          price: parseFloat(p),
          qty: parseFloat(q),
        })),
      });
    } catch (err) {
      console.error("解析盘口 WS 错误:", err);
    }
  };

  ws.onerror = (err) => {
    console.error("❌ Trade WS error:", err);
  };

  ws.onclose = () => {
    console.log("⚠️ Trade WS disconnected");
  };

  return () => ws.close();
}, [currentSymbol]);
