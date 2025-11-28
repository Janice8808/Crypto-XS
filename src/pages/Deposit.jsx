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
  const [copyText, setCopyText] = useState(t("Copy"))

  // 智能返回函数
  const smartBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate("/") // 或者跳转到钱包页面 navigate("/wallet")
    }
  }

  // 币种配置...
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
    // ... 其他币种配置
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
    navigator.clipboard.writeText(depositAddress)
    setCopyText(t("Copied!"))
    setTimeout(() => {
      setCopyText(t("Copy"))
    }, 2000)
  }

  // 无焦点样式配置
  const noFocusStyle = {
    outline: 'none',
    boxShadow: 'none',
    border: 'none',
    WebkitTapHighlightColor: 'transparent'
  }

  return (
    <div className="min-h-screen bg-white p-4 pb-24">
      {/* 返回按钮 - 使用修复后的 smartBack */}
      <div className="flex items-center mb-3">
        <button
          className="back-btn"
          onClick={smartBack}
          style={{
            ...noFocusStyle,
            background: "none",
            fontSize: 20,
            color: "#666",
            width: "45px",
            textAlign: "left",
            paddingLeft: "12px",
          }}
        >
          ←
        </button>
      </div>

      {/* 标题 */}
      <h1 className="text-xl font-semibold text-gray-800 mb-3">{t("Deposit")}</h1>

      {/* 币种选择 */}
      <Card className="border border-gray-200 rounded-2xl mb-4 bg-gray-100">
        <CardContent className="p-4 flex justify-between items-center">
          <span className="text-gray-600 font-medium">{t("Currency")}</span>
          <span
            className="font-semibold text-gray-900 cursor-pointer back-btn"
            onClick={smartBack}
            style={noFocusStyle}
          >
            {symbol}
          </span>
        </CardContent>
      </Card>

      {/* 其余组件内容保持不变 */}
      {/* ... */}
    </div>
  )
}