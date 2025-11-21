import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  const [user, setUser] = useState(null);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);

  axios.defaults.baseURL = "https://pankouhoutai.shop";

  /* ===========================
   *  恢复登录（从 localStorage 读取）
   * =========================== */
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUid = localStorage.getItem("userId");
    const savedAddress = localStorage.getItem("walletAddress");

    if (savedToken && savedUid && savedAddress) {
      setToken(savedToken);
      setUserId(savedUid);
      setAddress(savedAddress);

      axios.defaults.headers.common["Authorization"] = "Bearer " + savedToken;
    }

    setLoadingUserInfo(false);
  }, []);

  /* ===========================
   *  拉取用户信息
   * =========================== */
  const fetchUserInfo = useCallback(async () => {
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const res = await axios.get("/api/userinfo");
      setUser(res.data);
    } catch (err) {
      console.error("拉取用户信息失败:", err);
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchUserInfo();
  }, [token, fetchUserInfo]);

  /* ===========================
   *  退出登录
   * =========================== */
  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUserId(null);
    setAddress(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        address,
        user,
        loadingUserInfo,
        isLoggedIn: !!token && !!userId,

        logout,
        refreshUser: fetchUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
