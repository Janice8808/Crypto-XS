import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCoins } from "../hooks/useCoins";
import { useUserBalances } from "@/hooks/useUserBalances";
import { coinIcons } from "../assets/coinIcons";
import { useTranslation } from "react-i18next";
import { apiFetch } from "@/api/http";
import { useEffect, useMemo, useState } from "react";

/* --------------------------------------------
    Skeleton 骨架屏
-------------------------------------------- */
function SkeletonList() {
  return (
    <div className="space-y-2">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm animate-pulse"
        >
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-gray-200" />
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>

          <div className="ml-auto text-right">
            <div className="h-4 w-20 bg-gray-200 rounded" />
          </div>

          <div className="w-4 h-4 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}

export default function Wallet() {
  const navigate = useNavigate();
  const { allCoins } = useCoins();
  const { balances } = useUserBalances();
  const { t } = useTranslation();

  const [userInfo, setUserInfo] = useState(null);

  /* --------------------------------------------
    加载用户信息（UID & Address）
-------------------------------------------- */
  useEffect(() => {
    async function loadInfo() {
      try {
        const res = await apiFetch("/api/userinfo");
        setUserInfo(res);

        if (res?.userId) localStorage.setItem("userId", res.userId);
        if (res?.wallet) localStorage.setItem("address", res.wallet);
      } catch (err) {
        console.error("加载用户信息失败:", err);
      }
    }

    loadInfo();
  }, []);

  /* --------------------------------------------
    Address + UID
-------------------------------------------- */
  const address = userInfo?.wallet || localStorage.getItem("address") || "";
  const userId = userInfo?.userId || localStorage.getItem("userId") || "";

  const clean = address.startsWith("0x") ? address.slice(2) : address;
  const shortAddress =
    clean && clean.length >= 20
      ? `0x${clean.slice(0, 6)}…${clean.slice(-4)}`
      : address || "--";

  const coinList = Array.isArray(allCoins) ? allCoins : [];

  /* --------------------------------------------
    useMemo: 构建价格 Map（避免每次渲染重算）
-------------------------------------------- */
  const priceMap = useMemo(() => {
    const map = {};
    coinList.forEach((c) => {
      const sym = (c.symbol || "").toUpperCase();
      const price = Number(c.price ?? c.current_price ?? 0) || 0;
      if (sym) map[sym] = price;
    });

    map["USDT"] = 1; // 恒定成
    return map;
  }, [coinList]);

  /* --------------------------------------------
    useMemo: 计算总资产
-------------------------------------------- */
  const totalAsset = useMemo(() => {
    if (!balances) return 0;

    let total = 0;
    Object.entries(balances).forEach(([sym, amt]) => {
      const cleanSym = sym.trim().toUpperCase();
      let price = priceMap[cleanSym];

      if (!price) {
        const found = Object.keys(priceMap).find(
          (k) => k.startsWith(cleanSym) && k.endsWith("USDT")
        );
        if (found) price = priceMap[found];
      }

      total += Number(amt || 0) * Number(price || 0);
    });

    return total;
  }, [balances, priceMap]);

  /* --------------------------------------------
    要显示的币（USDT + Top 24）
-------------------------------------------- */
  const coinsForView = useMemo(() => {
    return [
      { symbol: "USDT", logo: "/images/USDT.png" },
      ...coinList.slice(0, 24),
    ];
  }, [coinList]);

  /* --------------------------------------------
    判断是否完成加载
-------------------------------------------- */
  const loading =
    !userInfo || !allCoins || !balances || coinList.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* 顶部卡片 */}
      <Card className="m-4 rounded-2xl shadow-sm">
        <CardContent className="p-4 space-y-3">

          <div className="text-sm text-gray-600">
            <div className="font-semibold text-[#26a17b]">
              {shortAddress}
            </div>

            <div>
              UID:{" "}
              <span className="font-medium text-gray-700">
                {userId || "--"}
              </span>
            </div>
          </div>

          <div className="text-gray-600 text-sm">
            {t("Account total assets conversion")}{" "}
            <span className="text-[#26a17b]">(USDT)</span>
          </div>

          <div className="text-2xl font-semibold text-gray-800">
            ≈ ${totalAsset.toFixed(2)}
          </div>

          {/* 三个按钮 */}
          <div className="flex justify-between mt-3">
            <Button
              className="wallet-btn flex-1 mx-1 bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded-lg"
              onClick={() => navigate("/deposit1")}
            >
              {t("Deposit")}
            </Button>

            <Button
              className="wallet-btn flex-1 mx-1 bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded-lg"
              onClick={() => navigate("/withdraw1")}
            >
              {t("Withdraw")}
            </Button>

            <Button
              className="wallet-btn flex-1 mx-1 bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded-lg"
              onClick={() => navigate("/buycrypto1")}
            >
              {t("Buy Crypto")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 资产列表 */}
      <div className="px-4">
        <h2 className="text-gray-500 text-sm mb-2 font-medium">
          {t("Asset list")}
        </h2>

        {/* 骨架屏 */}
        {loading ? (
          <SkeletonList />
        ) : (
          <div className="space-y-2">
            {coinsForView.map((coin) => {
              const sym = (coin.symbol || "").toUpperCase();
              let balance = balances && balances[sym];

              if (!balance && sym.endsWith("USDT")) {
                const base = sym.replace("USDT", "");
                balance = balances && balances[base];
              }

              balance = Number(balance || 0);

              return (
                <Link
                  key={sym}
                  to={`/asset/${sym}`}
                  className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm hover:bg-gray-100 transition"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={coinIcons[sym] || "/images/default.png"}
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
        )}
      </div>
    </div>
  );
}
