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
        {t("Intro title")}
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

        <p className="mb-6">{t("Intro p1")}</p>

        <p className="mb-6">{t("Intro p2")}</p>

        <p className="mb-6">{t("Intro p3")}</p>

        <p className="mb-6">{t("Intro p4")}</p>

      </div>

      {/* 页面底部空白 */}
      <div className="h-10"></div>
    </div>
  );
}
