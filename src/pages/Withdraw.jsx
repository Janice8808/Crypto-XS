import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Withdraw() {
  const { t } = useTranslation();
  const { symbol } = useParams();
  const navigate = useNavigate();

  const [network, setNetwork] = useState("ERC20");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [available, setAvailable] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadBalance() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://pankouhoutai.shop/api/user/balance", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        const upper = (symbol || "").toUpperCase();
        const allKeys = Object.keys(data.balances || {});
        const matchedKey =
          allKeys.find((k) => k.toUpperCase() === upper) ||
          allKeys.find((k) => k.toUpperCase() === `${upper}USDT`) ||
          allKeys.find((k) => upper.startsWith(k.toUpperCase())) ||
          allKeys.find((k) => k.toUpperCase().includes(upper)) ||
          upper;

        const raw = data.balances?.[matchedKey] ?? 0;
        setAvailable(parseFloat(raw) || 0);
      } catch (err) {
        console.error("❌ Failed to load balance:", err);
        setAvailable(0);
      }
    }
    loadBalance();
  }, [symbol]);

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!address.trim()) {
      setError(t("Please enter withdrawal address"));
      return;
    }
    if (!amount || Number(amount) <= 0) {
      setError(t("Please enter a valid withdrawal amount"));
      return;
    }
    if (Number(amount) > available) {
      setError(t("Insufficient balance"));
      return;
    }
    if (!password.trim()) {
      setError(t("Please enter withdrawal password"));
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");

      const res = await fetch("https://pankouhoutai.shop/api/withdraw/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          symbol,
          network,
          address,
          amount: Number(amount),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || data.message || t("Withdrawal failed"));
        return;
      }

      // 本地同步扣除
      const used = Number(amount);
      setAvailable((prev) => Math.max(prev - used, 0));

      setAmount("");
      setPassword("");

      setSuccess(t("Withdrawal submitted successfully"));
    } catch (err) {
      console.error("Submit withdraw failed:", err);
      setError(t("Network error, please try again later"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">

      {/* 顶部导航 */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 text-lg mb-1 block text-left"
        >
          ←
        </button>

        <span className="font-semibold text-yellow-500 text-lg block">
          {t("Withdraw")} {symbol}
        </span>
      </div>

      {/* 卡片 */}
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-5 space-y-5">

          {/* 币种 */}
          <div className="flex justify-between items-center bg-gray-100 rounded-lg px-3 py-2">
            <span className="text-gray-800 font-medium text-base">
              {t("Currency")}
            </span>
            <span className="text-gray-800 font-medium text-base">
              {symbol}
            </span>
          </div>

          {/* 网络 */}
          <div>
            <div className="text-sm text-gray-500 mb-1">{t("Network")}</div>
            <div className="flex space-x-2">
              {["ERC20", "TRC20"].map((net) => (
                <button
                  key={net}
                  onClick={() => setNetwork(net)}
                  className={`flex-1 py-2 rounded-lg font-medium border ${
                    network === net
                      ? "bg-yellow-400 text-white border-yellow-400"
                      : "bg-white text-gray-700 border-gray-200"
                  }`}
                >
                  {net}
                </button>
              ))}
            </div>
          </div>

          {/* 地址 */}
          <div>
            <div className="text-sm text-gray-500 mb-1">
              {t("Withdrawal address")}
            </div>

            <div className="flex items-center border rounded-lg focus-within:ring-1 focus-within:ring-yellow-400">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={t("Enter withdrawal address")}
                className="flex-1 px-3 py-2 text-sm rounded-lg outline-none text-black"
              />
              <button className="px-3 text-gray-400 hover:text-gray-600">📋</button>
            </div>
          </div>

          {/* 数量 */}
          <div>
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>{t("Withdrawal Amount")}</span>
              <span>
                {t("Available")}:{" "}
                <span className="text-gray-700 font-medium">
                  {available.toFixed(4)} {symbol}
                </span>
              </span>
            </div>

            <div className="flex border rounded-lg focus-within:ring-1 focus-within:ring-yellow-400">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={t("Enter withdrawal quantity")}
                className="flex-1 px-3 py-2 text-sm rounded-lg outline-none text-black"
              />
              <span className="px-3 py-2 text-gray-500 text-sm border-l">
                {symbol}
              </span>
            </div>

            <div className="text-right mt-1">
              <button
                className="text-xs text-yellow-500 font-medium hover:underline"
                onClick={() => setAmount(available.toString())}
              >
                {t("MAX")}
              </button>
            </div>
          </div>

          {/* 密码 */}
          <div>
            <div className="text-sm text-gray-500 mb-1">
              {t("Withdrawal Password")}
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("Withdrawal Password")}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-yellow-400 outline-none text-black"
            />
          </div>

          {/* 按钮 */}
          <Button
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? t("Processing...") : t("Submit")}
          </Button>
        </CardContent>
      </Card>

      {/* 错误提示 */}
      {error && (
        <div className="mt-3 text-sm text-red-500 text-center">
          {error}
        </div>
      )}

      {/* 成功提示 */}
      {success && (
        <div className="mt-3 text-sm text-green-600 text-center">
          {success}
        </div>
      )}

      {/* 底部提示 */}
      <div className="text-sm text-gray-500 mt-3 text-center">
        {t("Ordinary withdrawal")}:
        &nbsp;
        <span className="font-medium text-gray-700">
          {Number(amount || 0).toFixed(6)} {symbol}
        </span>

        <div className="mt-1 text-xs text-gray-400">
          {t("Available")}: {available.toFixed(6)} {symbol}
        </div>
      </div>
    </div>
  );
}
