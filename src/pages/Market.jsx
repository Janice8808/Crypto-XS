import React from "react";
import { Link } from "react-router-dom";
import { coinIcons } from "../assets/coinIcons";
import { useOkxTickers } from "@/hooks/useOkxTickers";

// 订阅 24 个币种
const SYMBOLS = [
  "BTC-USDT","ETH-USDT","BNB-USDT","SOL-USDT","XRP-USDT",
  "DOGE-USDT","ADA-USDT","TRX-USDT","AVAX-USDT","DOT-USDT",
  "LTC-USDT","LINK-USDT","ATOM-USDT","FIL-USDT","BCH-USDT",
  "MATIC-USDT","TON-USDT","ICP-USDT","APT-USDT","NEAR-USDT",
  "SAND-USDT","MANA-USDT","ARB-USDT","OP-USDT","SUI-USDT"
];

export default function Market() {
  const tickers = useOkxTickers(SYMBOLS);
  const list = Object.values(tickers); 

  return (
    <div className="w-full min-h-screen text-black px-3 py-4 bg-white">

      {/* 标题 */}
      <h1 className="text-2xl font-bold mb-4">Market</h1>

      {/* 列表表头 */}
      <div className="flex items-center px-1 py-2 font-semibold text-gray-600 border-b">
        <span className="w-1/3">Symbol</span>
        <span className="w-1/3 text-right">Latest Price</span>
        <span className="w-1/3 text-right">24h</span>
      </div>

      {/* 币种列表 */}
      {list.map((coin) => {
        const isUp = coin.change >= 0;

        return (
          <Link
            key={coin.symbol}
            to={`/coin/${coin.symbol}USDT`}
            className="flex items-center px-1 py-3 hover:bg-gray-100 border-b transition"
          >
            {/* 图标 + 币种名称 */}
            <span className="w-1/3 flex items-center text-gray-700 font-medium">
              <img
                src={coinIcons[coin.symbol] || "/images/default.png"}
                alt={coin.symbol}
                className="w-6 h-6 rounded-full mr-2"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/default-coin.png";
                }}
              />

              {/* BTC/USDT 格式 */}
              {coin.symbol}/USDT
            </span>

            {/* 最新价 */}
            <span
              className={`w-1/3 text-right text-base font-semibold ${
                isUp ? "text-green-500" : "text-red-500"
              }`}
            >
              ${coin.price}
            </span>

            {/* 涨跌幅 */}
            <span className="w-1/3 flex justify-end">
              <span
                className={`text-white px-2 py-1 text-sm rounded ${
                  isUp ? "bg-green-500" : "bg-red-500"
                }`}
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
}
