import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function WithdrawalPassword() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
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

      const res = await fetch("https://pankouhoutai.shop/api/withdrawal-password", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setShowSuccess(true);
      } else {
        alert(data.error || t("Failed to change password"));
      }
    } catch (err) {
      console.error("Network error:", err);
      alert(t("Network error, please try again later"));
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);

    // ⭐ 触发全局刷新 ChangePassword 的 isSet 状态
    window.dispatchEvent(new CustomEvent("refreshData"));

    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white relative">

      {/* 顶部 */}
      <div className="flex items-center p-4 border-b">
        <button
          onClick={() => window.history.back()}
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
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-gray-50"
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
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-gray-50"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg py-3"
        >
          {loading ? t("Submitting") : t("Submit")}
        </Button>
      </div>

      {/* 成功弹窗 */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-64 rounded-xl shadow-lg p-5 text-center">
            <div className="text-green-500 text-4xl mb-3">✓</div>
            <div className="text-lg font-semibold mb-2">{t("Saved Successfully")}</div>
            <p className="text-gray-600 mb-4">{t("Your password has been updated.")}</p>

            <button
              onClick={handleSuccessClose}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 rounded-lg"
            >
              {t("OK")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
