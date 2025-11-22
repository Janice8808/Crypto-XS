import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Deposit1() {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 顶部搜索栏 */}
      <div className="flex items-center px-4 py-3 bg-white shadow-sm">
        <input
          type="text"
          placeholder={t("Search currency")}
          className="flex-1 border rounded-full px-4 py-2 bg-gray-100 outline-none"
        />
        <button
          onClick={() => navigate(-1)}
          className="ml-3 text-gray-600 text-sm font-medium bg-white"
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
              onClick={() => navigate(`/wallet/${coin.name}/deposit`)}
              className="flex items-center bg-gray-100 rounded-xl p-3 shadow-sm hover:bg-gray-200 cursor-pointer transition"
            >
              <img src={coin.icon} alt={coin.name} className="w-6 h-6 mr-2" />
              <span className="font-medium text-gray-800">{coin.name}</span>
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
              onClick={() => window.open(p.url, "_blank")}
              className="flex items-center bg-gray-100 rounded-xl p-3 shadow-sm hover:bg-gray-200 cursor-pointer justify-center transition"
            >
              <img src={p.icon} alt={p.name} className="h-10 object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
