import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

const MailIcon = () => (
  <svg width="20" height="20" fill="none" stroke="#6B7280" strokeWidth="1.6" viewBox="0 0 24 24">
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

const BankIcon = () => (
  <svg width="20" height="20" fill="none" stroke="#6B7280" strokeWidth="1.6" viewBox="0 0 24 24">
    <path d="M2 9l10-6 10 6v2H2z" />
    <path d="M4 11v7h16v-7" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="20" height="20" fill="none" stroke="#6B7280" strokeWidth="1.6" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a15 15 0 0 1 0 18" />
    <path d="M12 3a15 15 0 0 0 0 18" />
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" fill="none" stroke="#6B7280" strokeWidth="1.6" viewBox="0 0 24 24">
    <rect x="4" y="11" width="16" height="9" rx="2" />
    <path d="M8 11V9a4 4 0 0 1 8 0v2" />
  </svg>
);

const MsbIcon = () => (
  <svg width="20" height="20" fill="none" stroke="#6B7280" strokeWidth="1.6" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l2 2" />
  </svg>
);

/* ====================================================== */

export default function UserCenter() {
  const navigate = useNavigate();
  const [uid, setUid] = useState("--");

  const address = localStorage.getItem("address") || "";
  const shortAddress =
    address.length > 10
      ? `${address.slice(0, 6)}....${address.slice(-4)}`
      : address || "--";

  // ⭐ 从 /api/user/balance 读取真实 UID
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
          <span className="text-sm">Online Service</span>
        </button>

        <button
          onClick={() => navigate("/announcement")}
          className="flex-1 flex items-center gap-2 bg-[#F5F6FA] rounded-xl py-3 px-4 text-gray-600"
        >
          <AnnouncementIcon />
          <span className="text-sm">Announcement center</span>
        </button>
      </div>

      {/* 列表 */}
      <div className="mt-4">
        {[
          { name: "Mail", icon: <MailIcon />, path: "/user/mail" },
          { name: "Bank card", icon: <BankIcon />, path: "/user/bank" },
          { name: "Language", icon: <GlobeIcon />, right: "English", path: "/user/language" },
          { name: "Withdrawal password setting", icon: <LockIcon />, path: "/user/withdrawal-password" },
          { name: "MSB Certification", icon: <MsbIcon />, path: "/user/msb" },
        ].map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(item.path)}
            className="flex justify-between items-center px-5 py-4 border-b cursor-pointer active:bg-gray-100"
          >
            <div className="flex items-center gap-3 text-gray-700">
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </div>

            <div className="flex items-center gap-2">
              {item.right && (
                <span className="text-gray-500 text-sm">{item.right}</span>
              )}
              <span className="text-gray-400 text-xl">›</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
