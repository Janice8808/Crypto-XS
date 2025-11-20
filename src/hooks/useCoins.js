import { useState, useEffect } from "react";
import { apiFetch } from "@/api/http";

// ⭐ 固定顺序，不准乱
const FIXED_LIST = [
  "BTC","ETH","BNB","SOL","XRP",
  "DOGE","ADA","TRX","AVAX","DOT",
  "LTC","LINK","ATOM","FIL","BCH",
  "MATIC","TON","ICP","APT","NEAR",
  "SAND","MANA","ARB","OP","SUI"
];

// ⭐ 全局缓存（只更新 price / change）
let lastCoinsCache = {};

export const useCoins = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [hotCoins, setHotCoins] = useState([]);

  const HOT = ["BTC", "ETH", "BNB"];

  const loadPrices = async () => {
    try {
      const data = await apiFetch("/api/coins");
      if (!Array.isArray(data)) return;

      // 更新缓存
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

      // ⭐ 基于固定顺序生成页面显示列表
      const coinsArray = FIXED_LIST.map(sym => ({
        symbol: sym,
        logo: `/images/coins/${sym}.png`,
        price: lastCoinsCache[sym]?.price || "--",
        change: lastCoinsCache[sym]?.change || "0.00"
      }));

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
