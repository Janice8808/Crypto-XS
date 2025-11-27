import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCoins } from "../hooks/useCoins";
import { fetchUserBalance } from "@/api/user";
import { useTranslation } from "react-i18next";

export default function CoinDetail() {
  const { t } = useTranslation();
  const { symbol } = useParams();
  const navigate = useNavigate();
  const { allCoins } = useCoins();

  const [balances, setBalances] = useState(null);
  const [loading, setLoading] = useState(true);

  // 无焦点样式配置 - 只用于按钮
  const noFocusStyle = {
    outline: 'none',
    boxShadow: 'none',
    border: 'none',
    WebkitTapHighlightColor: 'transparent'
  }

  // 只对按钮使用 preventDefault
  const preventDefault = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const upperSymbol = (symbol || "").toUpperCase();

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchUserBalance();
        setBalances(data.balances || {});
      } catch (e) {
        console.error("Load user balance failed:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const coinInfo = useMemo(() => {
    if (upperSymbol === "USDT") {
      return {
        symbol: "USDT",
        name: "Tether USD",
        price: 1,
        logo: "/coin-icons/USDT.png",
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
        logo: "/coin-icons/default-coin.png",
      };
    }

    return {
      symbol: upperSymbol,
      name: found.name || upperSymbol,
      price: Number(found.price ?? found.current_price ?? 0),
      logo: `/coin-icons/${found.symbol || upperSymbol}.png`,
    };
  }, [allCoins, upperSymbol]);

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
        <div className="text-gray-600">{t("Loading")}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 pb-20">
      {/* 返回按钮 */}
      <div className="flex items-center mb-3">
        <button
          onClick={() => window.history.back()}
          style={{
            ...noFocusStyle,
            background: "none",
            fontSize: 20,
            color: "#666",
            width: "45px",
            textAlign: "left",
            paddingLeft: "12px",
          }}
          onMouseDown={preventDefault}
          onTouchStart={preventDefault}
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
                {t("Price")}:{" "}
                <span className="font-medium">
                  {coinInfo.price
                    ? `$${coinInfo.price.toFixed(4)}`
                    : t("Unavailable")}
                </span>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-700 mt-2">{t("Available")}</div>
          <div className="text-lg font-medium text-gray-900">
            {available.toFixed(4)}
          </div>

          <div className="text-sm text-gray-700 mt-1">{t("Frozen")}</div>
          <div className="text-lg font-medium text-gray-900">
            {frozen.toFixed(4)}
          </div>

          <div className="text-sm text-gray-700 mt-1">{t("Equivalent (USDT)")}</div>
          <div className="text-lg font-medium text-gray-900">
            {equivalent.toFixed(2)}
          </div>
        </CardContent>
      </Card>

      {/* 财务记录标题 */}
      <div className="text-center text-gray-700 font-medium text-base mb-2">
        {t("Financial records")}
      </div>

      {/* 暂无记录 */}
      <Card
        className="border rounded-md min-h-[calc(100vh-420px)] flex items-center justify-center mb-16"
        style={{ backgroundColor: "#d4d4d8", borderColor: "#d1d5db" }}
      >
        <CardContent className="text-center text-gray-500">
          {t("Temporarily no data")}
        </CardContent>
      </Card>

      {/* 底部按钮 */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-around bg-white border-t py-3">
        <Button
          className="flex-1 mx-2 bg-yellow-400 hover:bg-yellow-500 text-white font-medium"
          style={noFocusStyle}
          onClick={() => navigate(`/wallet/${upperSymbol}/deposit`)}
          onMouseDown={preventDefault}
          onTouchStart={preventDefault}
        >
          {t("Deposit")}
        </Button>
        <Button
          className="flex-1 mx-2 bg-yellow-400 hover:bg-yellow-500 text-white font-medium"
          style={noFocusStyle}
          onClick={() => navigate(`/wallet/${upperSymbol}/withdraw`)}
          onMouseDown={preventDefault}
          onTouchStart={preventDefault}
        >
          {t("Withdraw")}
        </Button>
      </div>
    </div>
  );
}