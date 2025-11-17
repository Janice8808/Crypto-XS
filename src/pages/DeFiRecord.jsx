import React from "react";
import { useNavigate } from "react-router-dom";

export default function DeFiRecord() {
  const nav = useNavigate();

  return (
    <div className="w-full min-h-screen bg-white text-black">

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

        <span className="text-lg font-medium">Record</span>
      </div>

      {/* 表头 */}
      <div className="flex justify-between px-4 py-3 text-gray-600 text-sm border-b">
        <span>name</span>
        <span>Time</span>
      </div>

      {/* 空记录提示 */}
      <div className="text-center text-gray-400 mt-10">
        There is no currency withdrawal record at the moment
      </div>

    </div>
  );
}
