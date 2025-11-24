import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);

  axios.defaults.baseURL = "https://pankouhoutai.shop";

  /* ===========================
   * Token 变化时 → 更新 axios header
   * =========================== */
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  /* ===========================
   * 拉取用户信息
   * =========================== */
  const fetchUserInfo = useCallback(async () => {
    if (!token) {
      setUser(null);
      setLoadingUserInfo(false);
      return;
    }

    try {
      const res = await axios.get("/api/userinfo");
      setUser(res.data);
    } catch (err) {
      console.error("获取用户信息失败:", err);
      setUser(null);
    } finally {
      setLoadingUserInfo(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  /* ===========================
   * 退出登录
   * =========================== */
  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
  };

  /* ===========================
   * 全局刷新入口（提供给 App.jsx 使用）
   * =========================== */
  useEffect(() => {
    window.refreshAuth = () => {
      const newToken = localStorage.getItem("token") || null;
      setToken(newToken);
      fetchUserInfo();
    };
  }, [fetchUserInfo]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loadingUserInfo,
        isLoggedIn: !!token,
        logout,
        refreshUser: fetchUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
