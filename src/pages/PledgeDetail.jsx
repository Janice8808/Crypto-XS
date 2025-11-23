import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

/** 币种小图标（跟 Pledge 保持一致） */
const CoinIcon = ({ symbol }) => {
  switch (symbol) {
    case "BTC":
      return (
        <div className="w-7 h-7 rounded-full bg-[#F7931A] flex items-center justify-center text-white text-sm font-bold">
          B
        </div>
      );
    case "ETH":
      return (
        <div className="w-7 h-7 rounded-full bg-[#627EEA] flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L6 11l6 4 6-4-6-9z" fill="#fff" />
            <path d="M6 13l6 9 6-9-6 4-6-4z" fill="#C5CFF5" />
          </svg>
        </div>
      );
    case "USDT":
      return (
        <div className="w-7 h-7 rounded-full bg-[#26A17B] flex items-center justify-center text-white text-sm font-bold">
          T
        </div>
      );
    default:
      return (
        <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-white">
          ?
        </div>
      );
  }
};

export default function PledgeDetail() {
  const nav = useNavigate();
  const { symbol } = useParams();
  const { t } = useTranslation();

  /** 模拟币配置（和主页面一致） */
  const coins = {
    BTC: { rate: 5, min: 10000, days: [10, 30, 90] },
    ETH: { rate: 2, min: 3000, days: [10, 30, 90] },
    USDT: { rate: 1, min: 1000, days: [10, 30, 90] },
  };

  const info = coins[symbol] || coins["BTC"];

  const [selectedDay, setSelectedDay] = useState(info.days[0]);
  const [amount, setAmount] = useState("");

  const today = new Date().toISOString().slice(0, 10);

  /** 计算预计收益 */
  const dailyRate = info.rate / 100;
  const estimated = amount ? (amount * dailyRate * selectedDay).toFixed(4) : 0;

  return (
    <div className="w-full min-h-screen bg-white text-[#333]">

      {/* 顶部导航 */}
      <div className="flex items-center px-4 py-4 border-b">
        <button onClick={() => nav(-1)} className="mr-3">
          <svg width="26" height="26" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>

        <span className="text-lg font-semibold">{symbol}</span>
      </div>

      {/* 币种标题 */}
      <div className="flex items-center gap-2 px-4 py-4 text-xl font-bold">
        <CoinIcon symbol={symbol} />
        {symbol}
      </div>

      {/* Type */}
      <div className="px-4 mt-2 text-gray-500 text-sm">{t("Type")}</div>
      <div className="px-4 mt-1">
        <div className="border rounded-md px-3 py-2 text-gray-700">regular</div>
      </div>

      {/* Dialogue（天数） */}
      <div className="px-4 mt-5 text-gray-500 text-sm">{t("Dialogue (Sky)")}</div>

      <div className="flex gap-3 px-4 mt-2">
        {info.days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-md border text-sm font-medium ${
              selectedDay === day
                ? "border-[#FFB800] text-[#FFB800]"
                : "border-gray-300 text-gray-700"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* 输入数量 */}
      <div className="px-4 mt-6 text-gray-500 text-sm">{t("Purchase quantity")}</div>

      <div className="px-4 mt-2">
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-gray-700"
          placeholder="Please enter the quantity"
        />
      </div>

      <div className="px-4 mt-1 text-gray-400 text-xs">
        Available：0.0000 USDT
      </div>

      {/* 最低锁仓 */}
      <div className="px-4 mt-6 text-gray-500 text-sm">
        {t("Limit the number of lock warehouses")}
      </div>
      <div className="px-4 mt-1 text-gray-700 text-sm">
        least：{info.min}.00 USDT  
        <span className="ml-4 text-gray-400">Available amount：0 USDT</span>
      </div>

      {/* 时间节点 */}
      <div className="px-4 mt-6 space-y-3 text-sm text-gray-700">

        <div className="flex justify-between">
          <span>🔹 Locking day</span>
          <span>{today}</span>
        </div>

        <div className="flex justify-between">
          <span>🔹 Sapped day</span>
          <span>{today}</span>
        </div>

        <div class            ="flex justify-between">
          <span>🔹 Last to the end</span>
          <span>{today}</span>
        </div>

      </div>

      {/* 收益 */}
      <div className="px-4 mt-6 space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Daily interest rate</span>
          <span className="text-[#4B6BFD]">{info.rate}%</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Estimated interest</span>
          <span className="text-[#4B6BFD]">{estimated}</span>
        </div>
      </div>

      {/* 确认按钮 */}
      <div className="px-4 mt-10">
        <button className="w-full bg-[#FFC940] py-3 rounded-lg text-white text-sm font-medium">
          {t("confirm")}
        </button>
      </div>

      <div className="h-10" />
    </div>
  );
}
