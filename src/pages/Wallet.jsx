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

export default function Wallet() {
  const navigate = useNavigate();
  const { allCoins } = useCoins();
  const { balances } = useUserBalances();
  const { t } = useTranslation();

  const [userInfo, setUserInfo] = useState(null);

  /* --------------------------------------------
      ① 静态首屏币种（不等接口，页面秒显示）
  -------------------------------------------- */
  const [coinsForView, setCoinsForView] = useState([
    { symbol: "USDT" },
    { symbol: "BTC" },
    { symbol: "ETH" },
    { symbol: "BNB" },
    { symbol: "SOL" },
    { symbol: "XRP" },
    
    { symbol: "DOGE" },
    { symbol: "ADA" },
    { symbol: "TRX" }
  ]);

  /* --------------------------------------------
      ② allCoins 加载后再替换真实币种（不会影响首屏）
  -------------------------------------------- */
  useEffect(() => {
    if (Array.isArray(allCoins) && allCoins.length > 0) {
      setCoinsForView([
        { symbol: "USDT" },
        ...allCoins.slice(0, 24) // 前 24 个币即可
      ]);
    }
  }, [allCoins]);

  /* --------------------------------------------
      加载用户信息（UID + 钱包地址）
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

  /* --------------------------------------------
      useMemo: 构建价格表
  -------------------------------------------- */
  const coinList = Array.isArray(allCoins) ? allCoins : [];

  const priceMap = useMemo(() => {
    const map = { USDT: 1 };

    coinList.forEach((c) => {
      const sym = (c.symbol || "").toUpperCase();
      const price = Number(c.price ?? c.current_price ?? 0);
      if (sym) map[sym] = price;
    });

    return map;
  }, [coinList]);

  /* --------------------------------------------
      useMemo: 计算总资产（不阻塞渲染）
  -------------------------------------------- */
  const totalAsset = useMemo(() => {
    if (!balances) return 0;

    let total = 0;
    Object.entries(balances).forEach(([sym, amt]) => {
      const cleanSym = sym.trim().toUpperCase();
      const price = priceMap[cleanSym] || 0;
      total += Number(amt || 0) * price;
    });

    return total;
  }, [balances, priceMap]);

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

        <div className="space-y-2">
          {coinsForView.map((coin) => {
            const sym = (coin.symbol || "").toUpperCase();

            let balance = balances?.[sym] || 0;

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
                  {Number(balance).toFixed(6)}
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
