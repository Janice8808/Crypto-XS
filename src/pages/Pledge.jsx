import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/** 币种小图标（SVG） */
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
  const { t } = useTranslation();

  const data = [
    { symbol: "BTC", rate: "5%", min: "10000.00 USDT", days: [10, 30, 90] },
    { symbol: "ETH", rate: "2%", min: "3000.00 USDT", days: [10, 30, 90] },
    { symbol: "USDT", rate: "1%", min: "1000.00 USDT", days: [10, 30, 90] },
    { symbol: "USDC", rate: "1%", min: "1000.00 USDT", days: [10, 30, 90] },
    { symbol: "TRX", rate: "0.5%", min: "500.00 USDT", days: [10, 30, 90] },
    { symbol: "XMR", rate: "0.5%", min: "500.00 USDT", days: [10, 90, 180] },
    { symbol: "DASH", rate: "0.5%", min: "500.00 USDT", days: [10, 90, 180] },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F8F8F8] text-black">

      {/* 顶部导航 */}
      <div className="flex items-center px-4 py-3 bg-white shadow-sm">
<button
  onClick={() => nav(-1)}
  className="p-0 m-0 mr-3 bg-transparent border-none"
  style={{
    background: "none",
    border: "none",
    padding: 0,
  }}
>
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

        <span className="text-lg font-medium">{t("Pledge")}</span>
      </div>

      {/* 顶部提示 */}
      <div className="px-4 py-4 text-sm text-[#C9C9F5] leading-6 bg-white">
        · {t("Zero Fee")} <br />
        · {t("Low risk")} <br />
        · {t("Higher return")}
      </div>

      {/* Tab */}
      <div className="flex items-center bg-[#0E1330] text-white text-sm mt-2">
        <div className="flex-1 text-center py-3 text-[#FFCC33] border-b-2 border-[#FFCC33]">
          {t("Lock income")}
        </div>

        <div className="flex-1 text-center py-3 cursor-pointer" onClick={() => nav("/defi-record")}>
          {t("Record")}
        </div>
      </div>

      {/* 列表 */}
      <div className="px-3 py-4">

        {data.map((item, index) => (
          <div key={index} className="bg-white rounded-lg p-4 mb-4 shadow">

            {/* 币种 */}
            <div className="flex items-center mb-3">
              <CoinIcon symbol={item.symbol} />
              <span className="ml-2 font-semibold text-gray-800">{item.symbol}</span>
            </div>

            {/* 利率 */}
            <div className="flex justify-between text-gray-500 text-sm mb-2">
              <span>{t("Daily interest rate")}</span>
              <span className="text-[#4B6BFD]">{item.rate}</span>
            </div>

            {/* 最低 */}
            <div className="flex justify-between text-gray-500 text-sm mb-3">
              <span>{t("Minimum starting quantity")}</span>
              <span className="text-gray-700 font-medium">{item.min}</span>
            </div>

            {/* Lock now 按钮 → 跳转 */}
            <button
              className="w-full bg-[#FFC940] py-3 rounded-lg text-white text-sm font-medium"
              onClick={() => nav(`/pledge-detail/${item.symbol}`)}
            >
              {t("Lock now")}
            </button>
          </div>
        ))}

      </div>

      <div className="h-10" />
    </div>
  );
}
