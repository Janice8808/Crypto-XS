// useUserBalances.jsx
import { useEffect, useState } from "react";
import { apiFetch } from "@/api/http";

export function useUserBalances() {
  const [balances, setBalances] = useState({});
  const [loading, setLoading] = useState(true);

  // ⭐ 控盘模式：normal / win / lose
  const [controlMode, setControlMode] = useState("normal");

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          localStorage.removeItem("token");
          setLoading(false);
          return;
        }

        // ⭐ 改成获取完整用户信息（包含 controlMode）
        const info = await apiFetch("/api/userinfo", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        // 更新控盘模式
        setControlMode(info.controlMode || "normal");

        // 更新余额
        setBalances({
          USDT: 0,
          BTC: 0,
          ...(info.balances || {}),
        });

        // 存地址
        if (info.wallet) {
          localStorage.setItem("address", info.wallet);
        }

      } catch (err) {
        console.error("Load balance error:", err);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    balances,
    controlMode,
    loading,
  };
}
