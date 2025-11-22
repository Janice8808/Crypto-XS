import React from "react";
import { Link } from "react-router-dom";
import { coinIcons } from "../assets/coinIcons";
import { useOkxTickers } from "@/hooks/useOkxTickers";

const SYMBOLS = [
  "BTC-USDT","ETH-USDT","BNB-USDT","SOL-USDT","XRP-USDT",
  "DOGE-USDT","ADA-USDT","TRX-USDT","AVAX-USDT","DOT-USDT",
  "LTC-USDT","LINK-USDT","ATOM-USDT","FIL-USDT","BCH-USDT",
  "MATIC-USDT","TON-USDT","ICP-USDT","APT-USDT","NEAR-USDT",
  "SAND-USDT","MANA-USDT","ARB-USDT","OP-USDT","SUI-USDT"
];

export default function Market() {
  const tickers = useOkxTickers();  // ⭐ 不传 symbols
  const list = Object.values(tickers); 

  return (
    <div className="w-full min-h-screen text-black px-3 py-3 bg-white">

      <h1 className="text-xl font-bold mb-3">Market</h1>

      {/* 表头 */}
      <div className="flex items-center px-1 py-2 font-semibold text-gray-500 text-xs border-b">
        <span className="w-1/3">Symbol</span>
        <span className="w-1/3 text-right">Price</span>
        <span className="w-1/3 text-right">24h</span>
      </div>

{list.map((coin) => {
  const isUp = coin.change >= 0;

  return (
    <Link
      key={coin.symbol}
      to={`/coin/${coin.symbol}-USDT`}
      className="flex items-center px-1 py-3 hover:bg-gray-100 border-b transition"
      // ⭐ py-3 → 每行高度更大，呼吸感加大
    >
      {/* 左侧：图标 + 名称 */}
      <span className="w-1/3 flex items-center text-gray-700 text-sm">
        <img
          src={coinIcons[coin.symbol] || "/images/default.png"}
          alt={coin.symbol}
          className="w-5 h-5 rounded-full mr-2"
        />
        {coin.symbol}/USDT
      </span>

      {/* 最新价 */}
      <span className="w-1/3 text-right text-sm text-gray-700">
        ${coin.price}
      </span>

      {/* 涨跌幅 */}
      <span className="w-1/3 flex justify-end">
        <span
          className="text-white rounded flex items-center justify-center text-xs"
          style={{
            width: "60px",
            height: "26px",   // ⭐ 从 22px → 26px，框变更高、更好看
            backgroundColor: isUp ? "#22c55e" : "#ef4444",
            fontWeight: 600,
            marginTop: "-1px", // ⭐ 稍微上提一点视觉更居中
          }}
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
