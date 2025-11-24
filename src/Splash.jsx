import { useEffect, useState } from "react";

export default function Splash({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // 可调时间
    return () => clearTimeout(timer);
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
          src="/logo.png"     // ⭐ 只显示图标
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
