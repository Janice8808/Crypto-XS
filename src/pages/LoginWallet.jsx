import { useEffect } from "react";

export default function LoginWallet() {
  useEffect(() => {
    // 进入页面立即跳转首页
    window.location.href = "/";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>正在跳转...</p>
    </div>
  );
}
