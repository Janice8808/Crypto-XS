import { useState, useEffect } from "react";
import { apiFetch } from "@/api/http";

export const useCoins = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [hotCoins, setHotCoins] = useState([]);
  const [wsConnected, setWsConnected] = useState(false);

  // 25 个实时币
  const realTimeList = [
    "BTCUSDT","ETHUSDT","BNBUSDT","XRPUSDT","SOLUSDT",
    "ADAUSDT","DOGEUSDT","LTCUSDT","DOTUSDT","MATICUSDT",
    "AVAXUSDT","SHIBUSDT","TRXUSDT","BCHUSDT","LINKUSDT",
    "UNIUSDT","ATOMUSDT","XMRUSDT","ETCUSDT","FILUSDT",
    "ALGOUSDT","VETUSDT","ICPUSDT","MANAUSDT","EOSUSDT"
  ];

  const hotList = ["BTCUSDT","ETHUSDT","BCHUSDT"];

  // ========== 第一步：加载静态币种列表（来自后端 API） ==========
  useEffect(() => {
    async function loadCoins() {
      try {
        const list = await apiFetch("/api/coins");

        // 给每个币种加默认结构
        const formatted = list.map((c) => ({
          symbol: c.symbol,
          price: "--",
          change: 0,
          logo: `/images/coins/${c.symbol}.png`,
        }));

        // 初始显示
        const ordered = realTimeList.map(
          (sym) => formatted.find((c) => c.symbol === sym) || {
            symbol: sym,
            price: "--",
            change: 0,
            logo: `/images/coins/${sym}.png`,
          }
        );

        setAllCoins(ordered);
        setHotCoins(
          hotList.map(
            (sym) => formatted.find((c) => c.symbol === sym) || {
              symbol: sym,
              price: "--",
              change: 0,
              logo: `/images/coins/${sym}.png`,
            }
          )
        );
      } catch (e) {
        console.log("Load coins error", e);
      }
    }

    loadCoins();
  }, []);

  // ========== 第二步：WebSocket 行情（实时价格） ==========
  useEffect(() => {
    let ws;

    function connect() {
      ws = new WebSocket("wss://pankouhoutai.shop/ticker");

      ws.onopen = () => {
        setWsConnected(true);
        console.log("🔥 ticker WS connected");
      };

      ws.onclose = () => {
        setWsConnected(false);
        console.log("❗ ticker WS closed，5 秒后重连");
        setTimeout(connect, 5000);
      };

      ws.onmessage = (e) => {
        const t = JSON.parse(e.data);

        const sym = t.s;
        if (!realTimeList.includes(sym)) return;

        const price = Number(t.c || 0);
        const change = Number(t.P || 0);

        // 更新总列表
        setAllCoins((prev) => {
          const map = new Map(prev.map((c) => [c.symbol, c]));

          map.set(sym, {
            symbol: sym,
            price: price.toFixed(4),
            change: change.toFixed(2),
            logo: `/images/coins/${sym}.png`,
          });

          return realTimeList.map(
            (s) => map.get(s) || {
              symbol: s,
              price: "--",
              change: 0,
              logo: `/images/coins/${s}.png`,
            }
          );
        });

        // 更新 hotCoins
        if (hotList.includes(sym)) {
          setHotCoins((prev) => {
            const map = new Map(prev.map((c) => [c.symbol, c]));
            map.set(sym, {
              symbol: sym,
              price: price.toFixed(4),
              change: change.toFixed(2),
              logo: `/images/coins/${sym}.png`,
            });
            return hotList.map(
              (s) => map.get(s) || {
                symbol: s,
                price: "--",
                change: 0,
                logo: `/images/coins/${s}.png`,
              }
            );
          });
        }
      };
    }

    connect();
    return () => ws && ws.close();
  }, []);

  return {
    allCoins,
    hotCoins,
    wsConnected,
  };
};
