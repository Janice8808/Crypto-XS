// src/pages/LoginWallet.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function LoginWallet() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 如果已经登录 → 直接去首页，不弹钱包
    if (token) {
      window.location.replace("/");
      return;
    }

    // 没登录 → 自动弹钱包
    loginWithWallet();
  }, []);

  async function loginWithWallet() {
    try {
      if (!window.ethereum) {
        alert("Please open this using Bace browser.");
        return;
      }

      // ① 请求账户（自动弹出钱包）
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const address = accounts[0];
      if (!address) return;

      // ② 拿 nonce
      const nonceRes = await axios.post(
        "https://pankouhoutai.shop/api/auth/nonce",
        { address }
      );

      const nonce = nonceRes.data.nonce;

      // ③ 钱包签名
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [nonce, address],
      });

      // ④ 提交登录
      const loginRes = await axios.post(
        "https://pankouhoutai.shop/api/auth/verify",
        { address, signature }
      );

      const { token, userId, address: wallet } = loginRes.data;

      // ⑤ 保存登录状态
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("walletAddress", wallet);

      // ⑥ 登录成功进入首页
      window.location.replace("/");
    } catch (err) {
      console.error(err);
      alert("Wallet authorization failed, please try again.");
      setLoading(false); // 停止 loading，避免死循环
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-black">
      {loading ? (
        <p>Waiting for wallet authorization. Please click "Confirm" in your wallet...</p>
      ) : (
        <button
          onClick={loginWithWallet}
          className="px-6 py-3 bg-blue-500 rounded"
        >
          Reauthorize login
        </button>
      )}
    </div>
  );
}
