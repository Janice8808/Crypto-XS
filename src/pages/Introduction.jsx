import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Introduction() {
  const nav = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-screen bg-white text-black">

      {/* ===== 顶部返回箭头 ===== */}
      <div className="flex items-center px-4 py-3">
        <button onClick={() => nav(-1)} className="mr-3">
          <svg width="26" height="26" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>

        <span className="text-gray-600 text-sm truncate">
          {t("Introduction")}
        </span>
      </div>

      {/* ===== 标题（橙色） ===== */}
      <div className="px-4 mt-2 text-[#FBB040] font-semibold text-lg">
        {t("The world's first social trading platform")}
      </div>

      {/* ===== 主图 banner ===== */}
      <div className="px-4 mt-3">
        <img
          src="/images/intro_banner.jpg"
          className="w-full rounded-md"
        />
      </div>

      {/* ===== 文本内容 ===== */}
      <div className="px-4 mt-6 leading-relaxed text-[15px] text-gray-800">

<p className="mb-6">
  {t("Crypto.com was founded in 2016 and is registered in Singapore, with its operational headquarters located in Dubai. The platform has established operation centers across multiple countries and regions, including the United States and Europe, expanding its business presence worldwide.")}
</p>

<p className="mb-6">
  {t("Today, Crypto.com serves more than 50 million registered users globally, with over 3 million monthly active users and more than 80 million user interactions across its ecosystem.")}
</p>

<p className="mb-6">
  {t("As a comprehensive digital asset trading platform, Crypto.com supports over 800 high-quality cryptocurrencies and more than 1,000 trading pairs. The platform offers a rich selection of trading services, including spot trading, leveraged trading, OTC trading, contract trading, and credit-card-based cryptocurrency purchases.")}
</p>

<p className="mb-6">
  {t("By combining advanced technology with rigorous security standards, Crypto.com is committed to providing users with the safest, most efficient, and most professional digital asset investment experience available.")}
</p>

      </div>

      {/* 页面底部空白 */}
      <div className="h-10"></div>
    </div>
  );
}
