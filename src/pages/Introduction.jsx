import React from "react";
import { useNavigate } from "react-router-dom";

export default function Introduction() {
  const nav = useNavigate();

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
          
        </span>
      </div>

      {/* ===== 标题（橙色） ===== */}
      <div className="px-4 mt-2 text-[#FBB040] font-semibold text-lg">
        The world's first social trading platform
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
          The world's first social trading platform
        </p>

        <p className="mb-6">
          Crypto.com was founded in 2016 and is registered in Singapore.
          Its operational headquarters is located in Dubai. It has operation
          centers in many countries and regions such as the United States and Europe,
          and its business scope covers the world.
        </p>

        <p className="mb-6">
          The platform has more than 50 million registered users worldwide,
          more than 3 million monthly active users, and more than 80 million
          user traffic in the ecosystem.
        </p>

        <p className="mb-6">
          Crypto.com is a comprehensive trading platform that supports 800+
          high-quality currencies and 1000+ trading pairs. It has a rich variety
          of transactions such as currency trading, leveraged trading, OTC trading,
          contract trading, and credit card currency purchases. Provide users with
          the safest, most efficient, and most professional digital asset investment
          services.
        </p>

      </div>

      {/* 页面底部空白 */}
      <div className="h-10"></div>
    </div>
  );
}
