// Layout.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import BottomNav from './components/BottomNav';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideBottomNav = location.pathname === '/trade';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-20">

      {/* 内容区域 */}
      <div className="flex-1 w-full">
        {children}
      </div>

      {/* 底部导航 */}
      {!hideBottomNav && <BottomNav />}
    </div>
  );
};

export default Layout;
