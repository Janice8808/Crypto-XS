import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { coinIcons } from "../assets/coinIcons";
import { useOkxTickers } from "@/hooks/useOkxTickers";
import { useTranslation } from "react-i18next";

/* ---------------------------------------------
   ⭐ 1. 静态首屏数据（页面秒开）
--------------------------------------------- */
const STATIC_MARKET = [
  { symbol: "BTC", price: "--", change: 0 },
  { symbol: "BNB", price: "--", change: 0 },
  { symbol: "ETH", price: "--", change: 0 },
  { symbol: "XRP", price: "--", change: 0 },
  { symbol: "SOL", price: "--", change: 0 },
  { symbol: "ADA", price: "--", change: 0 },
  { symbol: "DOGE", price: "--", change: 0 },
  { symbol: "AVAX", price: "--", change: 0 },
  { symbol: "ATOM", price: "--", change: 0 },
  { symbol: "TRX", price: "--", change: 0 },
  { symbol: "DOT", price: "--", change: 0 },
];

const SYMBOLS = [
  "BTC-USDT","ETH-USDT","BNB-USDT","SOL-USDT","XRP-USDT",
  "DOGE-USDT","ADA-USDT","TRX-USDT","AVAX-USDT","DOT-USDT",
  "LTC-USDT","LINK-USDT","ATOM-USDT","FIL-USDT","BCH-USDT",
  "MATIC-USDT","TON-USDT","ICP-USDT","APT-USDT","NEAR-USDT",
  "SAND-USDT","MANA-USDT","ARB-USDT","OP-USDT","SUI-USDT"
];

export default function Market() {
  const { t } = useTranslation();

  /* ---------------------------------------------
      ⭐ 初始静态列表
  --------------------------------------------- */
  const [marketList, setMarketList] = useState(STATIC_MARKET);

  /* ---------------------------------------------
      ⭐ WebSocket 实时行情补充
  --------------------------------------------- */
  const tickers = useOkxTickers(SYMBOLS);

  useEffect(() => {
    const real = Object.values(tickers);

    if (real.length > 0) {
      const formatted = real.map((c) => ({
        symbol: c.symbol,
        price: c.price,
        change: c.change,
      }));

      setMarketList(formatted);
    }
  }, [tickers]);

  return (
    <div className="w-full min-h-screen text-black px-3 py-3 bg-white">

      <h1 className="text-xl font-bold mb-3">{t("Market")}</h1>

      {/* 表头 */}
      <div className="flex items-center px-1 py-2 font-semibold text-gray-500 text-xs border-b">
        <span className="w-1/3">{t("Symbol")}</span>
        <span className="w-1/3 text-right">{t("Price")}</span>
        <span className="w-1/3 text-right">{t("24h")}</span>
      </div>

      {marketList.map((coin) => {
        const isUp = coin.change >= 0;

        return (
          <Link
            key={coin.symbol}
            to={`/trade?symbol=${coin.symbol}USDT`}
            className="flex items-center px-1 py-3 hover:bg-gray-100 border-b transition"
          >
            {/* Symbol */}
            <span className="w-1/3 flex items-center text-gray-700 text-sm">
              <img
                src={coinIcons[coin.symbol] || "/images/default.png"}
                alt={coin.symbol}
                className="w-5 h-5 rounded-full mr-2"
              />
              {coin.symbol}/{t("USDT")}
            </span>

            {/* Price */}
            <span className="w-1/3 text-right text-sm text-gray-700">
              {coin.price === "--" ? "--" : `$${coin.price}`}
            </span>

            {/* 24h Change */}
            <span className="w-1/3 flex justify-end">
              <span
                className="text-white rounded flex items-center justify-center text-xs"
                style={{
                  width: "60px",
                  height: "26px",
                  backgroundColor:
                    coin.price === "--"
                      ? "#22c55e"
                      : isUp
                      ? "#22c55e"
                      : "#ef4444",
                  fontWeight: 600,
                }}
              >
                {coin.price === "--"
                  ? "--"
                  : `${isUp ? "+" : ""}${coin.change}%`}
              </span>
            </span>
          </Link>
        );
      })}

    </div>
  );
}
