import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { getGuestAddress } from "../utils/guest";   // ⭐ 新增

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  const [user, setUser] = useState(null);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);

  axios.defaults.baseURL = "https://pankouhoutai.shop";

  /* ===========================
   *  启动时自动恢复 / 创建游客账号（固定账号版）
   * =========================== */
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUid = localStorage.getItem("userId");

    if (savedToken && savedUid) {
      // 已有 token → 直接使用旧账号
      setToken(savedToken);
      setUserId(savedUid);
      axios.defaults.headers.common["Authorization"] = "Bearer " + savedToken;

      setLoadingUserInfo(false);
      return;
    }

    // ⭐ 没有 token → 使用固定 guestAddress 登录（不再创建新账号）
    const guestAddress = getGuestAddress();

    axios.post("/api/guest-login", { address: guestAddress })
      .then(res => {
        const d = res.data?.data;

        if (d?.token && d?.userId) {
          localStorage.setItem("token", d.token);
          localStorage.setItem("userId", d.userId);

          setToken(d.token);
          setUserId(d.userId);

          axios.defaults.headers.common["Authorization"] = "Bearer " + d.token;
        }
      })
      .catch(err => {
        console.error("游客账号创建失败:", err);
      })
      .finally(() => {
        setLoadingUserInfo(false);
      });
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
    const isAdminPage = window.location.pathname.startsWith("/admin");
    if (isAdminPage) {
      setLoadingUserInfo(false);
      return;
    }

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
