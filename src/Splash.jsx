import { useEffect, useState } from "react";

export default function Splash({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // ⭐ 1.5s 后进入首页
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
          flexDirection: "column",
        }}
      >
        <img
          src="/mylogo.png"
          alt="logo"
          style={{ width: 80, height: 80, marginBottom: 20 }}
        />
        <div style={{ color: "#fff", fontSize: 20 }}>crypto.com</div>
      </div>
    );
  }

  return children;
}
