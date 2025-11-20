import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { requestNonce, verifySignature } from "@/api/auth";

// ⭐ wagmi（支持所有钱包）
import { getWalletClient, getAccount } from "@wagmi/core";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  const [user, setUser] = useState(null);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);

  const [connecting, setConnecting] = useState(false);

  /* ===========================
   *  恢复登录
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

  axios.defaults.baseURL = "https://pankouhoutai.shop";

  /* ===========================
   *  拉取用户信息
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
   *  自动登录（Base + Onchain + 所有钱包）
   * =========================== */
  useEffect(() => {
    async function autoLogin() {
      try {
        const acc = getAccount();
        if (!acc?.address) return;

        const addr = acc.address;
        setAddress(addr);

        const { nonce } = await requestNonce(addr);
        const message = `Login to Pankou - Nonce: ${nonce}`;

        const walletClient = await getWalletClient();
        if (!walletClient) return;

        const signature = await walletClient.signMessage({ message });

        const data = await verifySignature(addr, signature);

        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("address", addr);

        setToken(data.token);
        setUserId(data.userId);
        setAddress(addr);

        axios.defaults.headers.common["Authorization"] =
          "Bearer " + data.token;

        fetchUserInfo();
      } catch (err) {
        console.error("自动登录失败:", err);
      }
    }

    autoLogin();
  }, [fetchUserInfo]);


  /* ===========================
   *  手动连接钱包（备用）
   * =========================== */
  const connectWallet = useCallback(async () => {
    try {
      setConnecting(true);

      const acc = getAccount();
      if (!acc?.address) {
        alert("请先点击页面自动弹出的连接钱包");
        return;
      }

      const addr = acc.address;
      const { nonce } = await requestNonce(addr);
      const message = `Login to Pankou - Nonce: ${nonce}`;

      const walletClient = await getWalletClient();
      const signature = await walletClient.signMessage({ message });

      const data = await verifySignature(addr, signature);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("address", addr);

      setToken(data.token);
      setUserId(data.userId);
      setAddress(addr);

      axios.defaults.headers.common["Authorization"] =
        "Bearer " + data.token;

      fetchUserInfo();
    } catch (err) {
      console.error("Wallet connect error:", err);
      alert("钱包连接失败");
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
        user,
        connecting,
        loadingUserInfo,
        isLoggedIn: !!token && !!userId,

        connectWallet,
        logout,
        refreshUser: fetchUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
