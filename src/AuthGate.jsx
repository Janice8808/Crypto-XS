// src/AuthGate.jsx
import React, { useEffect, useRef } from "react";
import { useAuth } from "./context/AuthContext";

const AuthGate = ({ children }) => {
  const { isLoggedIn, connecting, connectWallet } = useAuth();
  const requestedOnceRef = useRef(false);

  useEffect(() => {
    if (isLoggedIn) return;
    if (connecting || requestedOnceRef.current) return;

    requestedOnceRef.current = true;
    connectWallet();
  }, [isLoggedIn, connecting, connectWallet]);

  if (isLoggedIn) return children;

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <h1 className="text-lg font-semibold mb-3">Waiting for Wallet Authorization</h1>
      <p className="text-sm text-gray-600 text-center mb-2">
        已向你的钱包发起授权请求，请在钱包中确认。
      </p>
      {connecting && (
        <div className="mt-4 text-xs text-gray-500">Connecting...</div>
      )}
    </div>
  );
};

export default AuthGate;
