// useUserBalances.jsx
import { useEffect, useState } from "react";
import { apiFetch } from "@/api/http";

export function useUserBalances() {
  const [balances, setBalances] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem("token");

        // ⭐ token 缺失时清理并退出
        if (!token) {
          localStorage.removeItem("token");
          setLoading(false);
          return;
        }

        const data = await apiFetch("/api/user/balance", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        // ⭐ 设置资产（默认必须包含 USDT / BTC）
        setBalances({
          USDT: 0,
          BTC: 0,
          ...data.balances,
        });

        // ⭐ 存储钱包地址（用于 Wallet 页面显示）
        if (data.wallet) {
          localStorage.setItem("address", data.wallet);
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

  return { balances, loading };
}
