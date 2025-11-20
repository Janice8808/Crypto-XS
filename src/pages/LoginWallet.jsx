import { useEffect, useState } from "react";
import SignClient from "@walletconnect/sign-client";
import { WalletConnectModal } from "@walletconnect/modal";

const projectId = "c00573959d7652e79f43b3a218cc1c04";

const modal = new WalletConnectModal({
  projectId,
  themeMode: "dark",
});

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

    const client = await SignClient.init({ projectId });

    const { uri, approval } = await client.connect({
      requiredNamespaces: {
        eip155: {
          methods: ["personal_sign"],
          chains: ["eip155:1"],
          events: ["accountsChanged", "chainChanged"],
        },
      },
    });

    // 关键！弹出钱包选择器（手机也会自动 deep link）
    if (uri) {
      await modal.openModal({ uri });
    }

    const session = await approval();

    modal.closeModal();

    const walletAddress =
      session.namespaces.eip155.accounts[0].split(":")[2];

    setAddress(walletAddress);
    localStorage.setItem("walletAddress", walletAddress);

    // ===== 后端 nonce =====
    const r1 = await fetch("https://pankouhoutai.shop/api/auth/nonce", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: walletAddress }),
    });

    const { nonce } = await r1.json();

    // ===== 签名 =====
    const signature = await client.request({
      topic: session.topic,
      chainId: "eip155:1",
      request: {
        method: "personal_sign",
        params: [nonce, walletAddress],
      },
    });

    // ===== 后端 verify =====
    const r2 = await fetch("https://pankouhoutai.shop/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: walletAddress, signature }),
    });

    const data = await r2.json();

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
