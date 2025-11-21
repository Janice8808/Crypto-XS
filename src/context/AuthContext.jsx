import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { getGuestAddress } from "../utils/guest";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);

  axios.defaults.baseURL = "https://pankouhoutai.shop";

  /* ===========================
   * 固定游客模式（地址永远不变）
   * =========================== */
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUserId = localStorage.getItem("userId");
    const savedAddress = localStorage.getItem("guestAddress");

    // ⭐ 如果之前登录过 → 永远用这个账号
    if (savedToken && savedUserId && savedAddress) {
      setToken(savedToken);
      setUserId(savedUserId);
      setAddress(savedAddress);

      axios.defaults.headers.common["Authorization"] = "Bearer " + savedToken;
      setLoadingUserInfo(false);
      return;
    }

    // ⭐ 第一次访问 → 创建固定地址，只生成一次
    const newAddress = getGuestAddress();
    setAddress(newAddress);

    axios.post("/api/guest-login", { address: newAddress })
      .then(res => {
        const d = res.data?.data;
        if (d?.token && d?.userId) {
          localStorage.setItem("token", d.token);
          localStorage.setItem("userId", d.userId);
          localStorage.setItem("guestAddress", newAddress);

          setToken(d.token);
          setUserId(d.userId);

          axios.defaults.headers.common["Authorization"] = "Bearer " + d.token;
        }
      })
      .catch(err => console.error("游客登录失败:", err))
      .finally(() => setLoadingUserInfo(false));
  }, []);

  /* ===========================
   * 读取用户信息
   * =========================== */
  const fetchUserInfo = useCallback(async () => {
    if (!token) return;

    try {
      const res = await axios.get("/api/userinfo");
      setUser(res.data);
    } catch (err) {
      console.error("获取用户信息失败:", err);
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchUserInfo();
  }, [token, fetchUserInfo]);

  /* ===========================
   * 退出（清除固定游客）
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
        refreshUser: fetchUserInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
