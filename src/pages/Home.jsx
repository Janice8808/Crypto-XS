import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { coinIcons } from "../assets/coinIcons";
import { useOkxTickers } from "../hooks/useOkxTickers";
import userIcon from '../assets/icons/user.png';
import msbIcon from '../assets/icons/msb.png';
import introIcon from '../assets/icons/intro.png';
import currencyIcon from '../assets/icons/currency.png';
import depositIcon from '../assets/icons/deposit.png';
import defiIcon from '../assets/icons/defi.png';
import futuresIcon from '../assets/icons/futures.png';
import withdrawIcon from '../assets/icons/withdraw.png';
import emailIcon from '../assets/icons/email.png'; // 导入邮件图标
import globeIcon from '../assets/icons/globe.png'; // 导入地球图标
import yonghuIcon from '../assets/icons/yonghu.png';
// ============ 地址遮挡函数 ============
const maskAddress = (addr) => {
  if (!addr) return "--";
  if (addr.length < 16) return addr;
  return `0x${addr.slice(0, 6)}…${addr.slice(-4)}`; // 在地址前加上 "0x"
};
// ============ 价格格式化函数 ============
const formatPrice = (price) => {
  if (price === "--" || price === undefined || price === null) return "--";
  
  const num = Number(price);
  if (isNaN(num)) return "--";
  
  if (num >= 1000) {
    return num.toFixed(2); // 千元以上显示2位小数
  } else if (num >= 100) {
    return num.toFixed(3); // 100-1000显示3位小数
  } else if (num >= 1) {
    return num.toFixed(4); // 1-100显示4位小数
  } else if (num >= 0.01) {
    return num.toFixed(5); // 0.01-1显示5位小数
  } else {
    return num.toFixed(6); // 小于0.01显示6位小数
  }
};

/* ---------------- SVG ICONS ---------------- */

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // 无焦点样式配置 - 只用于按钮
  const noFocusStyle = {
    outline: 'none',
    boxShadow: 'none',
    border: 'none',
    WebkitTapHighlightColor: 'transparent'
  }

  // 只对按钮使用 preventDefault
  const preventDefault = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  // 禁止左右滚动但允许上下滚动的样式
  const scrollStyle = {
    overflowX: 'hidden', // 禁止水平滚动
    overflowY: 'auto',   // 允许垂直滚动
    height: '100vh',
    width: '100%',
    position: 'relative'
  }
  

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

  // ============ 关键修改：按照 Wallet 组件方式获取用户信息 ============
  const [userInfo, setUserInfo] = useState(null);

  // 获取用户信息（与 Wallet 组件相同的方式）
  useEffect(() => {
    async function loadUserInfo() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("https://pankouhoutai.shop/api/userinfo", {
          headers: { 
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
          }
        });
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        setUserInfo(data);

        // 保存到 localStorage
        if (data?.wallet) {
          localStorage.setItem("address", data.wallet);
        }
        if (data?.userId) {
          localStorage.setItem("userId", data.userId);
        }

        console.log("用户信息加载成功:", data);
      } catch (err) {
        console.error("加载用户信息失败:", err);
      }
    }

    loadUserInfo();
  }, []);

  // 地址和用户ID处理（与 Wallet 组件相同）
  const address = userInfo?.wallet || localStorage.getItem("address") || "";
  const userId = userInfo?.userId || localStorage.getItem("userId") || "";

  const shortAddress = address && address.length > 10
    ? `0x${address.slice(0, 6)}…${address.slice(-4)}`
    : address || "--";

  // 格式化用户ID显示
  const formattedUid = userId && userId.length > 10
    ? `0x${userId.slice(0, 6)}…${userId.slice(-4)}`
    : userId || "--";


// 多语言 features - 更大尺寸和灰色字体
const features = [
  { key: "User Center", icon: <img src={userIcon} className="w-8 h-8" />, path: "/user" },
  { key: "MSb", icon: <img src={msbIcon} className="w-8 h-8" />, path: "/user/msb" },
  { key: "Introduction", icon: <img src={introIcon} className="w-8 h-8" />, path: "/intro" },
  { key: "Currency", icon: <img src={currencyIcon} className="w-8 h-8" />, path: "/coin/BTCUSDT" },
  { key: "Deposit", icon: <img src={depositIcon} className="w-8 h-8" />, path: "/deposit1" },
  { key: "DeFi", icon: <img src={defiIcon} className="w-8 h-8" />, path: "/defi" },
  { key: "Futures", icon: <img src={futuresIcon} className="w-8 h-8" />, path: "/trade" },
  { key: "Withdraw", icon: <img src={withdrawIcon} className="w-8 h-8" />, path: "/wallet/USDT/withdraw" },
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
    <div 
      className="w-full max-w-5xl mx-auto bg-gray-100 min-h-screen text-black relative"
      style={scrollStyle}
    >

      {/* Header */}
      <div className="w-full bg-[#FFB800] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2 flex-1">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <img src={yonghuIcon} className="w-6 h-6" alt="user" />
          </div>

          <div className="flex-1">
            <div className="bg-white px-3 py-1 rounded text-gray-700 text-sm font-medium truncate w-full">
              {shortAddress}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-3 text-white">
          <button 
            className="relative p-0 bg-transparent" 
            onClick={() => navigate("/notice")}
            style={noFocusStyle}
            onMouseDown={preventDefault}
            onTouchStart={preventDefault}
          >
            <img src={emailIcon} className="w-7 h-7" alt="mail" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-[10px] px-1 rounded-full">
                {unread}
              </span>
            )}
          </button>

          <button 
            className="p-0 bg-transparent" 
            onClick={() => navigate("/user/language")}
            style={noFocusStyle}
            onMouseDown={preventDefault}
            onTouchStart={preventDefault}
          >
            <img src={globeIcon} className="w-7 h-7" alt="globe" />
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
    h-20 px-3 flex items-center
    bg-gradient-to-b
    from-[#3A3A3D]
    via-[#4A4A4F]
    via-[#6A6A70]
    via-[#9A9AA2]
    to-[#FAFAFC]
    py-3
  "
>
 <div className="w-full overflow-hidden relative">
    {/* 第一个滚动条 */}
    <div className="whitespace-nowrap text-white text-base font-medium">
      <span className="animate-marquee-LTR inline-block">
        {t("Welcome to visit Crypto.com")}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {t("Welcome to visit Crypto.com")}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {t("Welcome to visit Crypto.com")}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {t("Welcome to visit Crypto.com")}
      </span>
    </div>
    {/* 第二个滚动条，延迟半个周期开始 */}
    <div className="whitespace-nowrap text-white text-base font-medium absolute top-0 left-0">
      <span className="animate-marquee-delay inline-block">
        {t("Welcome to visit Crypto.com")}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {t("Welcome to visit Crypto.com")}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {t("Welcome to visit Crypto.com")}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {t("Welcome to visit Crypto.com")}
      </span>
    </div>
  </div>
</div>

{/* 功能区 - 平衡间距 */}
<div className="bg-white mx-2 rounded-xl p-4 shadow relative z-20 -mt-5">
<div className="grid grid-cols-4 gap-4 px-4 pt-1 pb-3">
  {features.map((feature, index) => (
    <Link
      key={index}
      to={feature.path}
      className="flex flex-col items-center active:scale-95 transition space-y-1"
    >
      <div className="flex items-center justify-center">
        {feature.icon}
      </div>
      <span className="text-gray-500 text-xs text-center leading-tight">
        {t(feature.key)}
      </span>
    </Link>
  ))}
</div>


{/* 两个广告图 */}
<div className="flex gap-2 mb-6 w-screen -ml-4 pr-4">
  <div className="w-1/3 relative">
    <div 
      className="w-full h-[70px] rounded-lg bg-contain bg-right bg-no-repeat bg-gray-100"
      style={{backgroundImage: "url(/images/online.jpg)"}}
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-gray-600 text-sm font-bold text-center leading-tight mr-3">
        {t('Online')}<br />{t('Service')}
      </span>
    </div>
  </div>

  <div 
    className="w-2/3 relative cursor-pointer"
    onClick={() => navigate('/deposit1')}
    style={noFocusStyle}
    onMouseDown={preventDefault}
    onTouchStart={preventDefault}
  >
    <div 
      className="w-full h-[70px] rounded-lg bg-contain bg-center bg-no-repeat bg-gray-100"
      style={{backgroundImage: "url(/images/fastbuy.jpg)"}}
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center ml-4">
        <span className="text-gray-600 text-sm font-bold">
          {t("Fast buying coin")}
        </span>
        <div className="text-gray-400 text-[10px] mt-1">
          {t("Zero fees. Get started now")}
        </div>
      </div>
    </div>
  </div>
</div>

{/* 热门 Top3 当前价格 */}
<div className="grid grid-cols-3 gap-4 mb-2"> {/* 改为下边距 */}
  {top3.map((coin) => {
    const up = coin.change >= 0;

    return (
      <Link
        key={coin.symbol}
        to={`/trade?symbol=${coin.base}USDT`}
        className="text-center py-2"
      >
        {/* 上面小字体灰色 */}
        <div className="text-gray-400 text-[10px] mb-1">{coin.symbol}</div>
        
        {/* 下面大字体深灰色 */}
        <div className="font-bold text-gray-500 text-base mb-1">
          ${formatPrice(coin.price)}
        </div>
        
        {/* 涨跌幅保持小字体灰色 */}
        <div className="text-gray-500 text-xs">
          {up ? "+" : ""}
          {coin.change}%
        </div>
      </Link>
    );
  })}
</div>

{/* Popular List Header */}
<div className="bg-white px-3 py-4"> {/* 移除 mt-4 */}
  <div className="text-gray-700 text-base font-semibold mb-3">
    {t("Popular list")}
    <div className="w-14 h-[2px] bg-yellow-500 mt-1"></div>
  </div>

  <div className="flex text-gray-400 text-xs font-medium mt-2">
    <div className="w-1/3">{t("Symbol")}</div>
    <div className="w-1/3 text-center">{t("Latest price")}</div>
    <div className="w-1/3 text-right">24h</div>
  </div>
</div>

{/* 实时行情列表 */}
{list.map((coin) => {
  if (!coin) return null;
  const up = coin.change >= 0;

  return (
    <Link
      key={coin.symbol}
      to={`/trade?symbol=${coin.symbol}USDT`}
      className="flex items-center px-2 py-3 hover:bg-gray-100 transition"
    >
      <div className="w-1/3 flex items-center">
        <img
          src={coinIcons[coin.symbol] || "/images/default.png"}
          className="w-6 h-6 rounded-full mr-2"
        />
        <span className="text-gray-600 text-sm">{coin.symbol}</span>
      </div>

      {/* 这里使用 formatPrice */}
      <div className="w-1/3 text-center text-gray-600 text-sm">
        ${formatPrice(coin.price)}
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