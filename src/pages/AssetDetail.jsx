import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCoins } from "../hooks/useCoins";
import { fetchUserBalance } from "@/api/user";

export default function CoinDetail() {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const { allCoins } = useCoins();

  const [balances, setBalances] = useState(null);
  const [loading, setLoading] = useState(true);

  const upperSymbol = (symbol || "").toUpperCase();

  // 🧩 从后端加载当前用户资产
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchUserBalance(); // { balances, userId }
        setBalances(data.balances || {});
      } catch (e) {
        console.error("Load user balance failed:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // 🪙 匹配当前币的行情信息
  const coinInfo = useMemo(() => {
    if (upperSymbol === "USDT") {
      return {
        symbol: "USDT",
        name: "Tether USD",
        price: 1,
        logo: "/images/USDT.png",
      };
    }

    const found = allCoins.find((c) => {
      const s = (c.symbol || "").toUpperCase();
      return (
        s === upperSymbol ||
        s === `${upperSymbol}USDT` ||
        s.startsWith(upperSymbol)
      );
    });

    if (!found) {
      return {
        symbol: upperSymbol,
        name: upperSymbol,
        price: 0,
        logo: "/images/default-coin.png",
      };
    }

    return {
      symbol: upperSymbol,
      name: found.name || upperSymbol,
      price: Number(found.price ?? found.current_price ?? 0),
      logo: found.image || "/images/default-coin.png",
    };
  }, [allCoins, upperSymbol]);

  // 💰 当前币余额和换算
const availableRaw =
  balances?.[upperSymbol] ??
  balances?.[upperSymbol.replace("USDT", "")] ??
  0;
const available = parseFloat(availableRaw) || 0;
  const frozen = 0;
  const equivalent = available * (Number(coinInfo.price) || 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-4 pb-20 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 pb-20">
      {/* 返回按钮 */}
      <div className="flex items-center mb-3">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 text-lg mr-2"
        >
          ←
        </button>
      </div>

      {/* 币种信息 */}
      <Card
        className="border rounded-md mb-4"
        style={{ backgroundColor: "#d4d4d8", borderColor: "#d1d5db" }}
      >
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <img
              src={coinInfo.logo}
              alt={coinInfo.symbol}
              className="w-8 h-8 rounded-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/default-coin.png";
              }}
            />
            <div>
              <div className="text-2xl font-bold text-yellow-500">
                {coinInfo.symbol}
              </div>
              <div className="text-xs text-gray-700">{coinInfo.name}</div>
              <div className="text-xs text-gray-700">
                Price:{" "}
                <span className="font-medium">
                  {coinInfo.price
                    ? `$${coinInfo.price.toFixed(4)}`
                    : "Unavailable"}
                </span>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-700 mt-2">Available</div>
          <div className="text-lg font-medium text-gray-900">
            {available.toFixed(4)}
          </div>

          <div className="text-sm text-gray-700 mt-1">Frozen</div>
          <div className="text-lg font-medium text-gray-900">
            {frozen.toFixed(4)}
          </div>

          <div className="text-sm text-gray-700 mt-1">Equivalent (USDT)</div>
          <div className="text-lg font-medium text-gray-900">
            {equivalent.toFixed(2)}
          </div>
        </CardContent>
      </Card>

      {/* 财务记录标题 */}
      <div className="text-center text-gray-700 font-medium text-base mb-2">
        Financial records
      </div>

      {/* 暂无记录 */}
      <Card
        className="border rounded-md min-h-[calc(100vh-420px)] flex items-center justify-center mb-16"
        style={{ backgroundColor: "#d4d4d8", borderColor: "#d1d5db" }}
      >
        <CardContent className="text-center text-gray-500">
          Temporarily no data
        </CardContent>
      </Card>

      {/* 底部按钮 */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-around bg-white border-t py-3">
        <Button
          className="flex-1 mx-2 bg-yellow-400 hover:bg-yellow-500 text-white font-medium"
          onClick={() => navigate(`/wallet/${upperSymbol}/deposit`)}
        >
          Deposit
        </Button>
        <Button
          className="flex-1 mx-2 bg-yellow-400 hover:bg-yellow-500 text-white font-medium"
          onClick={() => navigate(`/wallet/${upperSymbol}/withdraw`)}
        >
          Withdraw
        </Button>
      </div>
    </div>
  );
}
