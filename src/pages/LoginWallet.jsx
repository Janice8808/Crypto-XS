import { useState, useEffect } from "react";
import SignClient from "@walletconnect/sign-client";

export default function LoginWallet() {
  const [address, setAddress] = useState(null);

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    const cached = localStorage.getItem("walletAddress");
    if (cached) {
      setAddress(cached);
      return;
    }

    const projectId = "c00573959d7652e79f43b3a218cc1c04";

    const client = await SignClient.init({
      projectId,
    });

    const { uri, approval } = await client.connect({
      requiredNamespaces: {
        eip155: {
          methods: ["personal_sign"],
          chains: ["eip155:1", "eip155:8453"],
          events: ["accountsChanged", "chainChanged"],
        },
      },
    });

    // 移动端自动跳钱包
    if (uri && !window.ethereum) {
      window.location.href = `wc:${uri}`;
    }

    // 桌面端无法自动弹出，提示用户使用手机扫码
    if (uri && window.ethereum) {
      alert("请使用手机钱包扫描二维码登录。当前浏览器钱包不支持 WalletConnect v2 自动连接。");
      console.log("WalletConnect URI:", uri);
    }

    const session = await approval();

    const walletAddress =
      session.namespaces.eip155.accounts[0].split(":")[2];

    setAddress(walletAddress);
    localStorage.setItem("walletAddress", walletAddress);

    // ===== nonce =====
    const r1 = await fetch("https://pankouhoutai.shop/api/auth/nonce", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: walletAddress }),
    });

    const { nonce } = await r1.json();

    // ===== sign =====
    const signature = await client.request({
      topic: session.topic,
      chainId: "eip155:1",
      request: {
        method: "personal_sign",
        params: [nonce, walletAddress],
      },
    });

    // ===== verify =====
    const r2 = await fetch("https://pankouhoutai.shop/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: walletAddress, signature }),
    });

    const data = await r2.json();
    console.log("verify 返回数据:", data);

    if (r2.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } else {
      alert("验证失败：" + data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {address ? <p>已连接：{address}</p> : <p>正在连接钱包...</p>}
    </div>
  );
}
