import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* ================= Icons ================= */

const BackIcon = () => (
  <svg width="24" height="24" fill="none" stroke="#666" strokeWidth="1.6" viewBox="0 0 24 24">
    <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AvatarSvg = () => (
  <svg width="48" height="48" viewBox="0 0 48 48">
    <circle cx="24" cy="16" r="10" fill="#F6A623" />
    <ellipse cx="24" cy="38" rx="14" ry="10" fill="#F6A623" opacity="0.6" />
  </svg>
);

const HeadsetIcon = () => (
  <svg width="20" height="20" fill="none" stroke="#F4A623" strokeWidth="1.6" viewBox="0 0 24 24">
    <path d="M4 12a8 8 0 0 1 16 0" />
    <rect x="3" y="12" width="3" height="6" rx="1.5" />
    <rect x="18" y="12" width="3" height="6" rx="1.5" />
  </svg>
);

const AnnouncementIcon = () => (
  <svg width="20" height="20" fill="none" stroke="#2AB673" strokeWidth="1.6" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 16v-1" />
    <path d="M10.5 10a1.5 1.5 0 1 1 2.5 1.2c-.7.5-1 1-1 1.8" />
  </svg>
);

/* ===== 其他菜单图标 ===== */

const MailIcon = () => (
  <svg width="22" height="22" fill="none" stroke="#666" strokeWidth="1.6" viewBox="0 0 24 24">
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="M3 5l9 7 9-7" />
  </svg>
);

const BankIcon = () => (
  <svg width="22" height="22" fill="none" stroke="#666" strokeWidth="1.6" viewBox="0 0 24 24">
    <polygon points="12 3 3 9 21 9" />
    <rect x="4" y="9" width="16" height="10" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="22" height="22" fill="none" stroke="#666" strokeWidth="1.6" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a15 15 0 0 1 0 18" />
  </svg>
);

const LockIcon = () => (
  <svg width="22" height="22" fill="none" stroke="#666" strokeWidth="1.6" viewBox="0 0 24 24">
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M9 11V7a3 3 0 0 1 6 0v4" />
  </svg>
);

const MsbIcon = () => (
  <svg width="22" height="22" fill="none" stroke="#666" strokeWidth="1.6" viewBox="0 0 24 24">
    <polygon points="12 2 20 7 20 17 12 22 4 17 4 7" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

/* =================================================== */

export default function UserCenter() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [uid, setUid] = useState("--");
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  const address = localStorage.getItem("address") || "";

  const clean = address.startsWith("0x") ? address.slice(2) : address;

  const shortAddress =
    clean && clean.length >= 20
      ? `0x${clean.slice(0, 6)}…${clean.slice(-12)}`
      : address || "--";

  // 智能返回函数
  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1)
    } else {
      navigate('/user');// 或者 navigate('/Home')，根据你的首页路径调整
    }
  }

  // 无焦点样式
  const noFocusStyle = {
    outline: 'none',
    boxShadow: 'none',
    border: 'none',
    WebkitTapHighlightColor: 'transparent'
  }

  /* ============== 检查 Token 有效性 ============== */
  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem("token");
      
      // ✅ 更严格的 token 检查
      if (!token || token === "undefined" || token === "null" || token === "Bearer null") {
        console.log("Token invalid, redirecting to Home");
        // ✅ 添加短暂延迟，避免立即跳转
        setTimeout(() => {
          navigate("/Home", { replace: true });
        }, 100);
        return;
      }

      try {
        // ✅ 验证 token 是否真的有效
        const response = await fetch("https://pankouhoutai.shop/api/user/balance", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (!response.ok) {
          throw new Error("Token invalid");
        }

        const data = await response.json();
        if (data?.userId) {
          setUid(data.userId);
        }
      } catch (error) {
        console.log("Token validation failed, redirecting to Home");
        // ✅ Token 验证失败时跳转
        setTimeout(() => {
          navigate("/Home", { replace: true });
        }, 100);
      } finally {
        setIsCheckingToken(false);
      }
    };

    checkTokenValidity();
  }, [navigate]);

  /* ============== 菜单列表 ============== */
  const menuItems = [
    { key: "Mail", icon: <MailIcon />, path: "/user/mail" },
    { key: "Bank card", icon: <BankIcon />, path: "/user/bank" },
    {
      key: "Language",
      icon: <GlobeIcon />,
      right: localStorage.getItem("language") || "English",
      path: "/user/language",
    },
    {
      key: "Withdrawal password setting",
      icon: <LockIcon />,
      path: "/user/change-password",
    },
    { key: "MSB Certification", icon: <MsbIcon />, path: "/user/msb" },
  ];

  // ✅ 如果正在检查 token，显示加载状态
  if (isCheckingToken) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* 添加全局样式来移除所有焦点效果 */}
      <style>
        {`
          .no-focus:focus {
            outline: none !important;
            box-shadow: none !important;
          }
          .no-focus:hover {
            opacity: 0.9;
          }
          .back-button {
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
          }
          .back-button:active {
            opacity: 0.7;
          }
          .menu-item:active {
            background-color: #f3f4f6;
          }
        `}
      </style>

      {/* ⭐ 左侧返回键 - 修复版 */}
      <button
        onClick={handleBack}
        className="back-button no-focus"
        style={{
          background: "none",
          fontSize: 20,
          color: "#666",
          width: "45px",
          textAlign: "left",
          paddingLeft: "12px",
          border: "none",
          cursor: "pointer"
        }}
      >
        ←
      </button>

      {/* 用户信息 */}
      <div className="flex items-center px-5 pb-3">
        <AvatarSvg />

        <div className="ml-3">
          <div className="font-semibold text-gray-800">{shortAddress}</div>
          <div className="text-[#21A179] text-sm">UID: {uid}</div>
        </div>
      </div>

      {/* Online Service + Announcement */}
      <div className="flex gap-3 px-4 mt-2">
        <button
          onClick={() => navigate("/service")}
          className="no-focus flex-1 flex items-center gap-2 bg-[#F5F6FA] rounded-xl py-3 px-4 text-gray-600"
          style={noFocusStyle}
        >
          <HeadsetIcon />
          <span className="text-sm">{t("Online Service")}</span>
        </button>

        <button
          onClick={() => navigate("/announcement")}
          className="no-focus flex-1 flex items-center gap-2 bg-[#F5F6FA] rounded-xl py-3 px-4 text-gray-600"
          style={noFocusStyle}
        >
          <AnnouncementIcon />
          <span className="text-sm">{t("Announcement center")}</span>
        </button>
      </div>

      {/* 下方菜单列表 */}
      <div className="mt-4">
        {menuItems.map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(item.path)}
            className="menu-item no-focus flex justify-between items-center px-5 py-4 border-b cursor-pointer"
            style={noFocusStyle}
          >
            <div className="flex items-center gap-3 text-gray-700">
              {item.icon}
              <span className="text-sm">{t(item.key)}</span>
            </div>

            <div className="flex items-center gap-2">
              {item.right && (
                <span className="text-gray-500 text-sm">
                  {t(item.right) || item.right}
                </span>
              )}
              <span className="text-gray-400 text-xl">›</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}