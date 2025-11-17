import React from "react";
import { useNavigate } from "react-router-dom";

/** 币种小图标（SVG），尽量贴近你截图样式 */
const CoinIcon = ({ symbol }) => {
  switch (symbol) {
    case "BTC":
      return (
        <div className="w-6 h-6 rounded-full bg-[#F7931A] flex items-center justify-center text-white text-xs font-bold">
          B
        </div>
      );
    case "ETH":
      return (
        <div className="w-6 h-6 rounded-full bg-[#627EEA] flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L6 11l6 4 6-4-6-9z" fill="#fff" />
            <path d="M6 13l6 9 6-9-6 4-6-4z" fill="#C5CFF5" />
          </svg>
        </div>
      );
    case "USDT":
      return (
        <div className="w-6 h-6 rounded-full bg-[#26A17B] flex items-center justify-center text-white text-xs font-bold">
          T
        </div>
      );
    case "USDC":
      return (
        <div className="w-6 h-6 rounded-full bg-[#2775CA] flex items-center justify-center text-white text-xs font-bold">
          $
        </div>
      );
    case "TRX":
      return (
        <div className="w-6 h-6 rounded-full bg-[#FF060A] flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <polygon points="4 5 19 7 13 20" fill="#fff" />
          </svg>
        </div>
      );
    case "XMR":
      return (
        <div className="w-6 h-6 rounded-full bg-[#FF6F00] flex items-center justify-center text-white text-xs font-bold">
          M
        </div>
      );
    case "DASH":
      return (
        <div className="w-6 h-6 rounded-full bg-[#008CE7] flex items-center justify-center text-white text-xs font-bold">
          D
        </div>
      );
    default:
      return (
        <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs">
          ?
        </div>
      );
  }
};

export default function Pledge() {
  const nav = useNavigate();

  const data = [
    { symbol: "BTC",  rate: "5%",   min: "10000.00 USDT", days: [10, 30, 90] },
    { symbol: "ETH",  rate: "2%",   min: "3000.00 USDT",  days: [10, 30, 90] },
    { symbol: "USDT", rate: "1%",   min: "1000.00 USDT",  days: [10, 30, 90] },
    { symbol: "USDC", rate: "1%",   min: "1000.00 USDT",  days: [10, 30, 90] },
    { symbol: "TRX",  rate: "0.5%", min: "500.00 USDT",   days: [10, 30, 90] },
    { symbol: "XMR",  rate: "0.5%", min: "500.00 USDT",   days: [10, 90, 180] },
    { symbol: "DASH", rate: "0.5%", min: "500.00 USDT",   days: [10, 90, 180] },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F8F8F8] text-black">

      {/* 顶部导航 */}
      <div className="flex items-center px-4 py-3 bg-white shadow-sm">
        <button onClick={() => nav(-1)} className="mr-3">
          <svg
            width="26"
            height="26"
            fill="none"
            stroke="#444"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>

        <span className="text-lg font-medium">Pledge</span>
      </div>

      {/* 顶部文字说明 */}
      <div className="px-4 py-4 text-sm text-[#C9C9F5] leading-6 bg-white">
        · 0 Fee <br />
        · Risk is low <br />
        · Higher income than living financial management
      </div>

      {/* Tab 区域：Lock 只是高亮，Record 负责跳转 */}
      <div className="flex items-center bg-[#0E1330] text-white text-sm mt-2">
        {/* 当前页：Lock income（高亮、不跳转） */}
        <div className="flex-1 text-center py-3 text-[#FFCC33] border-b-2 border-[#FFCC33]">
          Lock income
        </div>

        {/* Record：点击跳转到独立记录页 */}
        <div
          className="flex-1 text-center py-3 cursor-pointer"
          onClick={() => nav("/defi-record")}
        >
          Record
        </div>
      </div>

      {/* Lock income 内容（一直显示） */}
      <div className="px-3 py-4">
        <div className="text-xl font-semibold text-gray-800">Lock income</div>
        <div className="text-gray-500 text-sm mt-1 mb-4">
          After recharge, you can enjoy a stable high return
        </div>

        {data.map((item, index) => (
          <div key={index} className="bg-white rounded-lg p-4 mb-4 shadow">

            {/* 币种标题行 */}
            <div className="flex items-center mb-3">
              <CoinIcon symbol={item.symbol} />
              <span className="ml-2 font-semibold text-gray-800">
                {item.symbol}
              </span>
            </div>

            {/* 日利率 */}
            <div className="flex justify-between text-gray-500 text-sm mb-2">
              <span>Daily interest rate</span>
              <span className="text-[#4B6BFD]">{item.rate}</span>
            </div>

            {/* 起投数量 */}
            <div className="flex justify-between text-gray-500 text-sm mb-3">
              <span>Minimum starting quantity</span>
              <span className="text-gray-700 font-medium">{item.min}</span>
            </div>

            {/* 天数选择 */}
            <div className="text-gray-500 text-sm mb-2">Dialogue (Sky)</div>

            <div className="flex gap-3 mb-4">
              {item.days.map((d, i) => (
                <div
                  key={i}
                  className={`px-3 py-1 rounded border text-sm font-medium ${
                    i === 0
                      ? "border-[#FFB800] text-[#FFB800]"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* 按钮 */}
            <button className="w-full bg-[#FFC940] py-3 rounded-lg text-white text-sm font-medium">
              Lock up immediately
            </button>
          </div>
        ))}
      </div>

      <div className="h-10" />
    </div>
  );
}
