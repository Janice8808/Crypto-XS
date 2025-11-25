// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./i18n";

import Splash from "./Splash";
import Layout from "./Layout";
import AuthGate from "./AuthGate";
import { apiFetch } from "@/api/http";

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
import { getBrowserFingerprint } from "@/utils/fingerprint";
import UserCenter from "./pages/UserCenter";
import Mail from "./pages/Mail";
import BankCard from "./pages/BankCard";
import Language from "./pages/Language";
import WithdrawalPassword from "./pages/WithdrawalPassword";
import MSBCertification from "./pages/MSBCertification";
import Introduction from "./pages/Introduction";

import Pledge from "./pages/Pledge";
import PledgeDetail from "./pages/PledgeDetail";
import DeFiRecord from "./pages/DeFiRecord";

import Notice from "./pages/Notice";
import AdminPanel from "./pages/AdminPanel";
import AdminSimple from "./pages/AdminSimple";

function App() {

// ⭐ 前端首次打开自动 guest-login（永久设备ID）
useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) return;

  async function loginGuest() {
    try {
      console.log("开始自动游客登录…");

      // 用浏览器指纹作为永久 UID
      const deviceId = await getBrowserFingerprint();
      console.log("Fingerprint UID:", deviceId);

      const res = await apiFetch("/api/guest-login", {
        method: "POST",
        body: JSON.stringify({ address: deviceId }),
      });

      if (res?.data?.token) {
        localStorage.setItem("token", res.data.token);
        window.refreshAuth();
      }

    } catch (err) {
      console.error("guest-login error:", err);
    }
  }

  loginGuest();
}, []);





  return (
    <Splash>
      <Router>
        <ScrollToTop />
        <Routes>
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

          {/* 其余页面照旧 */}
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
          <Route path="/pledge-detail/:symbol" element={<AuthGate><PledgeDetail /></AuthGate>} />

          {/* 管理员 */}
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin2" element={<AdminSimple />} />

<Route path="*" element={
  <AuthGate>
    <Layout><Home /></Layout>
  </AuthGate>
} />
        </Routes>
      </Router>
    </Splash>
  );
}

export default App;
