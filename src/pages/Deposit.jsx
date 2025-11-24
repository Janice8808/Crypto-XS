import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

export default function Deposit() {
  const { t } = useTranslation()
  const { symbol } = useParams()
  const navigate = useNavigate()
  const [network, setNetwork] = useState("")
  const [amount, setAmount] = useState("")
  const [voucher, setVoucher] = useState(null)
  const [copyText, setCopyText] = useState(t("Copy")) // 初始化按钮文本为 "Copy"

  // 每个币种的充值信息配置
  const depositInfo = {
    USDT: {
      networks: ["ERC20", "TRC20"],
      addresses: {
        ERC20: "0x247d9633b242D791Ae353BE6879E30e6f449Bc6D",
        TRC20: "TXQp7LfXjD2hU4mZ8q3R9rPTVdss9sPG9P",
        BEP20: "0x1A63bE0B81b9F97E7C39E0E81B2B15C6E3D92821",
      },
      qr: "/images/2.jpg",
    },
    BTC: {
      networks: ["Bitcoin"],
      addresses: {
        BTC: "bc1q9u5t0dd4n3r0zk9e9p3ye9cghd3eh9ukw6kqwd",
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
  }

  const current = depositInfo[symbol] || depositInfo.USDT
  const activeNetwork = network || current.networks[0]
  const depositAddress = current.addresses[activeNetwork]

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (file) setVoucher(URL.createObjectURL(file))
  }

  const handleSubmit = () => {
    alert(`${t("Deposit")} ${amount} ${symbol} ${t("via")} ${activeNetwork}`)
  }

  const handleCopy = () => {
    // 复制地址到剪贴板
    navigator.clipboard.writeText(depositAddress)

    // 设置按钮文本为 "Copied!"
    setCopyText(t("Copied!"))

    // 2秒后恢复按钮文本为 "Copy"
    setTimeout(() => {
      setCopyText(t("Copy"))
    }, 2000)
  }

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
          <span className="font-semibold text-gray-900">{symbol}</span>
        </CardContent>
      </Card>

      {/* 网络 + 地址 + 二维码 */}
      <Card className="border border-gray-200 rounded-2xl mb-4 bg-gray-100">
        <CardContent className="p-5 space-y-5">

          {/* 网络选择 */}
          <div>
            <div className="text-gray-600 font-medium mb-2">{t("Network")}</div>
            <div className="flex gap-3">
              {current.networks.map((n) => (
                <Button
                  key={n}
                  className={`flex-1 ${
                    activeNetwork === n ? "bg-green-600" : "bg-gray-400"
                  } text-white font-semibold rounded-lg`}
                  onClick={() => setNetwork(n)}
                >
                  {n}
                </Button>
              ))}
            </div>
          </div>

          {/* 地址与二维码 */}
          <div className="text-center">
            <div className="text-gray-600 font-medium mb-2">{t("Deposit address")}</div>

            <div className="flex justify-center mb-3">
              <img src={current.qr} alt="QR" className="w-40 h-40" />
            </div>

            <div className="text-gray-800 text-sm bg-gray-50 border border-gray-200 rounded-lg py-2 px-2 break-all">
              {depositAddress}
            </div>

            <div className="flex justify-center">
              <Button
                className="mt-3 bg-green-600 text-white font-semibold rounded-lg px-10"
                onClick={handleCopy}
              >
                {copyText}  {/* 按钮文本会根据 copyText 变化 */}
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
            <div className="text-gray-600 font-medium mb-2">
              {t("Upload transfer voucher")}
            </div>

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
            <label className="text-gray-600 text-sm font-medium">
              {t("Transfer amount")}
            </label>

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
        <Button
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg py-3"
          onClick={handleSubmit}
        >
          {t("Submit")}
        </Button>
      </div>

    </div>
  )
}
