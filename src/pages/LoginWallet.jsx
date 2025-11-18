import { useState } from "react";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { ethers } from "ethers";

export default function LoginWallet() {
  const [address, setAddress] = useState(null);
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: QRCodeModal,
    });

    if (!connector.connected) {
      await connector.createSession();
    }

    connector.on("connect", async (error, payload) => {
      if (error) throw error;

      const { accounts } = payload.params[0];
      const walletAddress = accounts[0];
      setAddress(walletAddress);
      setConnected(true);

      // 1. 请求 nonce
      const resNonce = await fetch("https://crypto-ht.onrender.com/api/auth/nonce");
      const { nonce } = await resNonce.json();

      // 2. 发起签名请求
      const msg = nonce;
      const result = await connector.signPersonalMessage([msg, walletAddress]);

      // 3. 验证签名
      const resVerify = await fetch("https://crypto-ht.onrender.com/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: walletAddress, signature: result }),
      });

      const data = await resVerify.json();
      if (resVerify.ok) {
        localStorage.setItem("token", data.token);
        alert("钱包授权成功 ✅");
      } else {
        alert("验证失败: " + data.error);
      }
    });

    connector.on("disconnect", (error) => {
      if (error) throw error;
      setConnected(false);
      setAddress(null);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-xl font-bold mb-6">Wallet Authorization</h1>

      {connected ? (
        <div className="text-gray-600">已连接：{address}</div>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-yellow-400 px-6 py-2 rounded text-white font-semibold"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
