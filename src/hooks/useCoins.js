import { useState, useEffect } from "react";
import { apiFetch } from "@/api/http";

export const useCoins = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [hotCoins, setHotCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const realTimeList = [
    "BTCUSDT","ETHUSDT","BNBUSDT","XRPUSDT","SOLUSDT",
    "ADAUSDT","DOGEUSDT","LTCUSDT","DOTUSDT","MATICUSDT",
    "AVAXUSDT","SHIBUSDT","TRXUSDT","BCHUSDT","LINKUSDT",
    "UNIUSDT","ATOMUSDT","XMRUSDT","ETCUSDT","FILUSDT",
    "ALGOUSDT","VETUSDT","ICPUSDT","MANAUSDT","EOSUSDT"
  ];

  const hotList = ["BTCUSDT","ETHUSDT","BCHUSDT"];

  const coinIdsMap = {
    BTCUSDT: "bitcoin",
    ETHUSDT: "ethereum",
    BNBUSDT: "binancecoin",
    XRPUSDT: "ripple",
    SOLUSDT: "solana",
    ADAUSDT: "cardano",
    DOGEUSDT: "dogecoin",
    LTCUSDT: "litecoin",
    DOTUSDT: "polkadot",
    MATICUSDT: "matic-network",
    AVAXUSDT: "avalanche-2",
    SHIBUSDT: "shiba-inu",
    TRXUSDT: "tron",
    BCHUSDT: "bitcoin-cash",
    LINKUSDT: "chainlink",
    UNIUSDT: "uniswap",
    ATOMUSDT: "cosmos",
    XMRUSDT: "monero",
    ETCUSDT: "ethereum-classic",
    FILUSDT: "filecoin",
    ALGOUSDT: "algorand",
    VETUSDT: "vechain",
    ICPUSDT: "internet-computer",
    MANAUSDT: "decentraland",
    EOSUSDT: "eos",
  };

  const fetchCoinsWithLogo = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1️⃣ 统一从后端 /api/coins 拿数据，做 30 秒缓存
      let data;
      const cache = localStorage.getItem("marketCoins");
      const cacheTime = localStorage.getItem("marketCoinsTime");

      if (cache && cacheTime && Date.now() - Number(cacheTime) < 30000) {
        data = JSON.parse(cache);
      } else {
        // 走自己后端，不再直接访问 Binance
        data = await apiFetch("/api/coins");
        localStorage.setItem("marketCoins", JSON.stringify(data));
        localStorage.setItem("marketCoinsTime", String(Date.now()));
      }

      // 2️⃣ 把返回结果按 id 存成 map，方便用 coinIdsMap 查
      const coinById = {};
      data.forEach((c) => {
        if (c.id) {
          coinById[c.id] = c;
        }
      });

      // 3️⃣ 组合成需要的列表：symbol 还是用 BTCUSDT 这套
      const filteredAll = realTimeList
        .map((sym) => {
          const id = coinIdsMap[sym]; // 例如 BTCUSDT -> "bitcoin"
          const coin = coinById[id];
          if (!coin) return null;

          return {
            symbol: sym,                                      // 仍然 BTCUSDT
            price: Number(coin.price).toFixed(4),             // 后端给的价格
            change: Number(coin.change ?? 0).toFixed(2),      // 24h 涨跌幅
            logo: coin.image || "/images/default-coin.png",   // 后端给的 image
          };
        })
        .filter(Boolean);

      const filteredHot = filteredAll.filter((c) =>
        hotList.includes(c.symbol)
      );

      setAllCoins(filteredAll);
      setHotCoins(filteredHot);
    } catch (err) {
      console.error("获取币种数据失败:", err);
      setAllCoins([]);
      setHotCoins([]);
      setError("获取币种数据失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinsWithLogo();
    // 可选：每 30 秒自动刷新
    const interval = setInterval(fetchCoinsWithLogo, 30000);
    return () => clearInterval(interval);
  }, []);

  return { allCoins, hotCoins, loading, error };
};
