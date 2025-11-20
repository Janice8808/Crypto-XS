import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCoins } from "../hooks/useCoins";
import useTicker from "../hooks/useTicker";


// ============ 地址遮挡函数 ============
const maskAddress = (addr) => {
  if (!addr) return "--";
  if (addr.length < 16) return addr;
  return `${addr.slice(0, 6)}****${addr.slice(-10)}`;
};

/* ---------------- SVG ICONS（统一细线风） ---------------- */

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

/* 顶部邮件 SVG */
const MailIcon = () => (
  <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="M3 5l9 7 9-7" />
  </svg>
);

/* 顶部地球 SVG */
const GlobeIcon = () => (
  <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a15 15 0 0 1 0 18" />
  </svg>
);

const Home = () => {

  const { allCoins, hotCoins } = useCoins();

  const btc = useTicker(); 

  // =============== 用户地址 + UID ===============
  const address = localStorage.getItem("address") || "";
  const maskedAddress = maskAddress(address);

  const [uid, setUid] = useState("--");

  useEffect(() => {
    fetch("https://pankouhoutai.shop/api/user/balance", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.userId) setUid(data.userId);
      });
  }, []);

  // =============== 功能入口保持原样 ===============
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

  /* ============================
   🔥 1. 热门币种固定三种，不跳位置
   ============================ */
  const HOT_SYMBOLS = ["BTC", "ETH", "BNB"];  
  const top3 = HOT_SYMBOLS.map(sym =>
    hotCoins.find(c => c.symbol === sym) || { symbol: sym, price: "--", change: 0 }
  );

  /* ============================
   🔥 2. 实时行情固定 25 个，不跳位置
   ============================ */
  const DISPLAY_SYMBOLS = [
    "BTC","ETH","BNB","SOL","XRP","DOGE","ADA","TRX","AVAX","DOT",
    "LTC","UNI","LINK","ATOM","ETC","XMR","TON","APT","NEAR","FTM",
    "ALGO","SAND","MANA","ICP","FIL"
  ];
  const stableList = DISPLAY_SYMBOLS.map(sym =>
    allCoins.find(c => c.symbol === sym) || { symbol: sym, price: "--", change: 0, logo: "/images/default.png" }
  );

  return (
    <div className="w-full max-w-5xl mx-auto bg-gray-100 min-h-screen text-black relative">

{/* ===== HEADER：无 UID 版本 ===== */}
<div className="w-full bg-[#FFB800] px-4 py-2 flex items-center justify-between">

  {/* 左边：头像 + 长白条地址 */}
  <div className="flex items-center space-x-2 flex-1">
    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
      {iconUser}
    </div>

    {/* 地址白条（已加长） */}
    <div className="flex-1">
      <div className="bg-white px-3 py-1 rounded text-gray-700 text-sm font-medium truncate w-full">
        {maskedAddress}
      </div>
    </div>
  </div>

  {/* 右侧 Mail + Language */}
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


      {/* 语言选择 */}
      {showLang && (
        <div className="absolute right-4 top-16 bg-white rounded shadow w-28 text-black">
          <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">English</div>
          <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">中文</div>
        </div>
      )}

      {/* ===== Banner ===== */}
      <div className="w-full h-56 relative overflow-hidden bg-gray-800">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            className={`w-full h-full object-cover absolute transition-opacity duration-700 ${idx === currentBanner ? "opacity-100" : "opacity-0"
              }`}
          />
        ))}
      </div>

      {/* ===== 公告条 ===== */}
      <div className="py-2 flex items-center bg-gradient-to-t from-gray-200 via-gray-500 to-gray-800 text-white px-3 -mt-1">
        🔈 <span className="ml-2 text-sm">欢迎来到 TradeUS 模拟交易平台！</span>
      </div>

      {/* ===== 大白卡片：功能入口 + 图片 + 热门币种 ===== */}
      <div className="-mt-2 bg-white mx-2 rounded-xl p-4 shadow">

        {/* 功能入口 */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          {features.map((item) => (
            <Link
              key={item.name}
              to={
                item.name === "User center" ? "/user" :
                  item.name === "MSb" ? "/user/msb" :
                    item.name === "introduction" ? "/intro" :
                      item.name === "Currency" ? "/coin/BTC" :
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

        {/* Online + Fast buy */}
        <div className="flex gap-2 mb-6 px-1">
          <div className="w-1/3">
            <img
              src="/images/online.jpg"
              alt="Online Service"
              className="w-full h-[70px] rounded-lg object-fill"
            />
          </div>

          <div className="w-2/3">
            <img
              src="/images/fastbuy.jpg"
              alt="Fast Buying Coin"
              className="w-full h-[70px] rounded-lg object-fill"
            />
          </div>
        </div>

        {/* 热门币种（固定 3） */}
        <div className="grid grid-cols-3 gap-4">
          {top3.map((coin) => {
            const up = coin.change >= 0;
            return (
              <div key={coin.symbol} className="text-center py-2">
                <div className="text-gray-600 text-sm">{coin.symbol}</div>
                <div className={`font-bold ${up ? "text-green-500" : "text-red-500"}`}>
                  ${coin.symbol === "BTC" ? btc : coin.price}
                </div>
                <div className={`${up ? "text-green-500" : "text-red-500"}`}>
                  {up ? "+" : ""}{coin.change}%
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ===== 实时行情（白字百分比） ===== */}
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
                <img src={coin.logo} className="w-6 h-6 rounded-full mr-2" />
                <span className="text-gray-600">{coin.symbol}</span>
              </div>

              <div className="w-1/3 text-center text-gray-600">
                ${coin.price}
              </div>

              <div className="w-1/3 text-right">
                <span
                  className={`px-2 py-1 rounded text-white font-semibold ${up ? "bg-green-500" : "bg-red-500"
                    }`}
                >
                  {up ? "+" : ""}{coin.change}%
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
