// src/pages/Notice.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Notice() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-[#101018] text-white flex flex-col">

      {/* 顶部导航 */}
      <div className="flex items-center px-4 h-12 border-b border-gray-700">
        <button
          onClick={() => navigate(-1)}
          className="text-xl mr-3"
        >
          ←
        </button>
        <span className="text-lg font-semibold">Notice</span>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
        No notification record
      </div>
    </div>
  );
}
