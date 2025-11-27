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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message || t("Password changed successfully!"));
        navigate(-1);
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

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部 */}
      <div className="flex items-center p-4 border-b">
<button
  onClick={() => window.history.back()}
  className="text-xl text-gray-600 active:scale-90"
  style={{ background: "none", border: "none", padding: 0, marginRight: "8px" }}
>
  ←
</button>
        <h1 className="text-lg font-semibold text-gray-800">
          {t("Change Password")}
        </h1>
      </div>

      {/* 内容区 */}
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
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50"
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
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded-lg py-3"
        >
          {loading ? t("Submitting") : t("Submit")}
        </Button>
      </div>
    </div>
  );
}
