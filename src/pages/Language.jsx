import React from "react";
import { useNavigate } from "react-router-dom";
import i18n from "../i18n";

export default function Language() {
  const navigate = useNavigate();

  const languages = [
    "English",
    "Français",
    "Deutsch",
    "Italiano",
    "한국어",
    "日本語",
    "中文繁体",
    "中文简体",
    "ภาษาไทย",
    "Tiếng Việt",
    "español",
    "Türkçe",
  ];

  const current = i18n.language;

  const handleSelect = async (lang) => {
    // 1. 修改本地语言
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);

    // 2. 调用后台接口保存用户语言
    const token = localStorage.getItem("token");
    if (token) {
      await fetch("/api/language", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ language: lang }),
      });
    }

    // 3. 返回上一页
    navigate(-1);
  };

  return (
    <div className="w-full h-screen bg-[#101018] text-white">
      <div className="px-4 py-3 bg-[#0F0F12] flex items-center">
        <button onClick={() => navigate(-1)} className="p-2">
          <svg width="22" height="22" viewBox="0 0 24 24" stroke="white">
            <polyline points="15 18 9 12 15 6" fill="none" strokeWidth="2" />
          </svg>
        </button>
        <span className="flex-1 text-center text-base">Language</span>
        <span className="w-[22px]"></span>
      </div>

      <div className="mt-3">
        {languages.map((lang) => (
          <div
            key={lang}
            className={`px-4 py-3 border-b border-gray-700 ${
              lang === current ? "text-yellow-400" : "text-white"
            }`}
            onClick={() => handleSelect(lang)}
          >
            {lang}
          </div>
        ))}
      </div>
    </div>
  );
}
