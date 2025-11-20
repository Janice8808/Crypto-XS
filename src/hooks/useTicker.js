import { useEffect, useState } from "react";
import { apiFetch } from "@/api/http";

export const useTicker = (symbolUSDT) => {
  const symbol = symbolUSDT.replace("USDT", ""); // BTCUSDT → BTC

  const [ticker, setTicker] = useState({
    price: 0,
    changePercent: 0,
    low: 0,
    high: 0,
    amount24h: 0,
  });

  const load = async () => {
    try {
      const data = await apiFetch("/api/coins");
      if (!Array.isArray(data)) return;

      const coin = data.find((c) => c.symbol === symbol);
      if (!coin) return;

      setTicker({
        price: Number(coin.price),
        changePercent: Number(coin.change),
        low: coin.low ?? 0,
        high: coin.high ?? 0,
        amount24h: coin.vol ?? 0,
      });
    } catch (err) {
      console.log("Ticker load error:", err);
    }
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 2000);
    return () => clearInterval(t);
  }, [symbolUSDT]);

  return ticker;
};
