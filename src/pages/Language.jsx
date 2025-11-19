import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Language() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("English");
  const [languages, setLanguages] = useState([
    "English",
    "Français",
    "Deutsch",
    "Italiano",
    "한국어",
    "日本語",
    "中文繁体",
    "ภาษาไทย",
    "Tiếng Việt",
    "español",
    "Türkçe",
  ]);

  // 从后端加载当前语言设置
  useEffect(() => {
    fetch("https://pankouhoutai.shop/api/userinfo", {
  headers: { 
    Authorization: "Bearer " + localStorage.getItem("token")
  }
})
      .catch((err) => console.error("加载语言失败:", err));
  }, []);

  // 提交选中的语言
  const handleSelect = async (lang) => {
    setSelected(lang);
    try {
const res = await fetch("https://pankouhoutai.shop/api/language", {
  method: "POST",
  headers: { 
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token")
  },
  body: JSON.stringify({ language: lang })
});

      const data = await res.json();
      if (res.ok) {
        alert(`Language set to ${lang}`);
        navigate(-1);
      } else {
        alert(data.error || "Failed to set language");
      }
    } catch (err) {
      console.error("语言设置失败:", err);
      alert("Network error, please try again later");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部 */}
      <div className="flex items-center p-4 border-b">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 text-xl mr-3"
        >
          ←
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Language selection</h1>
      </div>

      {/* 语言列表 */}
      <div className="p-5">
        {languages.map((lang) => (
          <div
            key={lang}
            onClick={() => handleSelect(lang)}
            className={`py-3 border-b text-base cursor-pointer transition ${
              selected === lang
                ? "text-yellow-500 font-medium"
                : "text-gray-600 hover:text-yellow-500"
            }`}
          >
            {lang}
          </div>
        ))}
      </div>
    </div>
  );
}
