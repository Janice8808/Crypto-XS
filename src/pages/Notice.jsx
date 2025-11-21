// src/pages/Notice.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Notice() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-[#101018] text-white flex flex-col">

      {/* 顶部导航 */}
<div className="flex items-center px-4 py-3 bg-[#0F0F12] text-white">
  <button
    onClick={() => navigate(-1)}
    className="p-2 text-white bg-transparent"
  >
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  </button>

  <span className="flex-1 text-center text-base">Notice</span>

  <span className="w-[22px]"></span> {/* 占位保持标题居中 */}
</div>

      {/* 内容区域 */}
      <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
        No notification record
      </div>
    </div>
  );
}
