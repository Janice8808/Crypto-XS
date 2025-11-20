// src/web3Config.jsx
import { mainnet, base } from "viem/chains";
import { createConfig, http } from "wagmi";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createAppKit } from "@reown/appkit/react";

const queryClient = new QueryClient();

// ⭐ 使用 wagmi 官方 createConfig（不是 AppKit）
export const wagmiConfig = createConfig({
  chains: [mainnet, base],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
  ssr: false,
});

// ⭐ AppKit UI 初始化
createAppKit({
  projectId: "c00573959d7652e79f43b3a218cc1c04",
  wagmiConfig,
  metadata: {
    name: "Pankou Wallet Login",
    description: "Pankou dApp Wallet Connect",
    url: "https://ceshipankou.shop",
    icons: ["https://ceshipankou.shop/logo.png"],
  },
  features: {
    analytics: true,
  },
  theme: "dark",
});

// ⭐ Provider 组件
export const Web3Provider = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
  </QueryClientProvider>
);
