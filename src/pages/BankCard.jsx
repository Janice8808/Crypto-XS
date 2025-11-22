import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function BankCard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    bankName: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.cardNumber || !form.bankName) {
      alert(t("Please fill in all fields"));
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("https://pankouhoutai.shop/api/bankcard", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || t("Bank card submitted successfully!"));
        navigate(-1);
      } else {
        alert(data.error || t("Failed to submit"));
      }
    } catch (err) {
      console.error(err);
      alert(t("Network error, please try again later"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部 */}
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate(-1)} className="text-gray-600 text-xl mr-3">
          ←
        </button>
        <h1 className="text-lg font-semibold text-gray-800">{t("Bank Card")}</h1>
      </div>

      {/* 内容 */}
      <div className="p-5">

        {/* Name */}
        <label className="text-gray-700 font-medium mb-2 block">{t("Name")}</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder={t("Name")}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50"
        />

        {/* Card Number */}
        <label className="text-gray-700 font-medium mb-2 block">{t("Card number")}</label>
        <input
          type="text"
          name="cardNumber"
          value={form.cardNumber}
          onChange={handleChange}
          placeholder={t("Card number")}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50"
        />

        {/* Bank Name */}
        <label className="text-gray-700 font-medium mb-2 block">{t("Bank name")}</label>
        <input
          type="text"
          name="bankName"
          value={form.bankName}
          onChange={handleChange}
          placeholder={t("Bank name")}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50"
        />

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded-lg py-3 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? t("Submitting...") : t("Submit")}
        </Button>
      </div>
    </div>
  );
}
