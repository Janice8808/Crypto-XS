import { useState, useEffect } from "react";
import { apiFetch } from "@/api/http";

export const useCoins = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [hotCoins, setHotCoins] = useState([]);

  const HOT = ["BTC", "ETH", "BNB"];

  const loadPrices = async () => {
    try {
      // ⭐ 调用你后端的 REST API（无 WebSocket，更稳定）
      const data = await apiFetch("/api/coins");

      // 全部币种
      setAllCoins(data);

      // 热门币（BTC / ETH / BNB）
      setHotCoins(data.filter((c) => HOT.includes(c.symbol)));
    } catch (err) {
      console.log("Load coins error:", err);
    }
  };

  useEffect(() => {
    loadPrices(); // 首次加载
    const timer = setInterval(loadPrices, 3000); // ⭐ 每 3 秒刷新
    return () => clearInterval(timer);
  }, []);

  return {
    allCoins,
    hotCoins,
  };
};
