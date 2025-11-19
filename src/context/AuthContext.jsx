import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { requestNonce, verifySignature } from "@/api/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  const [user, setUser] = useState(null); // ⭐ 新增：全局用户信息（avatar, uid, language, address…)
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);

  const [connecting, setConnecting] = useState(false);

  /* ===========================
   *  初始化：从 localStorage 恢复登陆
   * =========================== */
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUid = localStorage.getItem("userId");
    const savedAddress = localStorage.getItem("address");

    if (savedToken && savedUid && savedAddress) {
      setToken(savedToken);
      setUserId(savedUid);
      setAddress(savedAddress);

      axios.defaults.headers.common["Authorization"] = "Bearer " + savedToken;
    }
  }, []);

  /* ===========================
   *  ⭐ 全局 axios 配置
   * =========================== */
   axios.defaults.baseURL = "https://pankouhoutai.shop";

  /* ===========================
   *  ⭐ 自动拉取用户真实信息（avatar, uid…）
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
      console.error("拉取用户信息失败:", err);
      setUser(null);
    } finally {
      setLoadingUserInfo(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);
  
/* ===========================
 *  ⭐ 自动登录：用户进入网站自动检查钱包并登录
 * =========================== */
useEffect(() => {
  async function autoLogin() {
    if (!window.ethereum) return;

    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length === 0) {
        // 用户还没有授权钱包，不弹窗
        return;
      }

      const addr = accounts[0];
      setAddress(addr);

      // 1. 请求 nonce
      const { nonce } = await requestNonce(addr);
      const message = `Login to Pankou - Nonce: ${nonce}`;

      // 2. 签名
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const signature = await signer.signMessage(message);

      // 3. 换 token
      const data = await verifySignature(addr, signature);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("address", addr);

      setToken(data.token);
      setUserId(data.userId);
      setAddress(addr);

      axios.defaults.headers.common["Authorization"] =
        "Bearer " + data.token;

      // 自动拉用户信息
      fetchUserInfo();

    } catch (err) {
      console.error("自动登录失败：", err);
    }
  }

  autoLogin();
}, [fetchUserInfo]);

  /* ===========================
   *  ⭐ 钱包登录（你原来的逻辑保留）
   * =========================== */
  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      alert("请先安装 MetaMask");
      return;
    }

    try {
      setConnecting(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();

      const { nonce } = await requestNonce(addr);
      const message = `Login to Pankou - Nonce: ${nonce}`;
      const signature = await signer.signMessage(message);

      const data = await verifySignature(addr, signature);

      // 保存
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("address", addr);

      setToken(data.token);
      setUserId(data.userId);
      setAddress(addr);

      axios.defaults.headers.common["Authorization"] =
        "Bearer " + data.token;

      // ⭐ 登录成功后立刻拉用户信息
      fetchUserInfo();

    } catch (e) {
      console.error("Wallet connect error:", e);
      alert("钱包登录失败");
    } finally {
      setConnecting(false);
    }
  }, [fetchUserInfo]);

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

        user,               // ⭐ 全局用户信息
        loadingUserInfo,

        connecting,
        isLoggedIn: !!token && !!userId,

        connectWallet,
        logout,
        refreshUser: fetchUserInfo, // ⭐ 页面可主动刷新
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
