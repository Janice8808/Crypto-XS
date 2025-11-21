import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { coinIcons } from "../assets/coinIcons";
import { useOkxTickers } from "../hooks/useOkxTickers";


// ============ 地址遮挡函数 ============
const maskAddress = (addr) => {
  if (!addr) return "--";
  if (addr.length < 16) return addr;
  return `${addr.slice(0, 6)}****${addr.slice(-10)}`;
};

/* ---------------- SVG ICONS ---------------- */

const iconUser = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke="#444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="7" r="4" />
    <path d="M5 21c0-4 3-7 7-7s7 3 7 7" />
  </svg>
);

const iconMSB = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke="#444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 20 7 20 17 12 22 4 17 4 7" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const iconIntro = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke="#444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <line x1="8" y1="9" x2="16" y2="9" />
    <line x1="8" y1="13" x2="16" y2="13" />
  </svg>
);

const iconCurrency = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke="#444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 17 9 11 13 15 21 7" />
    <circle cx="21" cy="7" r="1.5" fill="#444" />
  </svg>
);

const iconDeposit = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke="#444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="7" width="18" height="12" rx="2" />
    <path d="M12 3v8" />
    <path d="M8 7h8" />
  </svg>
);

const iconDefi = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke="#444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c2 3 4 5 4 8a4 4 0 1 1-8 0c0-3 2-5 4-8z" />
    <path d="M12 15v7" />
  </svg>
);

const iconFutures = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke="#444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 17 9 11 13 15 21 7" />
    <path d="M17 7h4v4" />
  </svg>
);

const iconWithdraw = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke="#444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="7" width="18" height="12" rx="2" />
    <path d="M12 3v8" />
    <path d="M12 3l-3 3" />
    <path d="M12 3l3 3" />
  </svg>
);

const MailIcon = () => (
  <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="M3 5l9 7 9-7" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a15 15 0 0 1 0 18" />
  </svg>
);

const Home = () => {
  const [marqueeKey, setMarqueeKey] = useState(0);
  const SYMBOLS = [
  "BTC-USDT","ETH-USDT","BNB-USDT","SOL-USDT","XRP-USDT",
  "DOGE-USDT","ADA-USDT","TRX-USDT","AVAX-USDT","DOT-USDT",
  "LTC-USDT","LINK-USDT","ATOM-USDT","FIL-USDT","BCH-USDT",
  "MATIC-USDT","TON-USDT","ICP-USDT","APT-USDT","NEAR-USDT",
  "SAND-USDT","MANA-USDT","ARB-USDT","OP-USDT","SUI-USDT"
];

const tickers = useOkxTickers(SYMBOLS);
const allCoins = Object.values(tickers);


  // ⭐ 热门币（不再使用 useTicker）
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
 
  // ========= 2️⃣ ⭐ 定时器放这里 ⭐ =========
useEffect(() => {
  const timer = setInterval(() => {
    setMarqueeKey(k => k + 1);
  }, 4000);  // 跟动画时间一致

  return () => clearInterval(timer);
}, []);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrentBanner((p) => (p + 1) % images.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const HOT_SYMBOLS = ["BTC", "ETH", "BNB"];

const top3 = [
  { base: "BTC", symbol: "BTC/USDT", price: btc.price, change: btc.change },
  { base: "ETH", symbol: "ETH/USDT", price: eth.price, change: eth.change },
  { base: "BNB", symbol: "BNB/USDT", price: bnb.price, change: bnb.change },
];


// 直接复用 allCoins，与 Market 页面保持一致
const stableList = allCoins.slice(0, 30); // 想展示多少条你自己调


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
              <span className="absolute -top-1 -right-2 bg-red-600
 text-[10px] px-1 rounded-full">
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


{/* 滚动公告条 */}
<div className="
  relative overflow-hidden 
  h-36 
  px-3 -mt-1 flex items-center
  bg-gradient-to-b 
  from-[#1E1E22]
  via-[#3C3C42]
  via-[#63636A]
  to-[#A4A4AA]
">

  {/* 喇叭固定不动 */}
  <div className="text-white text-lg mr-2">🔈</div>

  {/* 滚动文字容器 */}
  <div className="relative flex-1 overflow-hidden">

    <div
      key={marqueeKey}
      className="absolute whitespace-nowrap text-white text-sm animate-marquee"
    >
      Welcome to visit Crypto.com
    </div>

  </div>
</div>



      <div className="-mt-6 bg-white mx-2 rounded-xl p-4 shadow relative z-10">

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

        <div className="flex gap-2 mb-6 px-1">
          <div className="w-1/3">
            <img src="/images/online.jpg" className="w-full h-[70px] rounded-lg object-fill" />
          </div>

          <div className="w-2/3">
            <img src="/images/fastbuy.jpg" className="w-full h-[70px] rounded-lg object-fill" />
          </div>
        </div>

<div className="grid grid-cols-3 gap-4">
  {top3.map((coin) => {
    const up = coin.change >= 0;

    return (
      <Link
        key={coin.symbol}
        to={`/coin/${coin.base}-USDT`}   // ⭐ 跳转用 "-"
        className="text-center py-2"
      >
        <div className="text-gray-600 text-sm">{coin.symbol}</div>  {/* ⭐ 显示用 "/" */}

        <div className={`font-bold ${up ? "text-green-500" : "text-red-500"}`}>
          ${Number(coin.price).toFixed(1)}
        </div>

        <div className={`${up ? "text-green-500" : "text-red-500"}`}>
          {up ? "+" : ""}
          {coin.change}%
        </div>
      </Link>
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
              to={`/coin/${coin.symbol}-USDT`}
              className="flex items-center px-2 py-2 hover:bg-gray-100 transition"
            >
              <div className="w-1/3 flex items-center">
                <img src={coinIcons[coin.symbol] || "/images/default.png"} className="w-6 h-6 rounded-full mr-2" />
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
                  {up ? "+" : ""}
                  {coin.change}%
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
