import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "English": {
    translation: {
      "User Center": "User Center",
      "Mail": "Mail",
      "Bank Card": "Bank Card",
      "Language": "Language",
      "Submit": "Submit",
    },
  },

  "Français": {
    translation: {
      "User Center": "Centre d'utilisateur",
      "Mail": "Courriel",
      "Bank Card": "Carte bancaire",
      "Language": "Langue",
      "Submit": "Soumettre",
    },
  },

  "Deutsch": {
    translation: {
      "User Center": "Benutzerzentrum",
      "Mail": "E-Mail",
      "Bank Card": "Bankkarte",
      "Language": "Sprache",
      "Submit": "Einreichen",
    },
  },

  "Italiano": {
    translation: {
      "User Center": "Centro Utente",
      "Mail": "Posta",
      "Bank Card": "Carta bancaria",
      "Language": "Lingua",
      "Submit": "Invia",
    },
  },

  "한국어": {
    translation: {
      "User Center": "사용자 센터",
      "Mail": "메일",
      "Bank Card": "은행 카드",
      "Language": "언어",
      "Submit": "제출",
    },
  },

  "日本語": {
    translation: {
      "User Center": "ユーザーセンター",
      "Mail": "メール",
      "Bank Card": "銀行カード",
      "Language": "言語",
      "Submit": "送信",
    },
  },

  "中文繁体": {
    translation: {
      "User Center": "用戶中心",
      "Mail": "郵箱",
      "Bank Card": "銀行卡",
      "Language": "語言",
      "Submit": "提交",
    },
  },

  "中文简体": {
    translation: {
      "User Center": "用户中心",
      "Mail": "邮箱",
      "Bank Card": "银行卡",
      "Language": "语言",
      "Submit": "提交",
    },
  },

  "ภาษาไทย": {
    translation: {
      "User Center": "ศูนย์ผู้ใช้",
      "Mail": "อีเมล",
      "Bank Card": "บัตรธนาคาร",
      "Language": "ภาษา",
      "Submit": "ยืนยัน",
    },
  },

  "Tiếng Việt": {
    translation: {
      "User Center": "Trung tâm người dùng",
      "Mail": "Thư",
      "Bank Card": "Thẻ ngân hàng",
      "Language": "Ngôn ngữ",
      "Submit": "Gửi",
    },
  },

  "español": {
    translation: {
      "User Center": "Centro de usuario",
      "Mail": "Correo",
      "Bank Card": "Tarjeta bancaria",
      "Language": "Idioma",
      "Submit": "Enviar",
    },
  },

  "Türkçe": {
    translation: {
      "User Center": "Kullanıcı Merkezi",
      "Mail": "Posta",
      "Bank Card": "Banka Kartı",
      "Language": "Dil",
      "Submit": "Gönder",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "English",
  fallbackLng: "English",
  interpolation: { escapeValue: false },
});

export default i18n;
