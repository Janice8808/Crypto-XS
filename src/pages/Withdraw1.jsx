import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useCoins } from "../hooks/useCoins";
import { useTranslation } from "react-i18next";

// ====== USDT 一定出现 ======
function ensureUsdt(coins) {
  const hasUsdt = coins.some(
    (c) => (c.symbol || "").toUpperCase() === "USDT"
  );

  if (hasUsdt) return coins;

  return [
    {
      id: "USDT",
      symbol: "USDT",
      name: "Tether USDT",
      image: "/images/usdt.png",
    },
    ...coins,
  ];
}

export default function Withdraw1() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { allCoins } = useCoins();

  /* -------------------------------------
      ⭐ 1. 静态首屏（瞬间显示）
  ------------------------------------- */
  const [coins, setCoins] = useState([
    { symbol: "USDT" },
    { symbol: "BTC" },
    { symbol: "ETH" },
    { symbol: "BNB" },
    { symbol: "SOL" },
    { symbol: "XRP" },
    { symbol: "DOGE" },
    { symbol: "ADA" },
    { symbol: "TRX" },
    { symbol: "AVAX" },
    { symbol: "DOT" },
    { symbol: "LTC" },        
  ]);

  /* -------------------------------------
      ⭐ 2. allCoins 加载后平滑替换真数据
  ------------------------------------- */
  useEffect(() => {
    if (Array.isArray(allCoins) && allCoins.length > 0) {
      let final = ensureUsdt(allCoins);
      setCoins(final.slice(0, 50)); // 限制数量避免卡顿
    }
  }, [allCoins]);

  /* -------------------------------------
      ⭐ 3. 余额：第一次不用等待
  ------------------------------------- */
  const [balances, setBalances] = useState({});

  useEffect(() => {
    async function loadBalance() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://pankouhoutai.shop/api/user/balance", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (data && data.balances) {
          setBalances(data.balances);
        }
      } catch (err) {
        console.error("Failed to load balances:", err);
      }
    }

    loadBalance();
  }, []);

  /* -------------------------------------
      搜索
  ------------------------------------- */
  const [search, setSearch] = useState("");

  const filteredCoins = useMemo(() => {
    return coins.filter((coin) =>
      coin.symbol?.toLowerCase().includes(search.toLowerCase())
    );
  }, [coins, search]);

  /* -------------------------------------
      无焦点默认样式
  ------------------------------------- */
  const noFocusStyle = {
    outline: "none",
    boxShadow: "none",
    border: "none",
    WebkitTapHighlightColor: "transparent",
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* 搜索栏 */}
      <div className="flex items-center px-4 py-3 bg-white shadow-sm sticky top-0 z-10">
        <input
          type="text"
          placeholder={t("Search currency")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-full px-4 py-2 text-sm text-gray-700 focus:ring-1 focus:ring-yellow-400 outline-none"
        />
        <button
          className="back-btn ml-3 text-gray-500 text-sm font-medium"
          onClick={() => navigate(-1)}
          style={noFocusStyle}
        >
          {t("Cancel")}
        </button>
      </div>

      {/* 币种列表 */}
      <div className="px-4 mt-2 space-y-2">
        {filteredCoins.map((coin) => {
          const sym = (coin.symbol || "").toUpperCase();
          const amount =
            parseFloat(
              balances?.[sym] ??
              balances?.[sym.replace("USDT", "")] ??
              0
            ) || 0;

          return (
            <div
              key={coin.id || coin.symbol}
              className="coin-item flex items-center justify-between bg-white rounded-xl p-3 shadow-sm hover:bg-gray-100 cursor-pointer transition"
              onClick={() => navigate(`/wallet/${sym}/withdraw`)}
              style={noFocusStyle}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={`/coin-icons/${sym}.png`}
                  alt={sym}
                  className="w-6 h-6 rounded-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/default-coin.png";
                  }}
                />

                <span className="font-medium text-gray-800 uppercase">
                  {sym}
                </span>
              </div>

              <span className="text-gray-500 text-sm">
                {amount.toFixed(4)}
              </span>
            </div>
          );
        })}

        {/* 无匹配 */}
        {filteredCoins.length === 0 && (
          <div className="text-center text-gray-400 mt-10 text-sm">
            {t("No matching currency found")}
          </div>
        )}
      </div>
    </div>
  );
}
