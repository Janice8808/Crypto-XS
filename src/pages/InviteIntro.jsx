import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function InviteIntro() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex justify-center bg-white">
      <div className="w-full max-w-md px-4 pt-4 pb-10 text-[#707070] text-sm leading-relaxed">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-3 text-[18px] text-gray-500"
        >
          ←
        </button>

        {/* Title */}
        <h1 className="text-[16px] font-semibold leading-snug text-[#f6a623] mb-4">
          {t("Invite friends to register and share the 1,000,000 USDT cash prize pool together!")}
        </h1>

        {/* Banner */}
        <img
          src="/images/intro_banner.jpg"
          alt={t("Invite friends promotion banner")}
          className="w-full mb-8"
        />

        {/* Greeting */}
        <p className="mb-2 font-semibold">
          {t("Dear crypto.com users:")}
        </p>

        {/* Intro Paragraph */}
        <p className="mb-4">
          {t("crypto.com has newly launched the contract welfare center, and we look forward to participating in the activity of inviting friends to share the cash prize pool together. Every participating user has the opportunity to get cash rewards, the more friends, the more rewards!")}
        </p>

        {/* Rules */}
        <p className="mb-2 font-semibold">{t("Activity Rules:")}</p>

        <ol className="list-decimal pl-5 space-y-3 mb-6">
          <li>{t("For every new user you invite who completes KYC within 3 days of registration, you can get a 100 U cashback. For every 10 new users you invite who complete KYC verification, you can get an additional 2000 U cashback.")}</li>

          <li>{t("For every new user you invite who completes KYC and completes a contract transaction within 7 days of registration, you can get a 100 U cashback. For every 10 invited users whose single transaction volume exceeds 10,000 USDT, you can get an additional 2000 U cashback.")}</li>

          <li>{t("The total cashback prize pool is 1,000,000 USDT, and it will be distributed on a first-come, first-served basis.")}</li>

          <li>{t("Within 7 days of registration of an invited new user, the first deposit of 1,000 USDT and transfer to the contract account can get 100 U contract experience gold.")}</li>
        </ol>

        {/* Precautions */}
        <p className="mb-2 font-semibold">{t("Precautions:")}</p>

        <ol className="list-decimal pl-5 space-y-3 mb-8">
          <li>{t("Contract trading volume = margin * leverage multiple, excluding account swap volume.")}</li>

          <li>{t("The user's accumulated transaction volume and KYC data may be delayed, and there will be a 48-hour withdrawal time for rewards after the event ends.")}</li>

          <li>{t("Only real-name users can participate in the activity. Duplicate accounts, fake accounts or other cheating and fraudulent activities are prohibited. Once verified, rewards will not be issued; if you use improper methods to get rewards for this event, we will have the right to cancel your award qualification.")}</li>

          <li>{t("crypto.com reserves the right to cancel or modify any activity or activity rules at its own discretion.")}</li>

          <li>{t("For more questions and explanations, contact customer service personnel to receive rewards.")}</li>
        </ol>

        {/* Footer */}
        <p className="mb-1">
          {t("Thank you for your support and trust in crypto.com")}
        </p>

        <p>{t("crypto.com team")}</p>
      </div>
    </div>
  );
}
