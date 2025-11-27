import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function Withdraw() {
  const { t } = useTranslation();
  const { symbol } = useParams();
  const navigate = useNavigate();

  const [network, setNetwork] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [available, setAvailable] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  // 每个币种的充值信息配置
  const depositInfo = {
    USDT: {
      networks: ["ERC20", "TRC20"],
      addresses: {
        ERC20: "0x247d9633b242D791Ae353BE6879E30e6f449Bc6D",
        TRC20: "TXQp7LfXjD2hU4mZ8q3R9rPTVdss9sPG9P",
      },
      qr: "/images/2.jpg",
    },
    BTC: {
      networks: ["Bitcoin"],
      addresses: {
        Bitcoin: "bc1q9u5t0dd4n3r0zk9e9p3ye9cghd3eh9ukw6kqwd",
      },
      qr: "/images/btc.png",
    },
    ETH: {
      networks: ["ERC20"],
      addresses: {
        ERC20: "0xF8b4aC92E9dEa9dCdFec89C87b6bD8E6bF410b2A",
      },
      qr: "/images/eth.png",
    },
    TRX: {
      networks: ["TRC20"],
      addresses: {
        TRC20: "TSkD9Y8rFZ7r4N6PbT3Qy8T6Yx9Lb1qv7K",
      },
      qr: "/images/trx.png",
    },
    DOGE: {
      networks: ["DOGE"],
      addresses: {
        DOGE: "D9d8sMz9PMbShWfZKuBzY9vBsmXvUfRz5M",
      },
      qr: "/images/doge.png",
    },
    XRP: {
      networks: ["XRP"],
      addresses: {
        XRP: "rLHZx4gYhZk7oK1dQdQy2W1HBeqhmM8UZG",
      },
      qr: "/images/xrp.png",
    },
  };

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

  // 获取用户余额
  const fetchBalance = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const res = await fetch("https://pankouhoutai.shop/api/user/balance", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();
      
      if (res.ok && data.balances) {
        const balance = data.balances[symbol];
        setAvailable(balance || 0);
      } else {
        setError(data.error || t("Failed to fetch balance"));
      }
    } catch (err) {
      console.error("Fetch balance failed:", err);
      setError(t("Network error, please try again later"));
    } finally {
      setLoading(false);
    }
  };

  const current = depositInfo[symbol] || depositInfo.USDT;
  const activeNetwork = network || current.networks[0];
  const depositAddress = current.addresses[activeNetwork];

  useEffect(() => {
    setNetwork(current.networks[0]);
    fetchBalance();
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
      {/* 顶部导航 - 已修改 */}
      <div className="mb-4">
        <button
          className="back-btn" // 添加 back-btn class
          onClick={() => window.history.back()}
          style={{
            ...noFocusStyle,
            background: "none",
            fontSize: 20,
            color: "#666",
            width: "45px",
            textAlign: "left",
            paddingLeft: "12px",
          }}
          // 移除 onMouseDown 和 onTouchStart
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
            <span className="text-gray-800 font-medium text-base">{t("Currency")}</span>
            <span className="text-gray-800 font-medium text-base">{symbol}</span>
          </div>

          {/* 网络 - 已修改 */}
          <div>
            <div className="text-sm text-gray-500 mb-1">{t("Network")}</div>
            <div className="flex space-x-2">
              {current.networks.map((net) => (
                <button
                  key={net}
                  className={`network-btn flex-1 py-2 rounded-lg font-medium border ${
                    network === net
                      ? "bg-yellow-400 text-white border-yellow-400"
                      : "bg-white text-gray-700 border-gray-200"
                  }`}
                  onClick={() => setNetwork(net)}
                  style={noFocusStyle}
                  // 移除 onMouseDown 和 onTouchStart
                >
                  {net}
                </button>
              ))}
            </div>
          </div>

          {/* 地址 - 已修改 */}
          <div>
            <div className="text-sm text-gray-500 mb-1">{t("Withdrawal address")}</div>

            <div className="flex items-center border rounded-lg focus-within:ring-1 focus-within:ring-yellow-400">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={t("Enter withdrawal address")}
                className="flex-1 px-3 py-2 text-sm rounded-lg outline-none text-black"
              />
              <button 
                className="copy-btn px-3 text-gray-400 hover:text-gray-600" // 添加 copy-btn class
                style={noFocusStyle}
                // 移除 onMouseDown 和 onTouchStart
              >
                📋
              </button>
            </div>
          </div>

          {/* 数量 - 已修改 */}
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
                className="max-btn text-xs text-yellow-500 font-medium hover:underline" // 添加 max-btn class
                onClick={() => setAmount(available.toString())}
                style={noFocusStyle}
                // 移除 onMouseDown 和 onTouchStart
              >
                {t("MAX")}
              </button>
            </div>
          </div>

          {/* 密码 */}
          <div>
            <div className="text-sm text-gray-500 mb-1">{t("Withdrawal Password")}</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("Withdrawal Password")}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-yellow-400 outline-none text-black"
            />
          </div>

          {/* 按钮 - 已修改 */}
          <Button
            className="confirm-btn w-full bg-yellow-400 hover:bg-yellow-500 text-white py-3 rounded-lg font-semibold disabled:opacity-50" // 添加 confirm-btn class
            style={noFocusStyle}
            onClick={handleSubmit}
            // 移除 onMouseDown 和 onTouchStart
            disabled={submitting}
          >
            {submitting ? t("Processing...") : t("Submit")}
          </Button>
        </CardContent>
      </Card>

      {/* 错误提示 */}
      {error && (
        <div className="mt-3 text-sm text-red-500 text-center">{error}</div>
      )}

      {/* 成功提示 */}
      {success && (
        <div className="mt-3 text-sm text-green-600 text-center">{success}</div>
      )}

      {/* 底部提示 */}
      <div className="text-sm text-gray-500 mt-3 text-center">
        {t("Ordinary withdrawal")}:{" "}
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