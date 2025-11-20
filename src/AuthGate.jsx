// src/AuthGate.jsx
import { useAuth } from "@/context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export default function AuthGate({ children }) {
  const { isLoggedIn, loadingUserInfo } = useAuth();
  const location = useLocation();

  // 正在恢复 token → 不要闪屏
  if (loadingUserInfo) return null;

  // 已登录 → 放行
  if (isLoggedIn) return children;

  // 允许进入钱包登录页本身
  if (location.pathname === "/loginwallet") return children;

  // 未登录 → 去 loginwallet
  return <Navigate to="/loginwallet" replace />;
}
