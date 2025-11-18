// src/AuthGate.jsx
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const AuthGate = ({ children }) => {
  const token = localStorage.getItem("token");
  const address = localStorage.getItem("address");
  const hasSession = token && address;

  const location = useLocation();
  const requestedOnceRef = useRef(false);

  const isLoginPage = location.pathname === "/loginwallet";

  useEffect(() => {
    if (hasSession) return;                  // 已登录 → 放行
    if (isLoginPage) return;                // 正在登录页 → 不拦截
    if (requestedOnceRef.current) return;    // 只触发一次自动跳转

    requestedOnceRef.current = true;
    console.log("🔑 First time login → redirecting to /loginwallet");
    window.location.href = "/loginwallet";
  }, [hasSession, isLoginPage]);

  // ⭐ 已登录 → 渲染业务内容
  if (hasSession) return children;

  // ⭐ 在 /loginwallet 页面 → 渲染登录页（不要显示等待界面）
  if (isLoginPage) return null;

  // ⭐ 未登录 + 不在登录页 → 显示等待 UI
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <h1 className="text-lg font-semibold mb-3">Waiting for Wallet Authorization</h1>
      <p className="text-sm text-gray-600 text-center mb-2">
        已向你的钱包发起授权请求，请在钱包中确认。
      </p>
    </div>
  );
};

export default AuthGate;
