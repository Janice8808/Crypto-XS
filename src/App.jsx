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
  <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
    <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md w-full">
      <h2 className="text-2xl font-bold mb-3 text-gray-900">
        Download Base Wallet
      </h2>
      <p className="text-gray-600 text-base mb-6">
        Please scan the QR code below with your mobile device to install the wallet.
      </p>

      <img
        src="/wallet-download.png"
        alt="wallet qr"
        className="w-64 mx-auto mb-6 rounded-xl shadow-lg"
      />

      <button
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-base font-semibold transition"
        onClick={() => setShowWalletQr(false)}
      >
        I already installed the App
      </button>
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
