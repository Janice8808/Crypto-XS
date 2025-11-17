// useUserBalances.jsx
import { useEffect, useState } from "react";
import { apiFetch } from "@/api/http";

export function useUserBalances() {
  const [balances, setBalances] = useState({});
  const [controlMode, setControlMode] = useState("normal"); // ⭐ 新增
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const data = await apiFetch("/api/user/balance", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        setBalances(data.balances || {});
        if (data.controlMode) {
          setControlMode(data.controlMode); // ⭐ 从后端拿控盘模式
        }
      } catch (err) {
        console.error("Load balance error:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { balances, controlMode, loading }; // ⭐ 多返回一个 controlMode
}
