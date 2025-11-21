// src/AuthGate.jsx
import { useAuth } from "@/context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export default function AuthGate({ children }) {
  const { isLoggedIn, loadingUserInfo } = useAuth();
  const location = useLocation();

  // 正在恢复 → 不闪动
  if (loadingUserInfo) return null;

  // 已登录（== 有 userId） → 放行
  if (isLoggedIn) return children;

  // 允许访问登录钱包页（用于首次创建访客 UID）
  if (location.pathname.toLowerCase() === "/loginwallet") return children;

  // 其他未登录路径 → 跳 LoginWallet 生成访客账号
  return <Navigate to="/loginwallet" replace />;
}
