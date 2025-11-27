import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ChangePassword() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">

      {/* 顶部导航 */}
      <div className="flex items-center h-14 px-3 border-b border-gray-200">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft size={22} />
        </button>
        <div className="flex-1 text-center text-lg font-medium">
          Change Password
        </div>
        <div className="w-6" /> {/* 用于保持左右平衡 */}
      </div>

      {/* 内容区域 */}
      <div className="px-3 mt-3">
        <div
          onClick={() => navigate("/withdrawal-password")}
          className="flex items-center justify-between bg-white rounded-xl px-4 h-16 shadow-sm border border-gray-100 active:opacity-60"
        >
          <span className="text-[16px] text-[#333]">Withdrawal Password</span>

          <div className="flex items-center gap-1">
            <span className="text-[15px] text-[#31C48D]">Already set</span>
            <ChevronRight size={18} color="#999" />
          </div>
        </div>
      </div>
    </div>
  );
}
