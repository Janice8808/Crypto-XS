import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Introduction() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // 智能返回函数
  const handleBack = () => {
    console.log('=== Introduction页面返回调试 ===');
    console.log('1. history.length:', window.history.length);
    console.log('2. 当前路径:', window.location.pathname);
    
    // 检查是否是从有效页面跳转过来的
    const referrer = document.referrer;
    console.log('3. 来源页面:', referrer);
    
    // 智能判断逻辑
    if (window.history.length > 2 && referrer && referrer.includes(window.location.origin)) {
      console.log('4. 从应用内页面跳转过来，执行 navigate(-1)');
      navigate(-1);
    } else {
      console.log('4. 直接打开或来源不明，执行 navigate("/")');
      navigate("/", { replace: true });  // 跳转到首页
    }
  }

  // 无焦点样式
  const noFocusStyle = {
    background: "none",
    border: "none",
    fontSize: 20,
    color: "#666",
    width: "45px",
    textAlign: "left",
    paddingLeft: "12px",
    outline: 'none',
    boxShadow: 'none',
    WebkitTapHighlightColor: 'transparent',
    cursor: 'pointer'
  }

  return (
    <div className="w-full min-h-screen bg-white text-black">

      {/* ===== 顶部返回箭头 ===== */}
      <div className="flex items-center px-4 py-3">

        <button
          onClick={handleBack}  // 使用智能返回
          style={noFocusStyle}
        >
          ←
        </button>

        <span className="text-gray-600 text-sm truncate">
          {t("Introduction")}
        </span>
      </div>

      {/* ===== 标题（橙色） ===== */}
      <div className="px-4 mt-2 text-[#FBB040] font-semibold text-lg">
        {t("The world's first social trading platform")}
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
  {t("Crypto.com was founded in 2016 and is registered in Singapore, with its operational headquarters located in Dubai. The platform has established operation centers across multiple countries and regions, including the United States and Europe, expanding its business presence worldwide.")}
</p>

<p className="mb-6">
  {t("Today, Crypto.com serves more than 50 million registered users globally, with over 3 million monthly active users and more than 80 million user interactions across its ecosystem.")}
</p>

<p className="mb-6">
  {t("As a comprehensive digital asset trading platform, Crypto.com supports over 800 high-quality cryptocurrencies and more than 1,000 trading pairs. The platform offers a rich selection of trading services, including spot trading, leveraged trading, OTC trading, contract trading, and credit-card-based cryptocurrency purchases.")}
</p>

<p className="mb-6">
  {t("By combining advanced technology with rigorous security standards, Crypto.com is committed to providing users with the safest, most efficient, and most professional digital asset investment experience available.")}
</p>

      </div>

      {/* 页面底部空白 */}
      <div className="h-10"></div>
    </div>
  );
}