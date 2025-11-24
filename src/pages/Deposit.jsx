import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function Deposit() {
  const { t } = useTranslation();
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [network, setNetwork] = useState(""); // 初始化时不选中网络
  const [amount, setAmount] = useState("");
  const [voucher, setVoucher] = useState(null);
  const [copyText, setCopyText] = useState(t("Copy"));

  // 每个币种的充值信息配置
  const depositInfo = {
    USDT: {
      networks: ["ERC20", "TRC20"], // USDT支持的网络
      addresses: {
        ERC20: "0x247d9633b242D791Ae353BE6879E30e6f449Bc6D",
        TRC20: "TXQp7LfXjD2hU4mZ8q3R9rPTVdss9sPG9P",
      },
      qr: "/images/2.jpg", // 二维码图片
    },
    BTC: {
      networks: ["Bitcoin"], // BTC支持的网络
      addresses: {
        Bitcoin: "bc1q9u5t0dd4n3r0zk9e9p3ye9cghd3eh9ukw6kqwd",
      },
      qr: "/images/btc.png", // 二维码图片
    },
    ETH: {
      networks: ["ERC20"], // ETH支持的网络
      addresses: {
        ERC20: "0xF8b4aC92E9dEa9dCdFec89C87b6bD8E6bF410b2A",
      },
      qr: "/images/eth.png", // 二维码图片
    },
    TRX: {
      networks: ["TRC20"], // TRX支持的网络
      addresses: {
        TRC20: "TSkD9Y8rFZ7r4N6PbT3Qy8T6Yx9Lb1qv7K",
      },
      qr: "/images/trx.png", // 二维码图片
    },
    DOGE: {
      networks: ["DOGE"], // DOGE支持的网络
      addresses: {
        DOGE: "D9d8sMz9PMbShWfZKuBzY9vBsmXvUfRz5M",
      },
      qr: "/images/doge.png", // 二维码图片
    },
    XRP: {
      networks: ["XRP"], // XRP支持的网络
      addresses: {
        XRP: "rLHZx4gYhZk7oK1dQdQy2W1HBeqhmM8UZG",
      },
      qr: "/images/xrp.png", // 二维码图片
    },
  };

  const current = depositInfo[symbol] || depositInfo.USDT;
  const activeNetwork = network || current.networks[0]; // 默认选择第一个网络
  const depositAddress = current.addresses[activeNetwork]; // 获取对应网络的地址
  const qrImage = current.qr; // 获取对应网络的二维码图片

  useEffect(() => {
    // 页面加载时，选择第一个网络（比如 ERC20）
    setNetwork(current.networks[0]);
  }, [symbol, current]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) setVoucher(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    alert(`${t("Deposit")} ${amount} ${symbol} ${t("via")} ${activeNetwork}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(depositAddress);
    setCopyText(t("Copied!"));
    setTimeout(() => {
      setCopyText(t("Copy"));
    }, 2000);
  };

  const handleCurrencyClick = () => {
    // 点击 "USDT" 后返回上一层页面
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white p-4 pb-24">
      {/* 返回 */}
      <div className="flex items-center mb-3">
        <button onClick={() => navigate(-1)} className="text-gray-500 text-lg mr-2">
          ←
        </button>
      </div>

      {/* 标题 */}
      <h1 className="text-xl font-semibold text-gray-800 mb-3">{t("Deposit")}</h1>

      {/* 币种 */}
      <Card className="border border-gray-200 rounded-2xl mb-4 bg-gray-100">
        <CardContent className="p-4 flex justify-between items-center">
          <span className="text-gray-600 font-medium">{t("Currency")}</span>
          <span
            className="font-semibold text-gray-900 cursor-pointer"
            onClick={handleCurrencyClick} // 点击时返回上一层
          >
            {symbol}
          </span>
        </CardContent>
      </Card>

      {/* 网络 + 地址 + 二维码 */}
      <Card className="border border-gray-200 rounded-2xl mb-4 bg-gray-100">
        <CardContent className="p-5 space-y-5">
          {/* 网络选择 */}
          <div className="flex space-x-2">
            {current.networks.map((net) => (
              <button
                key={net}
                onClick={() => setNetwork(net)} // 更新 network 状态
                className={`flex-1 py-2 rounded-lg font-medium border ${
                  network === net
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-gray-700 border-gray-200"
                }`}
              >
                {net}
              </button>
            ))}
          </div>

          {/* 地址与二维码 */}
          <div className="text-center">
            <div className="text-gray-600 font-medium mb-2">{t("Deposit address")}</div>

            <div className="flex justify-center mb-3">
              <img src={qrImage} alt="QR" className="w-40 h-40" />
            </div>

            <div className="text-gray-800 text-sm bg-gray-50 border border-gray-200 rounded-lg py-2 px-2 break-all">
              {depositAddress}
            </div>

            <div className="flex justify-center">
              <Button
                className={`mt-3 text-white font-semibold rounded-lg px-10 ${
                  copyText === t("Copied!") ? "bg-green-800" : "bg-green-600"
                }`}
                onClick={handleCopy}
              >
                {copyText}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 上传凭证 + 金额 + 提示 */}
      <Card className="border border-gray-200 rounded-2xl mb-4 bg-gray-100">
        <CardContent className="p-5 space-y-5">
          {/* 上传凭证 */}
          <div>
            <div className="text-gray-600 font-medium mb-2">{t("Upload transfer voucher")}</div>

            <label className="w-full h-44 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition">
              {voucher ? (
                <img src={voucher} alt="voucher" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <span className="text-3xl text-gray-400">+</span>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
            </label>
          </div>

          {/* 转账金额 */}
          <div>
            <label className="text-gray-600 text-sm font-medium">{t("Transfer amount")}</label>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={t("Please enter the transfer amount")}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50"
            />
          </div>

          {/* 提示 */}
          <div className="text-xs text-gray-500 leading-relaxed mt-2">
            <p className="text-red-500 font-medium mb-1">
              {t("Minimum recharge amount")}: 100.00 {symbol}.
              {t("Recharge less than the minimum amount will not be credited")}
            </p>
            <p>{t("Select correct network tip")}</p>
            <p>{t("Address rarely changes tip")}</p>
            <p>{t("Ensure device secure tip")}</p>
          </div>
        </CardContent>
      </Card>

      {/* 提交按钮 */}
      <div className="py-3">
        <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg py-3" onClick={handleSubmit}>
          {t("Submit")}
        </Button>
      </div>
    </div>
  );
}
