import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const navigate = useNavigate();
  const { t } = useTranslation();
  

  // 币种订阅
  const SYMBOLS = [
    "BTC-USDT","ETH-USDT","BNB-USDT","SOL-USDT","XRP-USDT",
    "DOGE-USDT","ADA-USDT","TRX-USDT","AVAX-USDT","DOT-USDT",
    "LTC-USDT","LINK-USDT","ATOM-USDT","FIL-USDT","BCH-USDT",
    "MATIC-USDT","TON-USDT","ICP-USDT","APT-USDT","NEAR-USDT",
    "SAND-USDT","MANA-USDT","ARB-USDT","OP-USDT","SUI-USDT"
  ];
// ====== 快速首屏：读取本地缓存 ======
const cache = JSON.parse(localStorage.getItem("tickers") || "{}");
const [initial, setInitial] = useState(cache); // 启动立即显示缓存

// ====== WebSocket 实时行情 ======
const wsTickers = useOkxTickers(SYMBOLS);

// ====== REST API 快速补充 ======
useEffect(() => {
  async function loadInitial() {
    try {
      const res = await fetch(
        "https://www.okx.com/api/v5/market/tickers?instType=SPOT"
      );
      const json = await res.json();

      const result = {};
      json.data.forEach((t) => {
        if (t.instId.endsWith("-USDT")) {
          const sym = t.instId.replace("-USDT", "");
// 如果没有 change24h（REST），用 open24h 计算涨跌
const last = Number(t.last);
const open = Number(t.open24h);

let change = 0;
if (open > 0) {
  change = ((last - open) / open * 100).toFixed(2);
}

result[sym] = {
  symbol: sym,
  price: last,
  change: change,
};

        }
      });

      // 保存到缓存
      localStorage.setItem("tickers", JSON.stringify(result));
      setInitial(result);
    } catch (err) {
      console.warn("REST 首屏行情失败:", err);
    }
  }

  loadInitial();
}, []);

// ====== 三层融合（缓存 → REST → WS） ======
const mergedTickers = {
  ...initial,
  ...wsTickers, // WebSocket 永远优先
};

const list = SYMBOLS.map((s) => {
  const base = s.replace("-USDT", "");
  return mergedTickers[base];
}).filter(Boolean);



// 顶部 3 个币
const btc = mergedTickers["BTC"] || { price: "--", change: 0 };
const eth = mergedTickers["ETH"] || { price: "--", change: 0 };
const bnb = mergedTickers["BNB"] || { price: "--", change: 0 };

  const address = localStorage.getItem("address") || "";
  const maskedAddress = maskAddress(address);
  const [uid, setUid] = useState("--");

  // 获取用户ID
  useEffect(() => {
    fetch("https://pankouhoutai.shop/api/user/balance", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((r) => r.json())
      .then((d) => {
        if (d?.userId) setUid(d.userId);
      });
  }, []);

  // 多语言 features
  const features = [
    { key: "User Center", icon: iconUser },
    { key: "MSb", icon: iconMSB },
    { key: "Introduction", icon: iconIntro },
    { key: "Currency", icon: iconCurrency },
    { key: "Deposit", icon: iconDeposit },
    { key: "DeFi", icon: iconDefi },
    { key: "Futures", icon: iconFutures },
    { key: "Withdraw", icon: iconWithdraw },
  ];

  const images = ["/images/banner1.jpg", "/images/banner2.jpg", "/images/banner3.jpg"];
  const [currentBanner, setCurrentBanner] = useState(0);

  // banner轮播
  useEffect(() => {
    const t = setInterval(() => {
      setCurrentBanner((p) => (p + 1) % images.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);



  // 未读通知
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    function handle() {
      setUnread(0);
    }
    window.addEventListener("notice-read", handle);
    return () => window.removeEventListener("notice-read", handle);
  }, []);

  useEffect(() => {
    async function loadUnread() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const r = await fetch("https://pankouhoutai.shop/api/notice/unread", {
          headers: { Authorization: "Bearer " + token }
        });

        const j = await r.json();
        setUnread(j.unread || 0);
      } catch {}
    }

    loadUnread();
    const t = setInterval(loadUnread, 10000);
    return () => clearInterval(t);
  }, []);

  // WebSocket 用户通知
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const wsUrl = import.meta.env.PROD
      ? "wss://pankouhoutai.shop/user-ws"
      : "ws://localhost:5000/user-ws";

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "AUTH", token }));
    };

    ws.onmessage = (event) => {
      let msg;
      try { msg = JSON.parse(event.data); } catch { return; }

      if (msg.type === "NEW_NOTICE") {
        setUnread(u => u + 1);
      }
    };

    return () => ws.close();
  }, []);

  const top3 = [
    { base: "BTC", symbol: "BTC/USDT", price: btc.price, change: btc.change },
    { base: "ETH", symbol: "ETH/USDT", price: eth.price, change: eth.change },
    { base: "BNB", symbol: "BNB/USDT", price: bnb.price, change: bnb.change },
  ];


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
          <button className="relative p-0 bg-transparent" onClick={() => navigate("/notice")}>
            <MailIcon />
            {unread > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-[10px] px-1 rounded-full">
                {unread}
              </span>
            )}
          </button>

          <button className="p-0 bg-transparent" onClick={() => navigate("/user/language")}>
            <GlobeIcon />
          </button>
        </div>
      </div>

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

{/* 滚动公告 */}
<div
  className="
    relative overflow-hidden 
    h-12 px-3 flex items-center
    bg-gradient-to-b
    from-[#1E1E22]
    via-[#3C3C42]
    via-[#7A7A82]
    to-[#E8E8EC]
  "
>
  <div className="relative flex-1 h-full">
<div
  className="absolute whitespace-nowrap text-white text-base animate-marquee-RTL"
  style={{
    top: "50%",
    transform: "translateY(-50%)",  // 让文字垂直居中
    pointerEvents: "none",
  }}
>
  {t("Welcome")} Crypto.com
</div>

  </div>
</div>



      {/* 功能区 */}
      <div className="mt-2 bg-white mx-2 rounded-xl p-4 shadow relative z-20">

        <div className="grid grid-cols-4 gap-4 mb-5">
          {features.map((item) => (
            <Link
              key={item.key}
              to={
                item.key === "User Center" ? "/user" :
                item.key === "MSb" ? "/user/msb" :
                item.key === "Introduction" ? "/intro" :
                item.key === "Currency" ? "/coin/BTCUSDT" :
                item.key === "Deposit" ? "/deposit1" :
                item.key === "DeFi" ? "/defi" :
                item.key === "Futures" ? "/trade" :
                "/wallet/USDT/withdraw"
              }
              className="flex flex-col items-center text-gray-700 text-xs"
            >
              <div className="mb-1">{item.icon}</div>
              {t(item.key)}
            </Link>
          ))}
        </div>

        {/* 两个广告图 */}
        <div className="flex gap-2 mb-6 px-1">
          <div className="w-1/3">
            <img src="/images/online.jpg" className="w-full h-[70px] rounded-lg object-fill" />
          </div>

          <div className="w-2/3">
            <img src="/images/fastbuy.jpg" className="w-full h-[70px] rounded-lg object-fill" />
          </div>
        </div>

        {/* 热门 Top3 当前价格 */}
<div className="grid grid-cols-3 gap-4">
  {top3.map((coin) => {
    const up = coin.change >= 0;

    return (
      <Link
        key={coin.symbol}
        to={`/coin/${coin.base}-USDT`}
        className="text-center py-2"
      >
        {/* 名称更小 */}
        <div className="text-gray-500 text-xs">{coin.symbol}</div>

        {/* 价格稍微大一点，主视觉 */}
        <div className="font-bold text-gray-600 text-sm">
          ${Number(coin.price).toFixed(1)}
        </div>

        {/* 涨幅也偏小一点 */}
        <div className="text-gray-500 text-xs">
          {up ? "+" : ""}
          {coin.change}%
        </div>
      </Link>
    );
  })}
</div>

      </div>

      {/* 实时行情 Popular list */}
      <div className="mt-4 bg-white rounded-lg shadow mx-2 p-2">
        <div className="px-2 py-1 font-semibold text-gray-500">
          {t("Popular list")}
        </div>

        <div className="flex items-center px-2 py-2 border-b font-semibold text-gray-500">
          <span className="w-1/3">{t("Symbol")}</span>
          <span className="w-1/3 text-center">{t("Latest Price")}</span>
          <span className="w-1/3 text-right">{t("24h")}</span>
        </div>
{list.map((coin) => {
  if (!coin) return null;
  const up = coin.change >= 0;

  return (
    <Link
      key={coin.symbol}
      to={`/coin/${coin.symbol}-USDT`}
      className="flex items-center px-2 py-3 hover:bg-gray-100 transition"
    >
      <div className="w-1/3 flex items-center">
        <img
          src={coinIcons[coin.symbol] || "/images/default.png"}
          className="w-6 h-6 rounded-full mr-2"
        />
        <span className="text-gray-600 text-sm">{coin.symbol}</span>
      </div>

      <div className="w-1/3 text-center text-gray-600 text-sm">
        ${Number(coin.price).toFixed(1)}
      </div>

      <div className="w-1/3 flex justify-end items-center">
        <span
          className="rounded text-white font-semibold flex items-center justify-center"
          style={{
            width: "60px",
            height: "30px",
            backgroundColor: up ? "#22c55e" : "#ef4444",
            fontSize: "12px",
          }}
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
