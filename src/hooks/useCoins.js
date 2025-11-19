import { useState, useEffect } from "react";
import { apiFetch } from "@/api/http";

export const useCoins = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [hotCoins, setHotCoins] = useState([]);
  const [wsConnected, setWsConnected] = useState(false);

  // 保存 CoinGecko 数据：按 id & 按 symbol 映射
  const [coinById, setCoinById] = useState({});
  const [coinBySymbol, setCoinBySymbol] = useState({});

  // 25 个实时币种
  const realTimeList = [
    "BTCUSDT","ETHUSDT","BNBUSDT","XRPUSDT","SOLUSDT",
    "ADAUSDT","DOGEUSDT","LTCUSDT","DOTUSDT","MATICUSDT",
    "AVAXUSDT","SHIBUSDT","TRXUSDT","BCHUSDT","LINKUSDT",
    "UNIUSDT","ATOMUSDT","XMRUSDT","ETCUSDT","FILUSDT",
    "ALGOUSDT","VETUSDT","ICPUSDT","MANAUSDT","EOSUSDT"
  ];

  const hotList = ["BTCUSDT", "ETHUSDT", "BCHUSDT"];

  // 🌟 fallback：从后端拿一次（CoinGecko 官方数据）
  const fetchFallbackData = async () => {
    try {
      const data = await apiFetch("/api/market");

      const mapById = {};
      const mapBySymbol = {};

      data.forEach((c) => {
        // c.id: "bitcoin" / "ethereum" ...
        // c.symbol: "btc" / "eth" ...
        mapById[c.id] = c;

        const symUSDT = (c.symbol || "").toUpperCase() + "USDT";
        mapBySymbol[symUSDT] = c;
      });

      setCoinById(mapById);
      setCoinBySymbol(mapBySymbol);

      // 用 fallback 先渲染一版（避免页面空白）
      const list = realTimeList
        .map((sym) => {
          const coin = mapBySymbol[sym];
          if (!coin) return null;
          return {
            symbol: sym,
            price: Number(coin.current_price).toFixed(4),
            change: Number(
              coin.price_change_percentage_24h ?? 0
            ).toFixed(2),
            logo: coin.image || "/images/default-coin.png",
          };
        })
        .filter(Boolean);

      setAllCoins(list);
      setHotCoins(list.filter((c) => hotList.includes(c.symbol)));
    } catch (e) {
      console.log("fallback 获取失败：", e);
    }
  };

  // 🌟 WebSocket：实时行情（用 symbol 映射 CoinGecko logo）
  useEffect(() => {
    let ws;

    function connectWs() {
      ws = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

      ws.onopen = () => {
        setWsConnected(true);
        console.log("🔥 Binance WS 已连接");
      };

      ws.onclose = () => {
        setWsConnected(false);
        console.log("❗WS 断开，5 秒后重连...");
        setTimeout(connectWs, 5000);
      };

      ws.onmessage = (e) => {
        const tickers = JSON.parse(e.data);

        const filtered = tickers
          .filter((item) => realTimeList.includes(item.s))
          .map((item) => {
            // 这里直接用 symbol 去找 CoinGecko 数据
            const gecko = coinBySymbol[item.s];

            return {
              symbol: item.s,
              price: Number(item.c).toFixed(4),
              change: Number(item.P).toFixed(2),
              logo: gecko?.image || "/images/default-coin.png",
            };
          });

        setAllCoins(filtered);
        setHotCoins(filtered.filter((c) => hotList.includes(c.symbol)));
      };
    }

    connectWs();
    return () => ws && ws.close();
  }, [coinBySymbol]); // ⭐ 有 CoinGecko 映射后，重建 WS 使用官方 logo

  // 页面初次渲染：先走 fallback
  useEffect(() => {
    fetchFallbackData();
  }, []);

  return {
    allCoins,
    hotCoins,
    wsConnected,
  };
};
