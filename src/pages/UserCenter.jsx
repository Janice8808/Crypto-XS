import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* ================= Icons ================= */
// ... 图标组件保持不变

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
      navigate('/')
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
    // ... useEffect 代码保持不变
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
      {/* 添加全局样式 */}
      <style>
        {`
          .no-focus:focus {
            outline: none !important;
            box-shadow: none !important;
          }
          .no-focus:active {
            opacity: 0.7;
          }
          .menu-item:active {
            background-color: #f5f5f5;
          }
        `}
      </style>

      {/* ⭐ 左侧返回键 - 无焦点样式 */}
      <button
        onClick={handleBack}
        className="no-focus"
        style={{
          background: "none",
          fontSize: 20,
          color: "#666",
          width: "45px",
          textAlign: "left",
          paddingLeft: "12px",
          ...noFocusStyle
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

      {/* Online Service + Announcement - 无焦点样式 */}
      <div className="flex gap-3 px-4 mt-2">
        <button
          onClick={() => navigate("/service")}
          className="flex-1 flex items-center gap-2 bg-[#F5F6FA] rounded-xl py-3 px-4 text-gray-600 no-focus"
          style={noFocusStyle}
        >
          <HeadsetIcon />
          <span className="text-sm">{t("Online Service")}</span>
        </button>

        <button
          onClick={() => navigate("/announcement")}
          className="flex-1 flex items-center gap-2 bg-[#F5F6FA] rounded-xl py-3 px-4 text-gray-600 no-focus"
          style={noFocusStyle}
        >
          <AnnouncementIcon />
          <span className="text-sm">{t("Announcement center")}</span>
        </button>
      </div>

      {/* 下方菜单列表 - 无焦点样式 */}
      <div className="mt-4">
        {menuItems.map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(item.path)}
            className="menu-item flex justify-between items-center px-5 py-4 border-b cursor-pointer no-focus"
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