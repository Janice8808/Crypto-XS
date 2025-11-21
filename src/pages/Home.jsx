// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { coinIcons } from "../assets/coinIcons";
import { useOkxTickers } from "@/hooks/useOkxTickers";

// ============ 地址遮挡函数 ============
const maskAddress = (addr) => {
  if (!addr) return "--";
  if (addr.length < 16) return addr;
  return `${addr.slice(0, 6)}****${addr.slice(-10)}`;
};

/* SVG ICONS ————省略，你的图标全部保留不动 */
const iconUser = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke="#444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="7" r="4" />
    <path d="M5 21c0-4 3-7 7-7s7 3 7 7" />
  </svg>
);
// ……你已有的 icon 全部保留
// 省略 icons...


// ===================== 实时行情：一次性订阅 24 个币 =====================
const SYMBOLS = [
  "BTC-USDT","ETH-USDT","BNB-USDT","SOL-USDT","XRP-USDT",
  "DOGE-USDT","ADA-USDT","TRX-USDT","AVAX-USDT","DOT-USDT",
  "LTC-USDT","LINK-USDT","ATOM-USDT","FIL-USDT","BCH-USDT",
  "MATIC-USDT","TON-USDT","ICP-USDT","APT-USDT","NEAR-USDT",
  "SAND-USDT","MANA-USDT","ARB-USDT","OP-USDT","SUI-USDT"
];


const Home = () => {

  // ⭐ 实时 WS 行情（对象形式）
  const tickers = useOkxTickers(SYMBOLS);

  // ⭐ 转换为数组
  const allCoins = Object.values(tickers);

  // ⭐ 热门币（直接从 tickers 拿）
  const btc = tickers["BTC-USDT"] || { price: "--", change: 0 };
  const eth = tickers["ETH-USDT"] || { price: "--", change: 0 };
  const bnb = tickers["BNB-USDT"] || { price: "--", change: 0 };

  const address = localStorage.getItem("address") || "";
  const maskedAddress = maskAddress(address);

  const [uid, setUid] = useState("--");
  useEffect(() => {
    fetch("https://pankouhoutai.shop/api/user/balance", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((r) => r.json())
      .then((d) => {
        if (d?.userId) setUid(d.userId);
      });
  }, []);

  const features = [
    { name: "User center", icon: iconUser },
    { name: "MSb", icon: iconMSB },
    { name: "introduction", icon: iconIntro },
    { name: "Currency", icon: iconCurrency },
    { name: "Deposit", icon: iconDeposit },
    { name: "DeFi", icon: iconDefi },
    { name: "Futures", icon: iconFutures },
    { name: "Withdraw", icon: iconWithdraw },
  ];

  const [currentBanner, setCurrentBanner] = useState(0);
  const [showLang, setShowLang] = useState(false);
  const [unread] = useState(2);

  const images = ["/images/banner1.jpg", "/images/banner2.jpg", "/images/banner3.jpg"];

  useEffect(() => {
    const t = setInterval(() => {
      setCurrentBanner((p) => (p + 1) % images.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const top3 = [
    { symbol: "BTC/USDT", price: btc.price, change: btc.change },
    { symbol: "ETH/USDT", price: eth.price, change: eth.change },
    { symbol: "BNB/USDT", price: bnb.price, change: bnb.change },
  ];

  const stableList = allCoins; // 直接全部显示 WS 行情


  return (
    <div className="w-full max-w-5xl mx-auto bg-gray-100 min-h-screen text-black relative">

      {/* Header */}
      <div className="w-full bg-[#FFB800] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2 flex-1">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            {iconUser}
          </div>

          <div className="flex-1">
            <div className="bg-white px-3 py-1 rounded text-gray-700 text-sm font-medium truncate w-full">
              {maskedAddress}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 ml-3 text-white">
          <button className="relative p-0 bg-transparent">
            <MailIcon />
            {unread > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-[10px] px-1 rounded-full">
                {unread}
              </span>
            )}
          </button>

          <button className="p-0 bg-transparent" onClick={() => setShowLang(!showLang)}>
            <GlobeIcon />
          </button>
        </div>
      </div>

      {showLang && (
        <div className="absolute right-4 top-16 bg-white rounded shadow w-28 text-black">
          <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">English</div>
          <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">中文</div>
        </div>
      )}


      {/* Banner */}
      <div className="w-full relative bg-gray-800 overflow-hidden">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            className={`w-full h-auto transition-opacity duration-700 ${
              idx === currentBanner ? "opacity-100" : "opacity-0"
            }`}
            style={{ display: idx === currentBanner ? "block" : "none" }}
          />
        ))}
      </div>



      <div className="py-2 flex items-center bg-gradient-to-t from-gray-200 via-gray-500 to-gray-800 text-white px-3 -mt-1">
        🔈 <span className="ml-2 text-sm">Wellcome to visit Crypto.com</span>
      </div>



      <div className="-mt-2 bg-white mx-2 rounded-xl p-4 shadow">

        {/* 功能图标 */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          {features.map((item) => (
            <Link
              key={item.name}
              to={
                item.name === "User center" ? "/user" :
                item.name === "MSb" ? "/user/msb" :
                item.name === "introduction" ? "/intro" :
                item.name === "Currency" ? "/coin-detail" :
                item.name === "Deposit" ? "/deposit1" :
                item.name === "DeFi" ? "/defi" :
                item.name === "Futures" ? "/trade" :
                "/wallet/USDT/withdraw"
              }
              className="flex flex-col items-center text-gray-700 text-xs"
            >
              <div className="mb-1">{item.icon}</div>
              {item.name}
            </Link>
          ))}
        </div>

        {/* 热门币 */}
        <div className="grid grid-cols-3 gap-4">
          {top3.map((coin) => {
            const up = coin.change >= 0;
            return (
              <div key={coin.symbol} className="text-center py-2">
                <div className="text-gray-600 text-sm">{coin.symbol}</div>

                <div className={`font-bold ${up ? "text-green-500" : "text-red-500"}`}>
                  ${Number(coin.price).toFixed(1)}
                </div>

                <div className={`${up ? "text-green-500" : "text-red-500"}`}>
                  {up ? "+" : ""}{Number(coin.change).toFixed(2)}%
                </div>
              </div>
            );
          })}
        </div>

      </div>



      {/* 实时行情 */}
      <div className="mt-4 bg-white rounded-lg shadow mx-2 p-2">
        <div className="px-2 py-1 font-semibold text-gray-500">Popular list</div>

        <div className="flex items-center px-2 py-2 border-b font-semibold text-gray-500">
          <span className="w-1/3">Symbol</span>
          <span className="w-1/3 text-center">Latest Price</span>
          <span className="w-1/3 text-right">24h</span>
        </div>

        {stableList.map((coin) => {
          const up = coin.change >= 0;

          return (
            <Link
              key={coin.symbol}
              to={`/coin/${coin.symbol}USDT`}
              className="flex items-center px-2 py-2 hover:bg-gray-100 transition"
            >
              <div className="w-1/3 flex items-center">
                <img
                  src={coinIcons[coin.symbol] || "/images/default.png"}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span className="text-gray-600">{coin.symbol}</span>
              </div>

              <div className="w-1/3 text-center text-gray-600">
                ${Number(coin.price).toFixed(1)}
              </div>

              <div className="w-1/3 text-right">
                <span
                  className={`px-2 py-1 rounded text-white font-semibold ${
                    up ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {up ? "+" : ""}{Number(coin.change).toFixed(2)}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
};

export default Home;
