// src/components/auth/ConnectWalletButton.jsx
import React from "react";
import { useAuth } from "@/context/AuthContext";

const shortAddress = (addr) =>
  addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";

const ConnectWalletButton = () => {
  const { address, isLoggedIn, connecting, connectWallet, logout } = useAuth();

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-2 text-xs">
        <span className="px-2 py-1 rounded-full bg-white/10">
          {shortAddress(address)}
        </span>
        <button
          className="text-white/60 underline"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      disabled={connecting}
      className="px-3 py-1 rounded-full bg-white text-black text-xs font-medium disabled:bg-white/50"
    >
      {connecting ? "Connecting..." : "Connect Wallet"}
    </button>
  );
};

export default ConnectWalletButton;
