import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ChangePassword() {
  const navigate = useNavigate();

  const [isSet, setIsSet] = useState(null); // null=加载中, true=已设置, false=未设置

  // ⭐ 自动拉取用户信息判断提现密码是否已设置
useEffect(() => {
  async function fetchStatus() {
    try {
      const res = await fetch("https://pankouhoutai.shop/api/userinfo", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const data = await res.json();

      setIsSet(data.withdrawPasswordSet === true);

    } catch (err) {
      console.log("获取提现密码状态失败：", err);
      setIsSet(false);
    }
  }

  fetchStatus();
}, []);

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
        <div className="w-6" />
      </div>

      {/* 内容区域 */}
      <div className="px-3 mt-3">
        <div
          onClick={() => {
  if (isSet) {
    navigate("/user/withdrawal-password/edit");   // ⭐ 已设置 → 修改密码页
  } else {
    navigate("/user/withdrawal-password");        // ⭐ 未设置 → 你的 WithdrawalPassword.jsx
  }
}}

          className="flex items-center justify-between bg-white rounded-xl px-4 h-16 shadow-sm border border-gray-100 active:opacity-60"
        >
          <span className="text-[16px] text-[#333]">Withdrawal Password</span>

          <div className="flex items-center gap-1">

            {/* ⭐ 根据状态动态显示文字 + 颜色 */}
            {isSet === null && (
              <span className="text-[15px] text-gray-400">Loading…</span>
            )}

            {isSet === true && (
              <span className="text-[15px] text-[#31C48D]">Already set</span>
            )}

            {isSet === false && (
              <span className="text-[15px] text-gray-400">Not set</span>
            )}

            <ChevronRight size={18} color="#999" />
          </div>
        </div>
      </div>

    </div>
  );
}
