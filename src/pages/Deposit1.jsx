import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Deposit1() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // 无焦点样式配置 - 只用于按钮
  const noFocusStyle = {
    outline: 'none',
    boxShadow: 'none',
    border: 'none',
    WebkitTapHighlightColor: 'transparent'
  }

  // 可以移除 preventDefault 函数
  // const preventDefault = (e) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  // }

  const rechargeCoins = [
    { name: "USDT", icon: "/images/USDT.png" },
    { name: "BTC", icon: "/images/btc.png" },
    { name: "ETH", icon: "/images/eth.png" },
    { name: "TRX", icon: "/images/trx.png" },
    { name: "DOGE", icon: "/images/doge.png" },
    { name: "XRP", icon: "/images/xrp.png" },
  ];

  const buyPlatforms = [
    { name: "Paybis", icon: "/images/paybis.png", url: "https://paybis.com" },
    { name: "Binance", icon: "/images/binance.png", url: "https://www.binance.com" },
    { name: "Huobi", icon: "/images/huobi.png", url: "https://www.huobi.com" },
    { name: "Kraken", icon: "/images/kraken.png", url: "https://www.kraken.com" },
    { name: "Ramp", icon: "/images/ramp.png", url: "https://ramp.network" },
    { name: "Banx", icon: "/images/banx.png", url: "https://www.banx.com" },
    { name: "Crypto.com", icon: "/images/crypto.png", url: "https://crypto.com" },
    { name: "Coinbase", icon: "/images/coinbase.png", url: "https://www.coinbase.com" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 no-tap">
      {/* 顶部搜索栏 */}
      <div className="flex items-center px-4 py-3 bg-white shadow-sm">
        <input
          type="text"
          placeholder={t("Search currency")}
          className="flex-1 border rounded-full px-4 py-2 bg-gray-100 outline-none"
        />
        <button
          className="close-btn" // 添加 close-btn class
          onClick={() => navigate(-1)}
          style={noFocusStyle}
          // 移除 onMouseDown 和 onTouchStart
        >
          {t("Cancel")}
        </button>
      </div>

      {/* Recharge 区域 */}
      <div className="px-4 mt-4">
        <h2 className="text-yellow-500 text-sm font-semibold mb-2 border-b border-yellow-300 inline-block pb-0.5">
          {t("Recharge")}
        </h2>

        <div className="grid grid-cols-2 gap-3 mt-3">
          {rechargeCoins.map((coin) => (
            <div
              key={coin.name}
              className="deposit-coin-item" // 添加 class 用于事件委托
              onClick={() => navigate(`/wallet/${coin.name}/deposit`)}
              style={noFocusStyle}
              // 移除 onMouseDown 和 onTouchStart
            >
              <div className="flex items-center justify-center bg-gray-100 rounded-xl p-3 shadow-sm hover:bg-gray-200 cursor-pointer transition active:bg-gray-100">
                <img src={coin.icon} alt={coin.name} className="w-7 h-7 mr-2" />
                <span className="font-medium text-gray-800 text-sm">{coin.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buy Cryptocurrency 区域 */}
      <div className="px-4 mt-6">
        <h2 className="text-yellow-500 text-sm font-semibold mb-2 border-b border-yellow-300 inline-block pb-0.5">
          {t("Buy Crypto")}
        </h2>

        <div className="grid grid-cols-2 gap-3 mt-3">
          {buyPlatforms.map((p) => (
            <div
              key={p.name}
              className="buy-platform-item" // 添加 class 用于事件委托
              onClick={() => window.open(p.url, "_blank")}
              style={noFocusStyle}
              // 移除 onMouseDown 和 onTouchStart
            >
              <div className="flex items-center justify-center bg-gray-100 rounded-xl p-3 shadow-sm hover:bg-gray-200 cursor-pointer transition active:bg-gray-100">
                <img src={p.icon} alt={p.name} className="h-10 object-contain" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}