import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./i18n";

import Splash from "./Splash";    // ⭐ 新增：启动页

import AdminSimple from "./pages/AdminSimple";
import Layout from "./Layout";
import AuthGate from "./AuthGate";

import Home from "./pages/Home";
import Market from "./pages/Market";
import CoinDetail from "./pages/CoinDetail";
import Trade from "./pages/Trade";
import Wallet from "./pages/Wallet";
import ScrollToTop from "./ScrollToTop";
import AssetDetail from "./pages/AssetDetail";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Deposit1 from "./pages/Deposit1";
import Withdraw1 from "./pages/Withdraw1";
import BuyCrypto1 from "./pages/BuyCrypto1";
import PledgeDetail from "./pages/PledgeDetail";
import UserCenter from "./pages/UserCenter";
import Mail from "./pages/Mail";
import BankCard from "./pages/BankCard";
import Language from "./pages/Language";
import WithdrawalPassword from "./pages/WithdrawalPassword";
import MSBCertification from "./pages/MSBCertification";
import Introduction from "./pages/Introduction";

import Pledge from "./pages/Pledge";
import DeFiRecord from "./pages/DeFiRecord";
import Notice from "./pages/Notice";
import LoginWallet from "./pages/LoginWallet";
import AdminPanel from "./pages/AdminPanel";

function App() {

  // ⭐ 自动更新用户 last_seen
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

  // ⭐ 电脑端弹出 "下载钱包二维码"
  const [showWalletQr, setShowWalletQr] = useState(false);

  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) {
      setShowWalletQr(true);
    }
  }, []);

  return (
    <Splash>   {/* ⭐ 整个 APP 包个启动页 */}

      {/* ⭐ 电脑端二维码弹窗 */}
      {showWalletQr && (
        <div className="fixed inset-0 bg-[#16171a]/90 z-50 flex items-center justify-center px-4">
          <div className="bg-transparent text-center max-w-lg w-full">

            <img
              src="/walletconnect.png"
              alt="WalletConnect QR"
              className="w-full rounded-3xl shadow-2xl mx-auto"
            />

            {/* 图片下方一个 × */}
            <div
              onClick={() => setShowWalletQr(false)}
              className="mt-4 text-white/70 hover:text-white text-4xl cursor-pointer select-none"
            >
              ×
            </div>

          </div>
        </div>
      )}

      {/* ⭐ 主路由 */}
      <Router>
        <ScrollToTop />
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
          <Route path="/notice" element={<Notice />} />
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
          <Route  path="/pledge-detail/:symbol" element={<AuthGate><PledgeDetail /></AuthGate>} />

          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin2" element={<AdminSimple />} />

          {/* 默认首页 */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>

    </Splash>
  );
}

export default App;
