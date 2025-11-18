useEffect(() => {
  const pair = toUSDT(currentSymbol).toLowerCase(); // btcusdt

  // ⭐ 自动区分 本地 / 上线（Cloudflare）
  const WS_URL = import.meta.env.PROD
    ? `wss://${window.location.host}`    // 线上自动连到你的域名
    : "ws://localhost:5000";             // 本地开发环境

  const ws = new WebSocket(WS_URL);

  ws.onopen = () => {
    console.log("🔥 Trade WS connected:", WS_URL);
  };

  ws.onmessage = (e) => {
    try {
      const d = JSON.parse(e.data);

      // 不是盘口结构，跳过（因为后台还有订单通知等类型）
      if (!d.bids || !d.asks) return;

      // 更新盘口
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
