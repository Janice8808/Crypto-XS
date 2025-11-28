// src/pages/Announcement.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* 邮件图标 */
const MailIcon = () => (
  <svg width="22" height="22" fill="none" stroke="#666" strokeWidth="1.6" viewBox="0 0 24 24">
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="M3 5l9 7 9-7" />
  </svg>
);

export default function Announcement() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // 固定返回到线上 /user
  const handleBack = () => {
    window.location.href = "https://ceshipankou.shop/user";
  };

  const noFocusStyle = {
    outline: "none",
    boxShadow: "none",
    border: "none",
    WebkitTapHighlightColor: "transparent",
  };

  return (
    <div className="w-full min-h-screen bg-white">

      {/* 顶部返回 + 标题 */}
      <div className="flex items-center p-4 border-b">
        <button
          className="back-btn text-gray-600 text-xl mr-3"
          onClick={handleBack}
          style={noFocusStyle}
        >
          ←
        </button>

        <h1 className="text-lg font-semibold text-gray-800">
          {t("Announcement management")}
        </h1>
      </div>

      {/* ⭐ 公告内容 —— 点击跳 InviteIntro */}
      <div 
        className="p-4 flex items-center mt-2 active:opacity-70 cursor-pointer"
        onClick={() => navigate("/invite-intro")}
      >
        <MailIcon />
        <div className="ml-2 text-[15px] text-[#00A884]">
          {t("Invite friends to register and share the")}
        </div>
      </div>

    </div>
  );
}
