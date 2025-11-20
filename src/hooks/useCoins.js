import { useState, useEffect } from "react";
import { apiFetch } from "@/api/http";

// ⭐ 全局缓存
let lastCoinsCache = {};

export const useCoins = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [hotCoins, setHotCoins] = useState([]);

  const HOT = ["BTC", "ETH", "BNB"];

  const loadPrices = async () => {
    try {
      const data = await apiFetch("/api/coins");

      if (!Array.isArray(data)) return;

      data.forEach((item) => {
        if (!item || !item.symbol) return;

        const sym = item.symbol;

        if (!lastCoinsCache[sym]) {
          lastCoinsCache[sym] = item;
        } else {
          if (item.price) lastCoinsCache[sym].price = item.price;
          if (item.change) lastCoinsCache[sym].change = item.change;
        }
      });

      const coinsArray = Object.values(lastCoinsCache);

      setAllCoins(coinsArray);
      setHotCoins(coinsArray.filter((c) => HOT.includes(c.symbol)));
    } catch (err) {
      console.log("Load coins error:", err);
    }
  };

  useEffect(() => {
    loadPrices();
    const timer = setInterval(loadPrices, 3000);
    return () => clearInterval(timer);
  }, []);

  return {
    allCoins,
    hotCoins,
  };
};
