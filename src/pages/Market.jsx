import React from "react";
import { Link } from "react-router-dom";
import { coinIcons } from "../assets/coinIcons";
import { useOkxTickers } from "@/hooks/useOkxTickers";
import { useTranslation } from "react-i18next";

// 一次性订阅 24 个币
const SYMBOLS = [
  "BTC-USDT","ETH-USDT","BNB-USDT","SOL-USDT","XRP-USDT",
  "DOGE-USDT","ADA-USDT","TRX-USDT","AVAX-USDT","DOT-USDT",
  "LTC-USDT","LINK-USDT","ATOM-USDT","FIL-USDT","BCH-USDT",
  "MATIC-USDT","TON-USDT","ICP-USDT","APT-USDT","NEAR-USDT",
  "SAND-USDT","MANA-USDT","ARB-USDT","OP-USDT","SUI-USDT"
];

const Market = () => {
  const { t } = useTranslation();

  // ⭐ WebSocket 实时行情（每条 ticker 自动更新）
  const tickers = useOkxTickers(SYMBOLS);
  const list = Object.values(tickers); // 转成数组

  return (
    <div className="w-full min-h-screen text-black px-2 py-4 bg-white">
      
      {/* 页面标题 */}
      <h1 className="text-3xl font-bold mb-4">{t("Market")}</h1>

      {/* 表头 */}
      <div className="flex items-center px-1 py-1 font-semibold text-gray-700">
        <span className="w-1/3 text-gray-500">{t("Symbol")}</span>
        <span className="w-1/3 text-right text-gray-500">{t("Latest Price")}</span>
        <span className="w-1/3 text-right text-gray-500">{t("24h")}</span>
      </div>

      {/* 行情列表 */}
      {list.map((coin) => {
        const isUp = coin.change >= 0;

        return (
          <Link
            key={coin.symbol}
            to={`/coin/${coin.symbol}USDT`}
            className="flex items-center px-1 py-2 hover:bg-gray-100 transition"
          >
            {/* Symbol */}
            <span className="w-1/3 flex items-center text-gray-600 font-medium">
              <img
                src={coinIcons[coin.symbol] || "/images/default.png"}
                alt={coin.symbol}
                className="w-6 h-6 rounded-full mr-2"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/default-coin.png";
                }}
              />
              {coin.symbol}
            </span>

            {/* Latest Price */}
            <span
              className={`w-1/3 text-center ${
                isUp ? "text-green-500" : "text-red-500"
              } relative`}
              style={{ left: "24px" }}
            >
              ${coin.price}
            </span>

            {/* 24h 涨跌幅 */}
            <span className="w-1/3 flex justify-end">
              <span
                className={`text-white font-semibold px-1 py-0.5 text-sm ${
                  isUp ? "bg-green-500" : "bg-red-500"
                } rounded-sm`}
              >
                {isUp ? "+" : ""}
                {coin.change}%
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default Market;
