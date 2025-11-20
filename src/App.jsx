// App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./i18n";
import { useAppKit } from "@reown/appkit/react";

// 公共组件
import Layout from "./Layout";
import AuthGate from "./AuthGate";

// 页面
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
  const appKit = useAppKit();

  // ============== 自动弹出连接钱包（无 token 时自动执行） ==============
  useEffect(() => {
    const token = localStorage.getItem("token");

    // 没有登录状态才弹出钱包选择
    if (!token) {
      setTimeout(() => {
        try {
          appKit.open();
        } catch (err) {
          console.error("Wallet modal open error:", err);
        }
      }, 300); // 稍微延迟避免 UI 卡住
    }
  }, [appKit]);
  // =====================================================================

  return (
    <Router>
      <Routes>

        {/* 不需要登录的路由 */}
        <Route path="/loginwallet" element={<LoginWallet />} />

        {/* 需要登录的路由（带 Layout） */}
        <Route
          path="/"
          element={
            <AuthGate>
              <Layout>
                <Home />
              </Layout>
            </AuthGate>
          }
        />

        <Route
          path="/market"
          element={
            <AuthGate>
              <Layout>
                <Market />
              </Layout>
            </AuthGate>
          }
        />

        <Route
          path="/coin/:symbol"
          element={
            <AuthGate>
              <Layout>
                <CoinDetail />
              </Layout>
            </AuthGate>
          }
        />

        <Route
          path="/trade"
          element={
            <AuthGate>
              <Layout>
                <Trade />
              </Layout>
            </AuthGate>
          }
        />

        <Route
          path="/wallet"
          element={
            <AuthGate>
              <Layout>
                <Wallet />
              </Layout>
            </AuthGate>
          }
        />

        {/* 不带 Layout 的页面 */}
        <Route path="/asset/:symbol" element={<AuthGate><AssetDetail /></AuthGate>} />
        <Route path="/wallet/:symbol/deposit" element={<AuthGate><Deposit /></AuthGate>} />
        <Route path="/wallet/:symbol/withdraw" element={<AuthGate><Withdraw /></AuthGate>} />

        <Route path="/deposit1" element={<AuthGate><Deposit1 /></AuthGate>} />
        <Route path="/withdraw1" element={<AuthGate><Withdraw1 /></AuthGate>} />
        <Route path="/buycrypto1" element={<AuthGate><BuyCrypto1 /></AuthGate>} />

        <Route path="/admin" element={<AuthGate><AdminPanel /></AuthGate>} />

        <Route path="/user" element={<AuthGate><UserCenter /></AuthGate>} />
        <Route path="/user/mail" element={<AuthGate><Mail /></AuthGate>} />
        <Route path="/user/bank" element={<AuthGate><BankCard /></AuthGate>} />
        <Route path="/user/language" element={<AuthGate><Language /></AuthGate>} />
        <Route path="/user/withdrawal-password" element={<AuthGate><WithdrawalPassword /></AuthGate>} />
        <Route path="/intro" element={<AuthGate><Introduction /></AuthGate>} />

        <Route path="/defi" element={<AuthGate><Pledge /></AuthGate>} />
        <Route path="/defi-record" element={<AuthGate><DeFiRecord /></AuthGate>} />

        <Route path="/user/msb" element={<AuthGate><MSBCertification /></AuthGate>} />

        {/* 没匹配的全部重定向到首页 */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;
