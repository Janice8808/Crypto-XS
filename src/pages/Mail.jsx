import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function Mail() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // 智能返回函数 - 修复版
  const handleBack = () => {
    console.log('=== Mail页面返回调试 ===');
    console.log('1. history.length:', window.history.length);
    console.log('2. 当前路径:', window.location.pathname);
    
    // 检查是否是从 UserCenter 跳转过来的
    const referrer = document.referrer;
    console.log('3. 来源页面:', referrer);
    
    // 更智能的判断逻辑
    if (window.history.length > 2 && referrer.includes('/user')) {
      console.log('4. 从UserCenter跳转过来，执行 navigate(-1)');
      navigate(-1);
    } else {
      console.log('4. 直接打开或来源不明，执行 navigate("/user")');
      navigate("/user", { replace: true });  // 使用 replace 避免历史记录问题
    }
  }

  // 无焦点样式配置
  const noFocusStyle = {
    outline: 'none',
    boxShadow: 'none',
    border: 'none',
    WebkitTapHighlightColor: 'transparent'
  }

  const handleSubmit = async () => {
    if (!email.trim()) {
      alert(t("Please fill in all fields"));
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("https://pankouhoutai.shop/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || t("Submit order"));
        // 提交成功后也使用智能返回
        handleBack();
      } else {
        alert(data.error || t("Network error, please try again later"));
      }
    } catch (err) {
      console.error("提交失败:", err);
      alert(t("Network error, please try again later"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
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
          {t("Mail")}
        </h1>
      </div>

      {/* 内容区 */}
      <div className="p-5">
        <label className="text-gray-700 font-medium mb-2 block">
          {t("Mail")}
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("Mail")}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50"
        />

        <Button
          className={`confirm-btn w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded-lg py-3 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          onClick={handleSubmit}
          disabled={loading}
          style={noFocusStyle}
        >
          {loading ? t("Submitting") : t("Submit")}
        </Button>
      </div>
    </div>
  );
}