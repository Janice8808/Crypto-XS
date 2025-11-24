// src/AuthGate.jsx
import { useAuth } from "@/context/AuthContext";

export default function AuthGate({ children }) {
  const { token, loadingUserInfo } = useAuth();

  if (loadingUserInfo) return null;

  // ✔ 有 token（游客） → 放行
  if (token) return children;

  // ❌ 没 token（第一次启动加载中）→ 不跳转，直接不渲染
  return null;
}
