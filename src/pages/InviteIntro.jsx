// src/pages/InviteIntro.jsx
import { useNavigate } from "react-router-dom";

export default function InviteIntro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center bg-white">
      {/* 中间这块相当于手机屏 */}
      <div className="w-full max-w-md px-4 pt-4 pb-10 text-[#707070] text-sm leading-relaxed">
        {/* 返回箭头 */}
        <button
          onClick={() => navigate(-1)}
          className="mb-3 text-[18px] text-gray-500"
        >
          ←
        </button>

        {/* 标题 */}
        <h1 className="text-[16px] font-semibold leading-snug text-[#f6a623] mb-4">
          Invite friends to register and share the 1,000,000 USDT cash prize
          pool together!
        </h1>

        {/* 顶部 banner 图 */}
        <img
          src="/images/intro_banner.jpg"
          alt="Invite friends promotion banner"
          className="w-full mb-8"
        />

        {/* 正文 */}
        <p className="mb-2 font-semibold">Dear crypto.com users:</p>

        <p className="mb-4">
          crypto.com has newly launched the contract welfare center, and we look
          forward to participating in the activity of inviting friends to share
          the cash prize pool together. Every participating user has the
          opportunity to get cash rewards, the more friends, the more rewards!
        </p>

        {/* Activity Rules */}
        <p className="mb-2 font-semibold">Activity Rules:</p>

        <ol className="list-decimal pl-5 space-y-3 mb-6">
          <li>
            For every new user you invite who completes KYC within 3 days of
            registration, you can get a 100 U cashback. For every 10 new users
            you invite who complete KYC verification, you can get an additional
            2000 U cashback.
          </li>
          <li>
            For every new user you invite who completes KYC and completes a
            contract transaction within 7 days of registration, you can get a
            100 U cashback. For every 10 invited users whose single transaction
            volume exceeds 10,000 USDT, you can get an additional 2000 U
            cashback.
          </li>
          <li>
            The total cashback prize pool is 1,000,000 USDT, and it will be
            distributed on a first-come, first-served basis.
          </li>
          <li>
            Within 7 days of registration of an invited new user, the first
            deposit of 1,000 USDT and transfer to the contract account can get
            100 U contract experience gold.
          </li>
        </ol>

        {/* Precautions */}
        <p className="mb-2 font-semibold">Precautions:</p>

        <ol className="list-decimal pl-5 space-y-3 mb-8">
          <li>
            Contract trading volume = margin * leverage multiple, excluding
            account swap volume.
          </li>
          <li>
            The user's accumulated transaction volume and KYC data may be
            delayed, and there will be a 48-hour withdrawal time for rewards
            after the event ends.
          </li>
          <li>
            Only real-name users can participate in the activity. Duplicate
            accounts, fake accounts or other cheating and fraudulent activities
            are prohibited. Once verified, rewards will not be issued; if you
            use improper methods to get rewards for this event, we will have the
            right to cancel your award qualification.
          </li>
          <li>
            crypto.com reserves the right to cancel or modify any activity or
            activity rules at its own discretion.
          </li>
          <li>
            For more questions and explanations, contact customer service
            personnel to receive rewards.
          </li>
        </ol>

        {/* 底部文案 */}
        <p className="mb-1">
          Thank you for your support and trust in crypto.com
        </p>
        <p>crypto.com team</p>
      </div>
    </div>
  );
}
