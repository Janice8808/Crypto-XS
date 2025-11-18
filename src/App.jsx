import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import AuthGate from "./AuthGate";

// pages
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
import AdminPanel from "./pages/AdminPanel";
import Introduction from "./pages/Introduction";
import Pledge from "./pages/Pledge";
import DeFiRecord from "./pages/DeFiRecord";
import LoginWallet from "./pages/LoginWallet";

function App() {
  return (
    <Router>

      {/* 🚪 登录页不需要 AuthGate */}
      <Routes>
        <Route path="/loginwallet" element={<LoginWallet />} />
      </Routes>

      {/* 🔐 已登录内容全部在 AuthGate 里 */}
      <AuthGate>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          <Route
            path="/market"
            element={
              <Layout>
                <Market />
              </Layout>
            }
          />

          <Route
            path="/coin/:id"
            element={
              <Layout>
                <CoinDetail />
              </Layout>
            }
          />

          <Route
            path="/trade"
            element={
              <Layout>
                <Trade />
              </Layout>
            }
          />

          <Route
            path="/wallet"
            element={
              <Layout>
                <Wallet />
              </Layout>
            }
          />

          {/* 不带 Layout 的保持不变 */}
          <Route path="/asset/:symbol" element={<AssetDetail />} />
          <Route path="/wallet/:symbol/deposit" element={<Deposit />} />
          <Route path="/wallet/:symbol/withdraw" element={<Withdraw />} />
          <Route path="/deposit1" element={<Deposit1 />} />
          <Route path="/withdraw1" element={<Withdraw1 />} />
          <Route path="/buycrypto1" element={<BuyCrypto1 />} />
          <Route path="/deposit/:symbol" element={<Deposit />} />
          <Route path="/withdraw/:symbol" element={<Withdraw />} />
          <Route path="/coin/:symbol" element={<CoinDetail />} />

          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/user" element={<UserCenter />} />
          <Route path="/user/mail" element={<Mail />} />
          <Route path="/user/bank" element={<BankCard />} />
          <Route path="/user/language" element={<Language />} />
          <Route path="/user/withdrawal-password" element={<WithdrawalPassword />} />
          <Route path="/intro" element={<Introduction />} />
          <Route path="/defi" element={<Pledge />} />
          <Route path="/defi-record" element={<DeFiRecord />} />
          <Route path="/user/msb" element={<MSBCertification />} />
        </Routes>
      </AuthGate>

    </Router>
  );
}

// ⭐⭐ 必须有这个！！！
// Cloudflare 的报错就是因为你缺了它
export default App;
