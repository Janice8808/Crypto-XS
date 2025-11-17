import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCoins } from "../hooks/useCoins";
import { useUserBalances } from "@/hooks/useUserBalances";

export default function Wallet() {
  const navigate = useNavigate();
  const { allCoins } = useCoins();
  const { balances } = useUserBalances();

  const coinList = Array.isArray(allCoins) ? allCoins : [];

  // ⭐ 先构建价格 Map
  const priceMap = {};
  coinList.forEach((c) => {
    const sym = (c.symbol || "").toUpperCase();
    const price = Number(c.price ?? c.current_price ?? 0) || 0;
    if (sym) priceMap[sym] = price;
  });
  priceMap["USDT"] = 1;

  // ⭐ 日志要放 priceMap 构建之后！
  console.log("🔥 前端收到的余额 balances =", balances);
  console.log("🔥 所有价格 priceMap =", priceMap);
  console.log("🔥 priceMap keys =", Object.keys(priceMap));

  // ⭐ 计算总资产（修复大小写/空格问题）
  let totalAsset = 0;
  if (balances && typeof balances === "object") {
Object.entries(balances).forEach(([sym, amt]) => {
  const cleanSym = (sym || "").trim().toUpperCase();
  const amount = Number(amt || 0);

  let price = priceMap[cleanSym];

  // ⭐ 1) 尝试完全匹配（BTC → BTCUSDT）
  if (!price) {
    const found = Object.keys(priceMap).find(
      (k) =>
        k.startsWith(cleanSym) && k.endsWith("USDT") // 例：BTCUSDT、ETHUSDT
    );
    if (found) {
      price = priceMap[found];
    }
  }

  // ⭐ 2) fallback，如果还没找到就设为 0
  price = Number(price || 0);

  totalAsset += amount * price;
});

  }

  const coinsForView = [
    { symbol: "USDT", logo: "/images/USDT.png" },
    ...coinList.slice(0, 24),
  ];

  const address = localStorage.getItem("address") || "";
  const userId = localStorage.getItem("userId") || "";

  const shortAddress =
    address && address.length > 10
      ? `${address.slice(0, 6)}....${address.slice(-4)}`
      : address || "--";

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Card className="m-4 rounded-2xl shadow-sm">
        <CardContent className="p-4 space-y-3">
          <div className="text-sm text-gray-600">
            <div className="font-semibold text-[#26a17b]">{shortAddress}</div>
            <div>
              UID: <span className="font-medium text-gray-700">{userId || "--"}</span>
            </div>
          </div>

          <div className="text-gray-600 text-sm">
            Account total assets conversion <span className="text-[#26a17b]">(USDT)</span>
          </div>

          <div className="text-2xl font-semibold text-gray-800">
            ≈ ${totalAsset.toFixed(2)}
          </div>

          <div className="flex justify-between mt-3">
            <Button
              onClick={() => navigate("/deposit1")}
              className="flex-1 mx-1 bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded-lg"
            >
              Deposit
            </Button>
            <Button
              onClick={() => navigate("/withdraw1")}
              className="flex-1 mx-1 bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded-lg"
            >
              Withdraw
            </Button>
            <Button
              onClick={() => navigate("/buycrypto1")}
              className="flex-1 mx-1 bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded-lg"
            >
              Buy Crypto
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="px-4">
        <h2 className="text-gray-500 text-sm mb-2 font-medium">Asset list</h2>
        <div className="space-y-2">
          {coinsForView.map((coin) => {
const sym = (coin.symbol || "").toUpperCase();

// ⭐ 优先找直接匹配，如 BTC / USDT
let balance = balances && balances[sym];

// ⭐ 如果没找到，就尝试去掉 USDT 后缀匹配
if (!balance && sym.endsWith("USDT")) {
  const base = sym.replace("USDT", "");
  balance = balances && balances[base];
}

// ⭐ 还没找到就默认 0
balance = Number(balance || 0);

            return (
              <Link
                key={sym}
                to={`/asset/${sym}`}
                className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm hover:bg-gray-100 transition"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={coin.logo || coin.image}
                    alt={sym}
                    className="w-6 h-6 rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/default-coin.png";
                    }}
                  />
                  <span className="font-medium text-black">{sym}</span>
                </div>

                <div className="ml-auto text-right font-mono text-gray-700 text-sm w-28">
  {balance.toFixed(6)}
</div>


                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
