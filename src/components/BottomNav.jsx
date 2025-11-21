import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, BarChart2, LineChart, Wallet, Info } from "lucide-react";

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: <Home size={22} /> },
    { path: "/market", label: "Market", icon: <BarChart2 size={22} /> },

    // ❗ 从 "/coin/BTC" 改成 "/coin-detail"
    { path: "/coin/BTC", label: "Currency", icon: <Info size={22} /> },

    { path: "/trade", label: "Futures", icon: <LineChart size={22} /> },
    { path: "/wallet", label: "Wallets", icon: <Wallet size={22} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow z-50">
      <div className="max-w-5xl mx-auto flex">
        {navItems.map(item => {
          const active =
            location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path));

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex-1 flex flex-col items-center justify-center py-2 text-gray-600 text-xs ${
                active ? "text-orange-500 -translate-y-1" : ""
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
