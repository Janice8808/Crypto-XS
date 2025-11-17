import React, { useState, useEffect } from "react";
import CandlestickIcon from "../components/CandlestickIcon";
import { useCoins } from "../hooks/useCoins";
import { useParams } from "react-router-dom";

const toUSDT = (s) => s.toLowerCase().replace("usdt", "") + "usdt";

const TradePanel = () => {
  const { allCoins } = useCoins();
  const { symbol: routeSymbol } = useParams();

  const [currentSymbol, setCurrentSymbol] = useState(
    (routeSymbol || "BTC").toUpperCase()
  );

  const [showDropdown, setShowDropdown] = useState(false);
  const [tradeType, setTradeType] = useState("buy");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [percentage, setPercentage] = useState(null);
  const [available, setAvailable] = useState(1000);

  // ⭐ 买卖盘深度（WebSocket 替代 axios）
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });

  // =========================
  // ⭐ WebSocket 深度 —— 无 CORS
  // =========================
  useEffect(() => {
    const pair = toUSDT(currentSymbol); // btc → btcusdt

    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${pair}@depth5@100ms`
    );

    ws.onmessage = (e) => {
      const d = JSON.parse(e.data);

      setOrderBook({
        bids: d.bids.map(([p, q]) => ({
          price: parseFloat(p),
          qty: parseFloat(q),
        })),
        asks: d.asks.map(([p, q]) => ({
          price: parseFloat(p),
          qty: parseFloat(q),
        })),
      });
    };

    return () => ws.close();
  }, [currentSymbol]);

  // 路由切换 symbol
  useEffect(() => {
    if (routeSymbol) {
      setCurrentSymbol(routeSymbol.toUpperCase());
    }
  }, [routeSymbol]);

  // =========================
  // 百分比自动计算
  // =========================
  const handlePercentage = (pct) => {
    setPercentage(pct);

    const price =
      tradeType === "buy"
        ? orderBook.asks[0]?.price
        : orderBook.bids[0]?.price;

    if (!price) return;

    const q = ((available * pct) / 100 / price).toFixed(6);
    setQuantity(q);
    setAmount((q * price).toFixed(2));
  };

  return (
    <div className="p-3 bg-white min-h-screen text-xs sm:text-sm">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2 relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-gray-600 text-xl px-2 py-1 hover:text-gray-800"
          >
            ≡
          </button>

          <span className="text-gray-500 font-medium text-sm">
            {currentSymbol}/USDT
          </span>

          {/* ===== 下拉选择币种 ===== */}
          {showDropdown && (
            <div className="absolute top-full left-0 mt-1 w-80 max-h-96 overflow-y-auto bg-white border rounded shadow-md z-50">
              {allCoins.map((coin) => {
                const sym = coin.symbol.toUpperCase();
                const up = coin.change >= 0;
                return (
                  <div
                    key={sym}
                    className="flex justify-between px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setCurrentSymbol(sym.replace("USDT", ""));
                      setShowDropdown(false);
                    }}
                  >
                    <span className="flex items-center text-black font-medium">
                      <img
                        src={coin.logo}
                        className="w-6 h-6 rounded-full mr-2"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/default-coin.png";
                        }}
                      />
                      {sym}
                    </span>
                    <span
                      className={`text-white px-1 py-0.5 text-sm rounded ${
                        up ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {up ? "+" : ""}
                      {coin.change}%
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="font-bold text-lg">{currentSymbol}/USDT</div>

        <button className="text-gray-600 text-xl px-2 py-1">
          <CandlestickIcon width={24} height={24} />
        </button>
      </div>

      {/* ================= Trade Panel ================= */}
      <div className="bg-gray-100 rounded-lg p-3 mt-2 flex space-x-4">
        {/* 左侧：买卖区 */}
        <div className="w-1/2 space-y-3">

          {/* Buy / Sell */}
          <div className="flex space-x-2 mb-2">
            <button
              className={`flex-1 py-2 rounded font-bold ${
                tradeType === "buy"
                  ? "bg-green-500 text-white"
                  : "bg-green-100 text-green-600"
              }`}
              onClick={() => setTradeType("buy")}
            >
              Buy
            </button>
            <button
              className={`flex-1 py-2 rounded font-bold ${
                tradeType === "sell"
                  ? "bg-red-500 text-white"
                  : "bg-red-100 text-red-600"
              }`}
              onClick={() => setTradeType("sell")}
            >
              Sell
            </button>
          </div>

          {/* Amount */}
          <div className="relative">
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full py-2 pl-20 pr-3 border rounded bg-white text-center"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
              Amount (USDT)
            </span>
          </div>

          {/* Quantity */}
          <div className="relative mt-3">
            <input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full py-2 pl-20 pr-3 border rounded bg-white text-center"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
              Quantity ({currentSymbol})
            </span>
          </div>

          {/* 百分比 */}
          <div className="flex justify-between mt-1">
            {[25, 50, 75, 100].map((p) => (
              <button
                key={p}
                className={`flex-1 py-1 rounded ${
                  percentage === p ? "bg-gray-300" : "bg-white"
                }`}
                onClick={() => handlePercentage(p)}
              >
                {p}%
              </button>
            ))}
          </div>

          {/* Available */}
          <div className="flex justify-between mt-3 text-gray-800">
            <span>Available:</span>
            <span className="font-semibold">{available} USDT</span>
          </div>

          {/* Buy / Sell */}
          <button
            className={`w-full py-2 rounded font-bold mt-2 ${
              tradeType === "buy"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {tradeType === "buy" ? "Buy" : "Sell"}
          </button>
        </div>

        {/* 右侧：挂单深度 */}
        <div className="w-1/2 space-y-2">
          <div className="font-semibold text-red-600">Sell Orders</div>
          {orderBook.asks
            .slice()
            .reverse()
            .map((a, i) => (
              <div key={i} className="flex justify-between">
                <span className="text-red-500">{a.price}</span>
                <span className="text-red-500">{a.qty}</span>
              </div>
            ))}

          <div className="h-4"></div>

          <div className="font-semibold text-green-600">Buy Orders</div>
          {orderBook.bids.map((b, i) => (
            <div key={i} className="flex justify-between">
              <span className="text-green-500">{b.price}</span>
              <span className="text-green-500">{b.qty}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= Limit Order ================= */}
      <div className="mt-6 bg-white">
        <div className="flex justify-between items-center border-b px-3 py-2">
          <span className="text-gray-500 font-medium">Limit order</span>
          <button className="text-gray-400 text-xl">≡</button>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <div className="text-4xl mb-2">📄</div>
          <div>No delegated order</div>
        </div>
      </div>
    </div>
  );
};

export default TradePanel;
