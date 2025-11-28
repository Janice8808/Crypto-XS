import { useLocation, useNavigate } from "react-router-dom";

export default function useSmartBack() {
  const navigate = useNavigate();
  const location = useLocation();

  // 根据当前路径自动判断 fallback
  const getFallback = () => {
    const path = location.pathname;

    if (path.startsWith("/wallet")) return "/wallet";
    if (path.startsWith("/market")) return "/market";
    if (path.startsWith("/trade")) return "/trade";
    if (path.startsWith("/contract")) return "/contract";
    if (path.startsWith("/me")) return "/me";
    if (path.startsWith("/settings")) return "/settings";

    // 全局兜底 fallback
    return "/";
  };

  return () => {
    try {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate(getFallback());
      }
    } catch (e) {
      navigate(getFallback());
    }
  };
}
