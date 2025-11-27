import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function Mail() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // 无焦点样式配置 - 只用于按钮
  const noFocusStyle = {
    outline: 'none',
    boxShadow: 'none',
    border: 'none',
    WebkitTapHighlightColor: 'transparent'
  }

  // 可以移除 preventDefault 函数，因为全局事件委托会处理
  // const preventDefault = (e) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  // }

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
        navigate(-1);
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
      {/* 顶部返回 + 标题 - 已修改 */}
      <div className="flex items-center p-4 border-b">
        <button
          className="back-btn text-gray-600 text-xl mr-3" // 合并 className
          onClick={() => navigate(-1)}
          style={noFocusStyle}
          // 移除 onMouseDown 和 onTouchStart
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
          }`} // 合并 className
          onClick={handleSubmit}
          disabled={loading}
          style={noFocusStyle}
          // 移除 onMouseDown 和 onTouchStart
        >
          {loading ? t("Submitting") : t("Submit")}
        </Button>
      </div>
    </div>
  );
}