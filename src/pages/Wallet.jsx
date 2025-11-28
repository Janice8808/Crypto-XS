import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCoins } from "../hooks/useCoins";
import { useUserBalances } from "@/hooks/useUserBalances";
import { coinIcons } from "../assets/coinIcons";
import { useTranslation } from "react-i18next";
import { apiFetch } from "@/api/http";
import { useEffect, useState } from "react";

export default function Wallet() {
  const navigate = useNavigate();
  const { allCoins } = useCoins();
  const { balances } = useUserBalances();
  const { t } = useTranslation();

  const [userInfo, setUserInfo] = useState(null);

  /* -------------------- ⭐ 加载用户信息（带 UID） -------------------- */
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

  /* -------------------- ⭐ 地址 & UID -------------------- */
  const address = userInfo?.wallet || localStorage.getItem("address") || "";
  const userId = userInfo?.userId || localStorage.getItem("userId") || "";

// 清理 0x，避免重复
const clean = address.startsWith("0x") ? address.slice(2) : address;

// 生成短地址（前 8 + 后 12）
const shortAddress =
  clean && clean.length >= 20
    ? `0x${clean.slice(0, 6)}…${clean.slice(-4)}`
    : address || "--";


  const coinList = Array.isArray(allCoins) ? allCoins : [];

  /* -------------------- ⭐ 构建价格 Map -------------------- */
  const priceMap = {};
  coinList.forEach((c) => {
    const sym = (c.symbol || "").toUpperCase();
    const price = Number(c.price ?? c.current_price ?? 0) || 0;
    if (sym) priceMap[sym] = price;
  });
  priceMap["USDT"] = 1; // 恒定价格

  /* -------------------- ⭐ 计算总资产 -------------------- */
  let totalAsset = 0;
  if (balances && typeof balances === "object") {
    Object.entries(balances).forEach(([sym, amt]) => {
      const cleanSym = (sym || "").trim().toUpperCase();
      const amount = Number(amt || 0);

      let price = priceMap[cleanSym];

      if (!price) {
        const found = Object.keys(priceMap).find(
          (k) => k.startsWith(cleanSym) && k.endsWith("USDT")
        );
        if (found) price = priceMap[found];
      }

      totalAsset += amount * Number(price || 0);
    });
  }

  /* -------------------- ⭐ 展示币种列表 -------------------- */
  const coinsForView = [
    { symbol: "USDT", logo: "/images/USDT.png" },
    ...coinList.slice(0, 24),
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      {/* -------------------- ⭐ 顶部卡片（含 UID） -------------------- */}
      <Card className="m-4 rounded-2xl shadow-sm">
        <CardContent className="p-4 space-y-3">
          <div className="text-sm text-gray-600">
            <div className="font-semibold text-[#26a17b]">{shortAddress}</div>

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

<div className="flex justify-between mt-3">
  <Button
    className="wallet-btn flex-1 mx-1 bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded-lg"
    onClick={() => navigate("/deposit1")}
    style={{
      outline: 'none',
      boxShadow: 'none',
      border: 'none',
      WebkitTapHighlightColor: 'transparent'
    }}
    // 移除 onMouseDown 和 onTouchStart
  >
    {t("Deposit")}
  </Button>

  <Button
    className="wallet-btn flex-1 mx-1 bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded-lg"
    onClick={() => navigate("/withdraw1")}
    style={{
      outline: 'none',
      boxShadow: 'none',
      border: 'none',
      WebkitTapHighlightColor: 'transparent'
    }}
    // 移除 onMouseDown 和 onTouchStart
  >
    {t("Withdraw")}
  </Button>

  <Button
    className="wallet-btn flex-1 mx-1 bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded-lg"
    onClick={() => navigate("/buycrypto1")}
    style={{
      outline: 'none',
      boxShadow: 'none',
      border: 'none',
      WebkitTapHighlightColor: 'transparent'
    }}
    // 移除 onMouseDown 和 onTouchStart
  >
    {t("Buy Crypto")}
  </Button>

          </div>
        </CardContent>
      </Card>

      {/* -------------------- ⭐ 资产列表 -------------------- */}
      <div className="px-4">
        <h2 className="text-gray-500 text-sm mb-2 font-medium">
          {t("Asset list")}
        </h2>

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
      </div>
    </div>
  );
}