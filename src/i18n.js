// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  English: {
    translation: {
      "User Center": "User Center",
      "Mail": "Mail",
      "Bank Card": "Bank Card",
      "Language": "Language",
      "Submit": "Submit",
    },
  },
  Français: {
    translation: {
      "User Center": "Centre d'utilisateur",
      "Mail": "Courriel",
      "Bank Card": "Carte bancaire",
      "Language": "Langue",
      "Submit": "Soumettre",
    },
  },
  Deutsch: {
    translation: {
      "User Center": "Benutzerzentrum",
      "Mail": "E-Mail",
      "Bank Card": "Bankkarte",
      "Language": "Sprache",
      "Submit": "Einreichen",
    },
  },
  中文繁体: {
    translation: {
      "User Center": "用戶中心",
      "Mail": "郵箱",
      "Bank Card": "銀行卡",
      "Language": "語言",
      "Submit": "提交",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "English", // 默认语言
  fallbackLng: "English",
  interpolation: { escapeValue: false },
});

export default i18n;
