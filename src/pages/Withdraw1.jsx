import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCoins } from "../hooks/useCoins";

// ====== 让 USDT 一定出现 ======
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
  const [coins, setCoins] = useState([]);
  const [balances, setBalances] = useState({});
  const [search, setSearch] = useState("");

  const { allCoins } = useCoins();
// 获取币种列表
// 用 allCoins 代替 coins
useEffect(() => {
  let list = Array.isArray(allCoins) ? allCoins : [];
  list = ensureUsdt(list); // USDT 强制置顶
  setCoins(list);
}, [allCoins]);

  // ✅ 获取用户余额
  useEffect(() => {
    async function loadBalance() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://pankouhoutai.shop/api/user/balance", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data && data.balances) setBalances(data.balances);
      } catch (err) {
        console.error("Failed to load balances:", err);
      }
    }
    loadBalance();
  }, []);

  // 搜索过滤
  const filteredCoins = coins.filter(
    (coin) =>
coin.symbol?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 顶部搜索栏 */}
      <div className="flex items-center px-4 py-3 bg-white shadow-sm sticky top-0 z-10">
        <input
          type="text"
          placeholder="Search currency"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-full px-4 py-2 text-sm text-gray-700 focus:ring-1 focus:ring-yellow-400 outline-none"
        />
        <button
          className="ml-3 text-gray-500 text-sm font-medium"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </div>

      {/* 币种列表 */}
      <div className="px-4 mt-2 space-y-2">
        {filteredCoins.map((coin) => {
          const sym = (coin.symbol || "").toUpperCase();
          const amount =
            parseFloat(balances?.[sym] ?? balances?.[sym.replace("USDT", "")] ?? 0) || 0;

          return (
            <div
              key={coin.id || coin.symbol}
              onClick={() => navigate(`/wallet/${sym}/withdraw`)}
              className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm hover:bg-gray-100 cursor-pointer transition"
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

        {filteredCoins.length === 0 && (
          <div className="text-center text-gray-400 mt-10 text-sm">
            No matching currency found
          </div>
        )}
      </div>
    </div>
  );
}
