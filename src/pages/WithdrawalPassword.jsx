import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function WithdrawalPassword() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 调试：检查组件是否正常加载
  useEffect(() => {
    console.log("WithdrawalPassword component mounted");
  }, []);

  const handleSubmit = async () => {
    console.log("Submit clicked"); // 调试日志
    
    if (!password || !confirm) {
      alert(t("Please fill in all fields"));
      return;
    }
    if (password !== confirm) {
      alert(t("Passwords do not match"));
      return;
    }

    try {
      setLoading(true);
      console.log("Sending request..."); // 调试日志

      const token = localStorage.getItem("token");
      console.log("Token:", token ? "exists" : "missing"); // 调试日志

      const res = await fetch("https://pankouhoutai.shop/api/withdrawal-password", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ password }),
      });

      console.log("Response status:", res.status); // 调试日志
      const data = await res.json();
      console.log("Response data:", data); // 调试日志

      if (res.ok && data.success) {
        console.log("Success! Showing dialog..."); // 调试日志
        setShowSuccess(true);
      } else {
        const errorMsg = data.message || data.error || t("Failed to change password");
        console.error("API Error:", errorMsg); // 调试日志
        alert(errorMsg);
      }
    } catch (err) {
      console.error("Network error:", err);
      alert(t("Network error, please try again later"));
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    console.log("Success dialog closed"); // 调试日志
    setShowSuccess(false);

    // 改进的事件触发方式
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("refreshData", {
        detail: { source: "withdrawalPassword" }
      }));
    }, 100);

    // 改进的导航方式
    setTimeout(() => {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/profile"); // 如果无法返回，跳转到指定页面
      }
    }, 150);
  };

  // 添加键盘事件支持
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-white relative" onKeyPress={handleKeyPress}>

      {/* 顶部 */}
      <div className="flex items-center p-4 border-b">
        <button
          onClick={() => navigate(-1)}
          className="text-xl text-gray-600 active:scale-90 focus:outline-none"
          style={{ background: "none", border: "none", padding: 0, marginRight: "8px" }}
        >
          ←
        </button>
        <h1 className="text-lg font-semibold text-gray-800">
          {t("Change Password")}
        </h1>
      </div>

      {/* 内容 */}
      <div className="p-5">
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            {t("New password")}
          </label>
          <input
            type="password"
            placeholder={t("Please enter a new password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            autoComplete="new-password"
          />
        </div>

        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-2">
            {t("Confirm password")}
          </label>
          <input
            type="password"
            placeholder={t("Please enter the confirmation password")}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            autoComplete="new-password"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading || !password || !confirm}
          className={`w-full rounded-lg py-3 ${
            loading || !password || !confirm
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-500"
          } text-white transition-colors`}
        >
          {loading ? t("Submitting") : t("Submit")}
        </Button>
      </div>

      {/* 成功弹窗 - 改进版本 */}
      {showSuccess && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={(e) => {
            // 点击背景也关闭
            if (e.target === e.currentTarget) {
              handleSuccessClose();
            }
          }}
        >
          <div className="bg-white w-64 rounded-xl shadow-lg p-5 text-center animate-scale-in">
            <div className="text-green-500 text-4xl mb-3">✓</div>
            <div className="text-lg font-semibold mb-2">{t("Saved Successfully")}</div>
            <p className="text-gray-600 mb-4">{t("Your password has been updated.")}</p>

            <button
              onClick={handleSuccessClose}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 rounded-lg transition-colors active:scale-95"
              autoFocus // 自动聚焦，方便键盘操作
            >
              {t("OK")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}