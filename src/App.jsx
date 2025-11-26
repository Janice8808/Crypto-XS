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

// 下拉刷新包装组件
// 下拉刷新包装组件
const PullToRefreshWrapper = ({ children }) => {
  const refreshContainerRef = useRef(null);
  const refreshIndicatorRef = useRef(null);
  const refreshIconRef = useRef(null);
  
  let startY = 0;
  let currentY = 0;
  let isRefreshing = false;
  const refreshThreshold = 200; // 大幅提高触发阈值到200px

  const handleTouchStart = (e) => {
    if (isRefreshing) return;
    const container = refreshContainerRef.current;
    
    if (container && container.scrollTop === 0) {
      startY = e.touches[0].pageY;
      container.style.transition = 'none';
    }
  };

  const handleTouchMove = (e) => {
    if (isRefreshing) return;
    
    if (startY && refreshContainerRef.current?.scrollTop === 0) {
      currentY = e.touches[0].pageY;
      const diff = currentY - startY;
      
      if (diff > 0) {
        e.preventDefault();
        
        // 进一步降低灵敏度：使用更小的系数和阻力
        const resistance = 0.25; // 更小的系数，增加阻力感
        const pullDistance = Math.min(
          Math.pow(diff * resistance, 0.8), // 使用幂函数增加阻力
          refreshThreshold * 1.1 // 限制最大距离
        );
        
        // 更新图标位置和透明度
        if (refreshIndicatorRef.current) {
          refreshIndicatorRef.current.style.transform = `translateY(${pullDistance}px)`;
        }
        
        // 根据下拉距离更新图标透明度 - 使用非线性变化
        if (refreshIconRef.current) {
          let opacity = 0;
          if (pullDistance > refreshThreshold * 0.5) {
            // 只有在下拉到阈值一半以上时才开始显示
            opacity = Math.pow((pullDistance - refreshThreshold * 0.5) / (refreshThreshold * 0.5), 2) * 0.6;
          }
          refreshIconRef.current.style.opacity = opacity.toString();
          
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
      const resistance = 0.25;
      const effectiveDistance = Math.pow(diff * resistance, 0.8);
      
      // 使用更高的阈值检查
      if (effectiveDistance >= refreshThreshold) {
        startRefresh();
      } else {
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
      {/* 下拉刷新指示器 - 只保留图标，无文字 */}
      <div ref={refreshIndicatorRef} className="refresh-indicator">
        <div ref={refreshIconRef} className="refresh-icon"></div>
      </div>

      {children}
    </div>
  );
};

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