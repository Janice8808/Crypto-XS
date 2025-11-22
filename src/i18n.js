// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

/* ------------------ 所有界面通用 Key（英文默认） ------------------ */
const commonKeys = {
  "Loading": "Loading",
  "Price": "Price",
  "Unavailable": "Unavailable",
  "Available": "Available",
  "Frozen": "Frozen",
  "Equivalent (USDT)": "Equivalent (USDT)",
  "Financial records": "Financial records",
  "Temporarily no data": "Temporarily no data",
  "Deposit": "Deposit",
  "Withdraw": "Withdraw",

  /* BuyCrypto / Wallet */
  "Buy Crypto": "Buy Crypto",
  "Money": "Money",
  "Submit order": "Submit order",

  /* Bank card */
  "Bank card": "Bank card",
  "Name": "Name",
  "Card number": "Card number",
  "Bank name": "Bank name",

  /* Navigation / common UI */
  "User Center": "User Center",
  "Mail": "Mail",
  "Language": "Language",
  "Submit": "Submit",

  /* Notice */
  "Notice": "Notice",
  "No notification record": "No notification record",

  /* Home */
  "Popular list": "Popular list",
  "Symbol": "Symbol",
  "Latest Price": "Latest Price",
  "24h": "24h",

  /* errors */
  "Please fill in all fields": "Please fill in all fields",
  "Network error, please try again later": "Network error, please try again later",

  /* ===== CoinDetail 新增文案（英文基准） ===== */
  "Buy": "Buy",
  "Sell": "Sell",
  "Limit Order": "Limit Order",
  "Market Order": "Market Order",
  "Enter Quantity": "Enter Quantity",
  "Order Success": "Order Success",
  "Order Failed": "Order Failed",
  "Turnover": "Turnover",
  "Submitting": "Submitting...",
  "No Order": "No delegated order",
};

/* ------------------ 多语言翻译资源库 ------------------ */

const resources = {
  /* ========== English ========== */
  "English": { translation: { ...commonKeys } },

  /* ========== French ========== */
  "Français": {
    translation: {
      ...commonKeys,

      "Loading": "Chargement",
      "Price": "Prix",
      "Unavailable": "Indisponible",
      "Available": "Disponible",
      "Frozen": "Gelé",
      "Equivalent (USDT)": "Équivalent (USDT)",
      "Financial records": "Dossiers financiers",
      "Temporarily no data": "Pas de données",
      "Deposit": "Dépôt",
      "Withdraw": "Retrait",

      "Buy Crypto": "Acheter des cryptos",
      "Money": "Argent",
      "Submit order": "Soumettre la commande",

      "Bank card": "Carte bancaire",
      "Name": "Nom",
      "Card number": "Numéro de carte",
      "Bank name": "Nom de la banque",

      "Notice": "Avis",
      "No notification record": "Aucun enregistrement",
      "Popular list": "Liste populaire",
      "Symbol": "Symbole",
      "Latest Price": "Dernier prix",
      "24h": "24h",

      "Please fill in all fields": "Veuillez remplir tous les champs",
      "Network error, please try again later": "Erreur réseau, réessayez plus tard",

      /* CoinDetail */
      "Buy": "Acheter",
      "Sell": "Vendre",
      "Limit Order": "Ordre limite",
      "Market Order": "Ordre au marché",
      "Enter Quantity": "Saisir la quantité",
      "Order Success": "Ordre passé avec succès",
      "Order Failed": "Échec de l'ordre",
      "Turnover": "Montant",
      "Submitting": "Envoi...",
      "No Order": "Aucun ordre en attente",
    }
  },

  /* ========== German ========== */
  "Deutsch": {
    translation: {
      ...commonKeys,

      "Loading": "Laden",
      "Price": "Preis",
      "Unavailable": "Nicht verfügbar",
      "Available": "Verfügbar",
      "Frozen": "Eingefroren",
      "Equivalent (USDT)": "Gegenwert (USDT)",
      "Financial records": "Finanzunterlagen",
      "Temporarily no data": "Keine Daten",
      "Deposit": "Einzahlen",
      "Withdraw": "Abheben",

      "Buy Crypto": "Krypto kaufen",
      "Money": "Geld",
      "Submit order": "Bestellung einreichen",

      "Bank card": "Bankkarte",
      "Name": "Name",
      "Card number": "Kartennummer",
      "Bank name": "Bankname",

      "Notice": "Benachrichtigungen",
      "No notification record": "Keine Benachrichtigungen",
      "Popular list": "Beliebte Liste",
      "Symbol": "Symbol",
      "Latest Price": "Aktueller Preis",
      "24h": "24h",

      "Please fill in all fields": "Bitte alle Felder ausfüllen",
      "Network error, please try again later": "Netzwerkfehler, bitte später erneut versuchen",

      /* CoinDetail */
      "Buy": "Kaufen",
      "Sell": "Verkaufen",
      "Limit Order": "Limitauftrag",
      "Market Order": "Marktauftrag",
      "Enter Quantity": "Menge eingeben",
      "Order Success": "Order erfolgreich",
      "Order Failed": "Order fehlgeschlagen",
      "Turnover": "Umsatz",
      "Submitting": "Wird gesendet...",
      "No Order": "Keine offenen Orders",
    }
  },

  /* ========== Italian ========== */
  "Italiano": {
    translation: {
      ...commonKeys,

      "Loading": "Caricamento",
      "Price": "Prezzo",
      "Unavailable": "Non disponibile",
      "Available": "Disponibile",
      "Frozen": "Congelato",
      "Equivalent (USDT)": "Equivalente (USDT)",
      "Financial records": "Registrazioni finanziarie",
      "Temporarily no data": "Nessun dato",
      "Deposit": "Deposito",
      "Withdraw": "Prelievo",

      "Buy Crypto": "Compra Crypto",
      "Money": "Denaro",
      "Submit order": "Invia ordine",

      "Bank card": "Carta bancaria",
      "Name": "Nome",
      "Card number": "Numero carta",
      "Bank name": "Nome banca",

      "Notice": "Notifiche",
      "No notification record": "Nessuna notifica",
      "Popular list": "Lista popolare",
      "Symbol": "Simbolo",
      "Latest Price": "Ultimo prezzo",
      "24h": "24h",

      "Please fill in all fields": "Compila tutti i campi",
      "Network error, please try again later": "Errore di rete, riprova più tardi",

      /* CoinDetail */
      "Buy": "Compra",
      "Sell": "Vendi",
      "Limit Order": "Ordine limite",
      "Market Order": "Ordine a mercato",
      "Enter Quantity": "Inserisci quantità",
      "Order Success": "Ordine eseguito con successo",
      "Order Failed": "Ordine non riuscito",
      "Turnover": "Controvalore",
      "Submitting": "Invio in corso...",
      "No Order": "Nessun ordine in delega",
    }
  },

  /* ========== Korean ========== */
  "한국어": {
    translation: {
      ...commonKeys,

      "Loading": "로딩 중",
      "Price": "가격",
      "Unavailable": "사용 불가",
      "Available": "사용 가능",
      "Frozen": "동결",
      "Equivalent (USDT)": "등가 (USDT)",
      "Financial records": "재무 기록",
      "Temporarily no data": "데이터 없음",
      "Deposit": "입금",
      "Withdraw": "출금",

      "Buy Crypto": "암호화폐 구매",
      "Money": "자금",
      "Submit order": "주문 제출",

      "Bank card": "은행 카드",
      "Name": "이름",
      "Card number": "카드 번호",
      "Bank name": "은행 이름",

      "Notice": "알림",
      "No notification record": "알림 없음",
      "Popular list": "인기 목록",
      "Symbol": "심볼",
      "Latest Price": "최신 가격",
      "24h": "24시간",

      "Please fill in all fields": "모든 항목을 입력하세요",
      "Network error, please try again later": "네트워크 오류, 나중에 다시 시도하세요",

      /* CoinDetail */
      "Buy": "매수",
      "Sell": "매도",
      "Limit Order": "지정가 주문",
      "Market Order": "시장가 주문",
      "Enter Quantity": "수량을 입력하세요",
      "Order Success": "주문 성공",
      "Order Failed": "주문 실패",
      "Turnover": "거래대금",
      "Submitting": "전송 중...",
      "No Order": "위탁 주문 없음",
    }
  },

  /* ========== Japanese ========== */
  "日本語": {
    translation: {
      ...commonKeys,

      "Loading": "読み込み中",
      "Price": "価格",
      "Unavailable": "利用不可",
      "Available": "利用可能",
      "Frozen": "凍結",
      "Equivalent (USDT)": "相当額 (USDT)",
      "Financial records": "財務記録",
      "Temporarily no data": "データなし",
      "Deposit": "入金",
      "Withdraw": "出金",

      "Buy Crypto": "暗号資産を購入",
      "Money": "資金",
      "Submit order": "注文を送信",

      "Bank card": "銀行カード",
      "Name": "名前",
      "Card number": "カード番号",
      "Bank name": "銀行名",

      "Notice": "通知",
      "No notification record": "通知なし",
      "Popular list": "人気リスト",
      "Symbol": "シンボル",
      "Latest Price": "最新価格",
      "24h": "24時間",

      "Please fill in all fields": "すべての項目を入力してください",
      "Network error, please try again later": "ネットワークエラー、後でもう一度お試しください",

      /* CoinDetail */
      "Buy": "買い",
      "Sell": "売り",
      "Limit Order": "指値注文",
      "Market Order": "成行注文",
      "Enter Quantity": "数量を入力してください",
      "Order Success": "注文が成功しました",
      "Order Failed": "注文に失敗しました",
      "Turnover": "取引額",
      "Submitting": "送信中...",
      "No Order": "委託注文はありません",
    }
  },

  /* ========== Traditional Chinese ========== */
  "中文繁体": {
    translation: {
      ...commonKeys,

      "Loading": "載入中",
      "Price": "價格",
      "Unavailable": "不可用",
      "Available": "可用餘額",
      "Frozen": "凍結資金",
      "Equivalent (USDT)": "折合 (USDT)",
      "Financial records": "財務記錄",
      "Temporarily no data": "暫無數據",
      "Deposit": "充值",
      "Withdraw": "提幣",

      "Buy Crypto": "購買加密貨幣",
      "Money": "資金",
      "Submit order": "提交訂單",

      "Bank card": "銀行卡",
      "Name": "姓名",
      "Card number": "卡號",
      "Bank name": "銀行名稱",

      "Notice": "通知",
      "No notification record": "暫無通知",
      "Popular list": "熱門列表",
      "Symbol": "幣種",
      "Latest Price": "最新價格",
      "24h": "24小時",

      "Please fill in all fields": "請填寫所有欄位",
      "Network error, please try again later": "網絡錯誤，請稍後再試",

      /* CoinDetail */
      "Buy": "買入",
      "Sell": "賣出",
      "Limit Order": "限價委託",
      "Market Order": "市價委託",
      "Enter Quantity": "輸入數量",
      "Order Success": "下單成功",
      "Order Failed": "下單失敗",
      "Turnover": "成交額",
      "Submitting": "提交中...",
      "No Order": "暫無委託訂單",
    }
  },

  /* ========== Simplified Chinese ========== */
  "中文简体": {
    translation: {
      ...commonKeys,

      "Loading": "加载中",
      "Price": "价格",
      "Unavailable": "不可用",
      "Available": "可用余额",
      "Frozen": "冻结资产",
      "Equivalent (USDT)": "折合（USDT）",
      "Financial records": "财务记录",
      "Temporarily no data": "暂无数据",
      "Deposit": "充值",
      "Withdraw": "提币",

      "Buy Crypto": "购买加密货币",
      "Money": "资金",
      "Submit order": "提交订单",

      "Bank card": "银行卡",
      "Name": "姓名",
      "Card number": "卡号",
      "Bank name": "银行名称",

      "Notice": "通知",
      "No notification record": "暂无通知",
      "Popular list": "热门列表",
      "Symbol": "币种",
      "Latest Price": "最新价格",
      "24h": "24小时",

      "Please fill in all fields": "请填写所有字段",
      "Network error, please try again later": "网络错误，请稍后再试",

      /* CoinDetail */
      "Buy": "买入",
      "Sell": "卖出",
      "Limit Order": "限价委托",
      "Market Order": "市价委托",
      "Enter Quantity": "请输入数量",
      "Order Success": "下单成功",
      "Order Failed": "下单失败",
      "Turnover": "成交额",
      "Submitting": "提交中...",
      "No Order": "暂无委托订单",
    }
  },

  /* ========== Thai ========== */
  "ภาษาไทย": {
    translation: {
      ...commonKeys,

      "Loading": "กำลังโหลด",
      "Price": "ราคา",
      "Unavailable": "ไม่พร้อมใช้งาน",
      "Available": "ยอดคงเหลือ",
      "Frozen": "ยอดถูกแช่แข็ง",
      "Equivalent (USDT)": "มูลค่า (USDT)",
      "Financial records": "บันทึกการเงิน",
      "Temporarily no data": "ไม่มีข้อมูล",
      "Deposit": "ฝาก",
      "Withdraw": "ถอน",

      "Buy Crypto": "ซื้อคริปโต",
      "Money": "เงิน",
      "Submit order": "ส่งคำสั่งซื้อ",

      "Bank card": "บัตรธนาคาร",
      "Name": "ชื่อ",
      "Card number": "หมายเลขบัตร",
      "Bank name": "ชื่อธนาคาร",

      "Notice": "การแจ้งเตือน",
      "No notification record": "ไม่มีการแจ้งเตือน",
      "Popular list": "รายการยอดนิยม",
      "Symbol": "สัญลักษณ์",
      "Latest Price": "ราคาล่าสุด",
      "24h": "24 ชั่วโมง",

      "Please fill in all fields": "กรุณากรอกข้อมูลให้ครบ",
      "Network error, please try again later": "เครือข่ายผิดพลาด กรุณาลองอีกครั้ง",

      /* CoinDetail */
      "Buy": "ซื้อ",
      "Sell": "ขาย",
      "Limit Order": "ออเดอร์ลิมิต",
      "Market Order": "ออเดอร์ตลาด",
      "Enter Quantity": "กรอกจำนวน",
      "Order Success": "ส่งคำสั่งสำเร็จ",
      "Order Failed": "คำสั่งล้มเหลว",
      "Turnover": "มูลค่ารวม",
      "Submitting": "กำลังส่ง...",
      "No Order": "ยังไม่มีออเดอร์",
    }
  },

  /* ========== Vietnamese ========== */
  "Tiếng Việt": {
    translation: {
      ...commonKeys,

      "Loading": "Đang tải",
      "Price": "Giá",
      "Unavailable": "Không khả dụng",
      "Available": "Số dư khả dụng",
      "Frozen": "Đóng băng",
      "Equivalent (USDT)": "Tương đương (USDT)",
      "Financial records": "Bản ghi tài chính",
      "Temporarily no data": "Không có dữ liệu",
      "Deposit": "Nạp",
      "Withdraw": "Rút",

      "Buy Crypto": "Mua Crypto",
      "Money": "Tiền",
      "Submit order": "Gửi đơn hàng",

      "Bank card": "Thẻ ngân hàng",
      "Name": "Tên",
      "Card number": "Số thẻ",
      "Bank name": "Tên ngân hàng",

      "Notice": "Thông báo",
      "No notification record": "Không có thông báo",
      "Popular list": "Danh sách phổ biến",
      "Symbol": "Ký hiệu",
      "Latest Price": "Giá mới nhất",
      "24h": "24 giờ",

      "Please fill in all fields": "Vui lòng điền đầy đủ thông tin",
      "Network error, please try again later": "Lỗi mạng, vui lòng thử lại sau",

      /* CoinDetail */
      "Buy": "Mua",
      "Sell": "Bán",
      "Limit Order": "Lệnh giới hạn",
      "Market Order": "Lệnh thị trường",
      "Enter Quantity": "Nhập số lượng",
      "Order Success": "Đặt lệnh thành công",
      "Order Failed": "Đặt lệnh thất bại",
      "Turnover": "Giá trị giao dịch",
      "Submitting": "Đang gửi...",
      "No Order": "Không có lệnh ủy thác",
    }
  },

  /* ========== Spanish ========== */
  "español": {
    translation: {
      ...commonKeys,

      "Loading": "Cargando",
      "Price": "Precio",
      "Unavailable": "No disponible",
      "Available": "Disponible",
      "Frozen": "Congelado",
      "Equivalent (USDT)": "Equivalente (USDT)",
      "Financial records": "Registros financieros",
      "Temporarily no data": "Sin datos",
      "Deposit": "Depositar",
      "Withdraw": "Retirar",

      "Buy Crypto": "Comprar Crypto",
      "Money": "Dinero",
      "Submit order": "Enviar orden",

      "Bank card": "Tarjeta bancaria",
      "Name": "Nombre",
      "Card number": "Número de tarjeta",
      "Bank name": "Nombre del banco",

      "Notice": "Notificaciones",
      "No notification record": "No hay notificaciones",
      "Popular list": "Lista popular",
      "Symbol": "Símbolo",
      "Latest Price": "Precio reciente",
      "24h": "24h",

      "Please fill in all fields": "Por favor complete todos los campos",
      "Network error, please try again later": "Error de red, inténtalo más tarde",

      /* CoinDetail */
      "Buy": "Comprar",
      "Sell": "Vender",
      "Limit Order": "Orden limitada",
      "Market Order": "Orden de mercado",
      "Enter Quantity": "Introduzca la cantidad",
      "Order Success": "Orden realizada con éxito",
      "Order Failed": "Error al realizar la orden",
      "Turnover": "Volumen",
      "Submitting": "Enviando...",
      "No Order": "No hay órdenes delegadas",
    }
  },

  /* ========== Turkish ========== */
  "Türkçe": {
    translation: {
      ...commonKeys,

      "Loading": "Yükleniyor",
      "Price": "Fiyat",
      "Unavailable": "Kullanılamıyor",
      "Available": "Kullanılabilir",
      "Frozen": "Dondurulmuş",
      "Equivalent (USDT)": "Eşdeğer (USDT)",
      "Financial records": "Finansal kayıtlar",
      "Temporarily no data": "Veri yok",
      "Deposit": "Yatır",
      "Withdraw": "Çek",

      "Buy Crypto": "Kripto Satın Al",
      "Money": "Para",
      "Submit order": "Sipariş ver",

      "Bank card": "Banka Kartı",
      "Name": "İsim",
      "Card number": "Kart numarası",
      "Bank name": "Banka adı",

      "Notice": "Bildirim",
      "No notification record": "Bildirim yok",
      "Popular list": "Popüler liste",
      "Symbol": "Sembol",
      "Latest Price": "Son fiyat",
      "24h": "24 saat",

      "Please fill in all fields": "Lütfen tüm alanları doldurun",
      "Network error, please try again later": "Ağ hatası, lütfen daha sonra tekrar deneyin",

      /* CoinDetail */
      "Buy": "Al",
      "Sell": "Sat",
      "Limit Order": "Limit emri",
      "Market Order": "Piyasa emri",
      "Enter Quantity": "Miktar girin",
      "Order Success": "Emir başarıyla gönderildi",
      "Order Failed": "Emir başarısız oldu",
      "Turnover": "Hacim",
      "Submitting": "Gönderiliyor...",
      "No Order": "Açık emir yok",
    }
  },
};

/* ------------------ 初始化 i18next ------------------ */

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "English",
  fallbackLng: "English",
  interpolation: { escapeValue: false },
});

export default i18n;
