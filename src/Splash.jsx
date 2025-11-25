import { useEffect, useState } from "react";

export default function Splash({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 检查是否已经显示过启动页
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    
    if (hasSeenSplash) {
      // 如果已经显示过，立即隐藏启动页
      setLoading(false);
    } else {
      // 第一次显示，设置计时器并标记为已显示
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("hasSeenSplash", "true");
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "#0d0f15",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="/logo.png"
          alt="logo"
          style={{
            width: 90,
            height: 90,
            objectFit: "contain",
          }}
        />
      </div>
    );
  }

  return children;
}