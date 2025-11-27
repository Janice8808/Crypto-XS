// src/App.jsx
import React, { useEffect, useState, useRef } from "react";
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
import EditWithdrawalPassword from "./pages/EditWithdrawalPassword";
import { detectWalletAddress } from "./utils/walletDetect";

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
import ChangePassword from "./pages/ChangePassword";
import MSBCertification from "./pages/MSBCertification";
import Introduction from "./pages/Introduction";

import Pledge from "./pages/Pledge";
import PledgeDetail from "./pages/PledgeDetail";
import DeFiRecord from "./pages/DeFiRecord";

import Notice from "./pages/Notice";
import AdminPanel from "./pages/AdminPanel";
import AdminSimple from "./pages/AdminSimple";

// 下拉刷新包装组件 - 极低灵敏度版本
const PullToRefreshWrapper = ({ children }) => {
  const refreshContainerRef = useRef(null);
  const refreshIndicatorRef = useRef(null);
  const refreshIconRef = useRef(null);
  
  let startY = 0;
  let currentY = 0;
  let isRefreshing = false;
  const refreshThreshold = 350; // 极高触发阈值 - 需要下拉350px

  const handleTouchStart = (e) => {
    if (isRefreshing) return;
    const container = refreshContainerRef.current;
    
    // 只有在页面最顶部时才启用下拉刷新
    if (container && container.scrollTop <= 0) {
      startY = e.touches[0].pageY;
      container.style.transition = 'none';
    }
  };

  const handleTouchMove = (e) => {
    if (isRefreshing) return;
    
    if (startY && refreshContainerRef.current?.scrollTop <= 0) {
      currentY = e.touches[0].pageY;
      const diff = currentY - startY;
      
      // 只有在下拉时才处理
      if (diff > 0) {
        // 阻止默认行为，禁用浏览器下拉刷新
        e.preventDefault();
        
        // 极强的阻力效果
        const resistance = 0.15; // 极小的系数
        // 使用平方函数增加阻力，下拉越多阻力越大
        const pullDistance = Math.min(
          Math.pow(diff * resistance, 0.6),
          refreshThreshold * 1.05
        );
        
        // 更新指示器位置
        if (refreshIndicatorRef.current) {
          refreshIndicatorRef.current.style.transform = `translateY(${pullDistance}px)`;
        }
        
        // 非常缓慢的图标显示 - 只有在下拉很远后才开始显示
        if (refreshIconRef.current) {
          let opacity = 0;
          if (pullDistance > refreshThreshold * 0.7) { // 70%阈值后才开始显示
            opacity = Math.pow(
              (pullDistance - refreshThreshold * 0.7) / (refreshThreshold * 0.3), 
              2
            ) * 0.8;
          }
          refreshIconRef.current.style.opacity = opacity.toString();
          
          // 图标颜色渐变
          if (pullDistance > refreshThreshold * 0.8) {
            refreshIconRef.current.style.borderColor = `rgba(100, 108, 255, ${opacity})`;
            refreshIconRef.current.style.borderTopColor = 'transparent';
          }
          
          // 准备状态
          if (pullDistance >= refreshThreshold) {
            refreshIndicatorRef.current?.classList.add('ready');
          } else {
            refreshIndicatorRef.current?.classList.remove('ready');
          }
        }
      }
    }
  };

  const handleTouchEnd = () => {
    if (isRefreshing) return;
    
    if (startY) {
      const diff = currentY - startY;
      const resistance = 0.15;
      const effectiveDistance = Math.pow(diff * resistance, 0.6);
      
      console.log(`下拉距离: ${diff}px, 有效距离: ${effectiveDistance.toFixed(1)}px, 阈值: ${refreshThreshold}px`);
      
      // 只有达到极高阈值才触发刷新
      if (effectiveDistance >= refreshThreshold) {
        console.log("触发刷新");
        startRefresh();
      } else {
        console.log("未达到刷新阈值，复位");
        resetRefresh();
      }
      
      startY = 0;
      currentY = 0;
    }
  };

  const startRefresh = () => {
    isRefreshing = true;
    refreshIndicatorRef.current?.classList.add('refreshing');
    
    if (refreshIndicatorRef.current) {
      refreshIndicatorRef.current.style.transform = `translateY(${refreshThreshold}px)`;
    }

    // 刷新页面数据
    setTimeout(() => {
      completeRefresh();
    }, 1500);
  };

  const completeRefresh = () => {
    isRefreshing = false;
    refreshIndicatorRef.current?.classList.remove('refreshing', 'ready');
    
    // 触发全局刷新
    window.dispatchEvent(new CustomEvent('refreshData'));
    
    setTimeout(() => {
      if (refreshIndicatorRef.current) {
        refreshIndicatorRef.current.style.transform = 'translateY(-100%)';
      }
      if (refreshIconRef.current) {
        refreshIconRef.current.style.opacity = '0';
        refreshIconRef.current.style.borderColor = 'rgba(100, 108, 255, 0)';
      }
    }, 300);
  };

  const resetRefresh = () => {
    if (refreshIndicatorRef.current) {
      refreshIndicatorRef.current.style.transform = 'translateY(-100%)';
    }
    refreshIndicatorRef.current?.classList.remove('ready');
    if (refreshIconRef.current) {
      refreshIconRef.current.style.opacity = '0';
      refreshIconRef.current.style.borderColor = 'rgba(100, 108, 255, 0)';
    }
  };

  return (
    <div 
      ref={refreshContainerRef}
      className="refresh-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 下拉刷新指示器 - 极隐蔽 */}
      <div ref={refreshIndicatorRef} className="refresh-indicator">
        <div ref={refreshIconRef} className="refresh-icon"></div>
      </div>

      {children}
    </div>
  );
};

function App() {
// ⭐ 前端首次打开 → 自动检测 Base/Onchain 钱包地址 登录
useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) return;

  async function autoWalletLogin() {
    try {
      console.log("开始检测钱包地址…");

      // 检测钱包地址（无授权）
      const addr = await detectWalletAddress();

      // （A）检测到了钱包地址 → 用钱包地址当账号
      if (addr) {
        console.log("检测到钱包地址:", addr);

        const res = await apiFetch("/api/guest-login", {
          method: "POST",
          body: JSON.stringify({ address: addr }), // 你的后端就是用 address 作为账号ID
        });

        if (res?.data?.token) {
          localStorage.setItem("token", res.data.token);
          window.refreshAuth();
          return;
        }
      }

      // （B）如果没检测到钱包 → 回退到 fingerprint
      console.log("未检测到钱包，回退到 fingerprint 登录");

      const deviceId = await getBrowserFingerprint();

      const fallback = await apiFetch("/api/guest-login", {
        method: "POST",
        body: JSON.stringify({ address: deviceId }),
      });

      if (fallback?.data?.token) {
        localStorage.setItem("token", fallback.data.token);
        window.refreshAuth();
      }

    } catch (err) {
      console.error("wallet-login error:", err);
    }
  }

  autoWalletLogin();
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
                <PullToRefreshWrapper>
                  <Layout><Home /></Layout>
                </PullToRefreshWrapper>
              </AuthGate>
            }
          />

          <Route
            path="/market"
            element={
              <AuthGate>
                <PullToRefreshWrapper>
                  <Layout><Market /></Layout>
                </PullToRefreshWrapper>
              </AuthGate>
            }
          />

          <Route
            path="/coin/:symbol"
            element={
              <AuthGate>
                <PullToRefreshWrapper>
                  <Layout><CoinDetail /></Layout>
                </PullToRefreshWrapper>
              </AuthGate>
            }
          />
<Route
  path="/user/change-password"
  element={
    <AuthGate>
      <PullToRefreshWrapper>
        <ChangePassword />
      </PullToRefreshWrapper>
    </AuthGate>
  }
/>
<Route
  path="/user/withdrawal-password/edit"
  element={
    <AuthGate>
      <PullToRefreshWrapper>
        <EditWithdrawalPassword />
      </PullToRefreshWrapper>
    </AuthGate>
  }
/>

          <Route
            path="/trade"
            element={
              <AuthGate>
                <PullToRefreshWrapper>
                  <Layout><Trade /></Layout>
                </PullToRefreshWrapper>
              </AuthGate>
            }
          />

          <Route
            path="/wallet"
            element={
              <AuthGate>
                <PullToRefreshWrapper>
                  <Layout><Wallet /></Layout>
                </PullToRefreshWrapper>
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
              <PullToRefreshWrapper>
                <Layout><Home /></Layout>
              </PullToRefreshWrapper>
            </AuthGate>
          } />
        </Routes>
      </Router>
    </Splash>
  );
}

export default App;