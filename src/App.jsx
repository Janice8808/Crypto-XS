// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n'; // 👈 引入国际化配置文件

import Layout from './Layout';
import AuthGate from './AuthGate'; // 👈 新增：引入 AuthGate

import Home from './pages/Home';
import Market from './pages/Market';
import CoinDetail from './pages/CoinDetail';
import Trade from './pages/Trade';
import Wallet from './pages/Wallet';
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
const App = () => {
  return (
    <Router>
      {/* 🔐 所有路由统一包在 AuthGate 里 */}
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

          {/* 你后面又写了一个 /coin/:symbol，如果不需要两个，可以删掉一个 */}
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

          {/* 这些你原来就是不包 Layout，我就保持你的设计 */}
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

          {/* ❗ 这里你之前少了一个双引号，已经帮你修好 */}
          <Route path="/user/msb" element={<MSBCertification />} />

          {/* 这里和上面的 /coin/:id 功能有重复，保留一个就可以 */}
          <Route path="/coin/:symbol" element={<CoinDetail />} />
        </Routes>
      </AuthGate>
    </Router>
  );
};

export default App;
