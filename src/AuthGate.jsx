// src/AuthGate.jsx
import { useAuth } from "@/context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export default function AuthGate({ children }) {
  const { token, loadingUserInfo } = useAuth();
  const location = useLocation();

  // 用户信息还在加载 → 不渲染避免闪屏
  if (loadingUserInfo) return null;

  // ✔ 有 token（游客 or 钱包） → 放行
  if (token) return children;

  // ✔ 不拦截钱包登录页
  if (location.pathname === "/loginwallet") return children;

  // ❌ 没 token → 去 loginwallet
  return <Navigate to="/loginwallet" replace />;
}
