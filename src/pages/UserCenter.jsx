import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* ================= SVG ICONS ================= */

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

/* ====================================================== */

export default function UserCenter() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [uid, setUid] = useState("--");

  const address = localStorage.getItem("address") || "";
  const shortAddress =
    address.length > 10
      ? `${address.slice(0, 6)}....${address.slice(-4)}`
      : address || "--";

  // ⭐ 从后台加载 UID
  useEffect(() => {
    fetch("https://pankouhoutai.shop/api/user/balance", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.userId) setUid(data.userId);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-white pb-20">

      {/* 返回箭头 */}
      <div className="p-4">
        <button onClick={() => navigate(-1)}>
          <BackIcon />
        </button>
      </div>

      {/* 用户头像 + 地址 + UID */}
      <div className="flex items-center px-5 pb-3">
        <AvatarSvg />

        <div className="ml-3">
          <div className="font-semibold text-gray-800">{shortAddress}</div>
          <div className="text-[#21A179] text-sm">UID: {uid}</div>
        </div>
      </div>

      {/* Online + Announcement */}
      <div className="flex gap-3 px-4 mt-2">
        <button
          onClick={() => navigate("/service")}
          className="flex-1 flex items-center gap-2 bg-[#F5F6FA] rounded-xl py-3 px-4 text-gray-600"
        >
          <HeadsetIcon />
          <span className="text-sm">{t("Online Service")}</span>
        </button>

        <button
          onClick={() => navigate("/announcement")}
          className="flex-1 flex items-center gap-2 bg-[#F5F6FA] rounded-xl py-3 px-4 text-gray-600"
        >
          <AnnouncementIcon />
          <span className="text-sm">{t("Announcement center")}</span>
        </button>
      </div>
      {/* 列表 */}
      <div className="mt-4">
        {[
          {
            key: "Mail",
            icon: <MailIcon />,
            path: "/user/mail",
          },
          {
            key: "Bank card",
            icon: <BankIcon />,
            path: "/user/bank",
          },
          {
            key: "Language",
            icon: <GlobeIcon />,
            right: localStorage.getItem("language") || "English",
            path: "/user/language",
          },
          {
            key: "Withdrawal password setting",
            icon: <LockIcon />,
            path: "/user/withdrawal-password",
          },
          {
            key: "MSB Certification",
            icon: <MsbIcon />,
            path: "/user/msb",
          },
        ].map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(item.path)}
            className="flex justify-between items-center px-5 py-4 border-b cursor-pointer active:bg-gray-100"
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
