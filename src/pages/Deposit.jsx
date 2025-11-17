import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Deposit() {
  const { symbol } = useParams()
  const navigate = useNavigate()
  const [network, setNetwork] = useState("")

  const [amount, setAmount] = useState("")
  const [voucher, setVoucher] = useState(null)

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

  // 当前币种信息
  const current = depositInfo[symbol] || depositInfo.USDT
  const activeNetwork = network || current.networks[0]
  const depositAddress = current.addresses[activeNetwork]

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (file) setVoucher(URL.createObjectURL(file))
  }

  const handleSubmit = () => {
    alert(`Deposit ${amount} ${symbol} via ${activeNetwork}`)
  }

  return (
    <div className="min-h-screen bg-white p-4 pb-24">
      {/* 返回 */}
      <div className="flex items-center mb-3">
        <button onClick={() => navigate(-1)} className="text-gray-500 text-lg mr-2">
          ←
        </button>
      </div>

      {/* 页面标题 */}
      <h1 className="text-xl font-semibold text-gray-800 mb-3">Deposit</h1>

      {/* 币种框 */}
      <Card className="border border-gray-200 rounded-2xl mb-4 bg-gray-100">
        <CardContent className="p-4 flex justify-between items-center">
          <span className="text-gray-600 font-medium">Currency</span>
          <span className="font-semibold text-gray-900">{symbol}</span>
        </CardContent>
      </Card>

      {/* 网络 + 地址 + 二维码 + 复制 */}
      <Card className="border border-gray-200 rounded-2xl mb-4 bg-gray-100">
        <CardContent className="p-5 space-y-5">
          {/* 网络切换 */}
          <div>
            <div className="text-gray-600 font-medium mb-2">Network</div>
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
            <div className="text-gray-600 font-medium mb-2">Deposit address</div>
            <div className="flex justify-center mb-3">
              <img src={current.qr} alt="QR" className="w-40 h-40" />
            </div>
            <div className="text-gray-800 text-sm bg-gray-50 border border-gray-200 rounded-lg py-2 px-2 break-all">
              {depositAddress}
            </div>
            <div className="flex justify-center">
              <Button
                className="mt-3 bg-green-600 text-white font-semibold rounded-lg px-10"
                onClick={() => navigator.clipboard.writeText(depositAddress)}
              >
                Copy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 上传 + 金额 + 提示 */}
      <Card className="border border-gray-200 rounded-2xl mb-4 bg-gray-100">
        <CardContent className="p-5 space-y-5">
          {/* 上传凭证 */}
          <div>
            <div className="text-gray-600 font-medium mb-2">Upload transfer voucher</div>
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
            <label className="text-gray-600 text-sm font-medium">Transfer amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Please enter the transfer amount"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50"
            />
          </div>

          {/* 提示 */}
          <div className="text-xs text-gray-500 leading-relaxed mt-2">
            <p className="text-red-500 font-medium mb-1">
              Minimum recharge amount: 100.00 {symbol}. Recharge less than the minimum amount will not
              be credited and cannot be returned.
            </p>
            <p>Please select the correct network; otherwise, assets cannot be retrieved.</p>
            <p>Your deposit address rarely changes. If it does, we’ll notify you via announcement or email.</p>
            <p>Ensure your device and browser are secure to prevent data leaks.</p>
          </div>
        </CardContent>
      </Card>

      {/* 提交按钮 */}
      <div className="py-3">
        <Button
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg py-3"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}
