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

  /* CoinDetail */
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

  /* Record 页新增 */
  "Record": "Record",
  "Time": "Time",
  "No withdrawal record": "There is no currency withdrawal record at the moment"
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

    /* Record */
    "Record": "Enregistrement",
    "Time": "Heure",
    "No withdrawal record": "Aucun enregistrement de retrait",

    /* Your added translations */
    "User Center": "Centre d'utilisateur",
    "Introduction": "Introduction",
    "Currency": "Devise",
    "Futures": "Contrats à terme",
    "Market": "Marché",
    "Wallets": "Portefeuilles",
    "Mail": "Courriel",
    "Language": "Langue",
    "Withdrawal password setting": "Paramètre du mot de passe de retrait",
    "MSB Certification": "Certification MSB",
    "Submit": "Soumettre",

    "Please enter the confirmation password": "Veuillez entrer le mot de passe de confirmation",
    "Please enter a new password": "Veuillez entrer un nouveau mot de passe",
    "New password": "Nouveau mot de passe",
    "Confirm password": "Confirmer le mot de passe",
    "Change Password": "Changer le mot de passe",

    "Online Service": "Service en ligne",
    "Announcement center": "Centre d'annonces",
    "Recharge": "Recharger",
    "Buy Cryptocurrency": "Acheter des cryptomonnaies",
    "Search currency": "Rechercher une devise",
    "Cancel": "Annuler",

    "The world's first social trading platform": "La première plateforme de trading social au monde",
    "Crypto.com intro paragraph 1": "Crypto.com a été fondée en 2016 et est enregistrée à Singapour. Son siège opérationnel est situé à Dubaï. Elle dispose de centres d'opération dans de nombreux pays et régions, dont les États-Unis et l'Europe, et son activité couvre le monde entier.",
    "Crypto.com intro paragraph 2": "La plateforme compte plus de 50 millions d'utilisateurs enregistrés dans le monde, plus de 3 millions d'utilisateurs actifs mensuels et plus de 80 millions de visites dans l'écosystème.",
    "Crypto.com intro paragraph 3": "Crypto.com est une plateforme de trading complète prenant en charge plus de 800 cryptomonnaies de qualité et plus de 1 000 paires de trading. Elle propose des services tels que le spot, le levier, l'OTC, les contrats et les achats par carte bancaire, offrant aux utilisateurs des services d'investissement sûrs, efficaces et professionnels.",

    "Buy Up": "Acheter à la hausse",
    "Buy Fall": "Acheter à la baisse",
    "Confirm Order": "Confirmer l'ordre",
    "Selection Period": "Période de sélection",
    "Custom amount": "Montant personnalisé",
    "Balance": "Solde",

    "Withdraw USDT": "Retirer USDT",
    "Network": "Réseau",
    "Withdrawal address": "Adresse de retrait",
    "Enter withdrawal address": "Entrez l'adresse de retrait",
    "Withdrawal Password": "Mot de passe de retrait",
    "Ordinary withdrawal": "Retrait ordinaire",
    "Asset list": "Liste d'actifs",
    "Account total assets conversion": "Conversion totale des actifs du compte",

    "Withdrawal Amount": "Montant du retrait",
    "Enter withdrawal quantity": "Entrez le montant du retrait"
  }
},


/* ========== German ========== */
"Deutsch": {
  translation: {
    ...commonKeys,

    "User Center": "Benutzerzentrum",
    "Introduction": "Einführung",
    "Currency": "Währung",
    "Futures": "Futures",
    "Market": "Markt",
    "Wallets": "Wallets",
    "Mail": "Mail",
    "Bank card": "Bankkarte",
    "Language": "Sprache",
    "Withdrawal password setting": "Auszahlungs-Passworteinstellung",
    "MSB Certification": "MSB-Zertifizierung",
    "Submit": "Absenden",

    "Please enter the confirmation password": "Bitte das Bestätigungspasswort eingeben",
    "Please enter a new password": "Bitte ein neues Passwort eingeben",
    "New password": "Neues Passwort",
    "Confirm password": "Passwort bestätigen",
    "Change Password": "Passwort ändern",

    "Online Service": "Online-Service",
    "Announcement center": "Ankündigungszentrum",
    "Recharge": "Aufladen",
    "Buy Cryptocurrency": "Kryptowährung kaufen",
    "Search currency": "Währung suchen",
    "Cancel": "Abbrechen",

    "Symbol": "Symbol",
    "Latest Price": "Aktueller Preis",

    "The world's first social trading platform": "Die weltweit erste Social-Trading-Plattform",
    "Crypto.com intro paragraph 1":
      "Crypto.com wurde 2016 gegründet und ist in Singapur registriert. Der operative Hauptsitz befindet sich in Dubai. Das Unternehmen verfügt über Betriebszentren in vielen Ländern und Regionen wie den USA und Europa, und sein Geschäft erstreckt sich weltweit.",
    "Crypto.com intro paragraph 2":
      "Die Plattform hat weltweit mehr als 50 Millionen registrierte Nutzer, über 3 Millionen monatlich aktive Nutzer und über 80 Millionen Ökosystemzugriffe.",
    "Crypto.com intro paragraph 3":
      "Crypto.com ist eine umfassende Handelsplattform, die über 800 hochwertige Kryptowährungen und mehr als 1.000 Handelspaare unterstützt. Sie bietet Spot-Handel, Margin-Handel, OTC-Handel, Terminhandel und Kreditkartenkäufe an und verfolgt das Ziel, Benutzern die sichersten, effizientesten und professionellsten digitalen Vermögensdienstleistungen zu bieten.",

    "Buy Up": "Kaufen (Long)",
    "Buy Fall": "Verkaufen (Short)",
    "Confirm Order": "Order bestätigen",
    "Selection Period": "Auswahlperiode",
    "Custom amount": "Benutzerdefinierter Betrag",
    "Balance": "Guthaben",

    "Withdraw USDT": "USDT auszahlen",
    "Network": "Netzwerk",
    "Withdrawal address": "Auszahlungsadresse",
    "Enter withdrawal address": "Auszahlungsadresse eingeben",
    "Withdrawal Password": "Auszahlungspasswort",
    "Ordinary withdrawal": "Normale Auszahlung",
    "Asset list": "Vermögensliste",
    "Account total assets conversion": "Gesamtvermögensumrechnung des Kontos",

    "Withdrawal Amount": "Auszahlungsbetrag",
    "Enter withdrawal quantity": "Auszahlungsmenge eingeben",

    /* 下面是原来 commonKeys 没有的补充（保留） */
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

    "Notice": "Benachrichtigungen",
    "No notification record": "Keine Benachrichtigungen",
    "Popular list": "Beliebte Liste",
    "24h": "24h",

    "Please fill in all fields": "Bitte alle Felder ausfüllen",
    "Network error, please try again later": "Netzwerkfehler, bitte später erneut versuchen",

    "Order Success": "Order erfolgreich",
    "Order Failed": "Order fehlgeschlagen",
    "Turnover": "Umsatz",
    "Submitting": "Wird gesendet...",
    "No Order": "Keine offenen Orders",

    "Record": "Aufzeichnung",
    "Time": "Zeit",
    "No withdrawal record": "Keine Abhebungsaufzeichnungen"
  }
},


/* ========== Italian ========== */
"Italiano": {
  translation: {
    ...commonKeys,

    "User Center": "Centro Utente",
    "Introduction": "Introduzione",
    "Currency": "Valuta",
    "Futures": "Futures",
    "Market": "Mercato",
    "Wallets": "Portafogli",
    "Mail": "Posta",
    "Bank card": "Carta bancaria",
    "Language": "Lingua",
    "Withdrawal password setting": "Impostazione password di prelievo",
    "MSB Certification": "Certificazione MSB",
    "Submit": "Invia",

    "Please enter the confirmation password": "Inserisci la password di conferma",
    "Please enter a new password": "Inserisci una nuova password",
    "New password": "Nuova password",
    "Confirm password": "Conferma password",
    "Change Password": "Cambia password",

    "Online Service": "Servizio online",
    "Announcement center": "Centro annunci",
    "Recharge": "Ricarica",
    "Buy Cryptocurrency": "Acquista criptovalute",
    "Search currency": "Cerca valuta",
    "Cancel": "Annulla",

    "Symbol": "Simbolo",
    "Latest Price": "Ultimo prezzo",

    "The world's first social trading platform": "La prima piattaforma di social trading al mondo",
    "Crypto.com intro paragraph 1":
      "Crypto.com è stata fondata nel 2016 ed è registrata a Singapore. La sua sede operativa si trova a Dubai. Dispone di centri operativi in molti paesi e regioni, come Stati Uniti ed Europa, e le sue attività coprono il mondo intero.",
    "Crypto.com intro paragraph 2":
      "La piattaforma ha oltre 50 milioni di utenti registrati in tutto il mondo, più di 3 milioni di utenti attivi mensili e oltre 80 milioni di visite nell'ecosistema.",
    "Crypto.com intro paragraph 3":
      "Crypto.com è una piattaforma di trading completa che supporta oltre 800 criptovalute di alta qualità e più di 1000 coppie di trading. Offre vari servizi, come spot, leva, OTC, futures e acquisti tramite carta di credito, fornendo agli utenti servizi sicuri, efficienti e professionali.",

    "Buy Up": "Compra al rialzo",
    "Buy Fall": "Compra al ribasso",
    "Confirm Order": "Conferma ordine",
    "Selection Period": "Periodo di selezione",
    "Custom amount": "Importo personalizzato",
    "Balance": "Saldo",

    "Withdraw USDT": "Preleva USDT",
    "Network": "Rete",
    "Withdrawal address": "Indirizzo di prelievo",
    "Enter withdrawal address": "Inserisci l'indirizzo di prelievo",
    "Withdrawal Password": "Password di prelievo",
    "Ordinary withdrawal": "Prelievo ordinario",
    "Asset list": "Elenco degli asset",
    "Account total assets conversion": "Conversione totale degli asset del conto",

    "Withdrawal Amount": "Importo di prelievo",
    "Enter withdrawal quantity": "Inserisci la quantità di prelievo",

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

    "Card number": "Numero carta",
    "Bank name": "Nome banca",

    "Notice": "Notifiche",
    "No notification record": "Nessuna notifica",
    "Popular list": "Lista popolare",
    "24h": "24h",

    "Please fill in all fields": "Compila tutti i campi",
    "Network error, please try again later": "Errore di rete, riprova più tardi",

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

    "Record": "Record",
    "Time": "Ora",
    "No withdrawal record": "Nessun record di prelievo"
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

      "User Center": "사용자 센터",
"Introduction": "소개",
"Currency": "현물",
"Futures": "선물",
"Market": "마켓",
"Wallets": "지갑",
"Mail": "메일",
"Bank card": "은행 카드",
"Language": "언어",
"Withdrawal password setting": "출금 비밀번호 설정",
"MSB Certification": "MSB 인증",
"Submit": "제출",

"Please enter the confirmation password": "확인 비밀번호를 입력하세요",
"Please enter a new password": "새 비밀번호를 입력하세요",
"New password": "새 비밀번호",
"Confirm password": "비밀번호 확인",
"Change Password": "비밀번호 변경",

"Online Service": "온라인 고객센터",
"Announcement center": "공지 센터",
"Recharge": "충전",
"Buy Cryptocurrency": "암호화폐 구매",
"Search currency": "코인 검색",
"Cancel": "취소",

"Symbol": "심볼",
"Latest Price": "최신 가격",

"The world's first social trading platform": "세계 최초의 소셜 트레이딩 플랫폼",
"Crypto.com intro paragraph 1":
  "Crypto.com은 2016년에 설립되어 싱가포르에 등록되어 있습니다. 운영 본사는 두바이에 있으며 미국과 유럽 등 여러 국가와 지역에 운영 센터를 두고 전 세계적으로 서비스를 제공합니다.",
"Crypto.com intro paragraph 2":
  "이 플랫폼은 전 세계적으로 5천만 명 이상의 등록 사용자, 월간 300만 명 이상의 활성 사용자, 그리고 생태계 내 8천만 이상의 방문량을 보유하고 있습니다.",
"Crypto.com intro paragraph 3":
  "Crypto.com은 800개 이상의 고품질 암호화폐와 1000개 이상의 거래 페어를 지원하는 종합 거래 플랫폼입니다. 현물, 레버리지, OTC, 선물, 신용카드 구매 등 다양한 거래 서비스를 제공하며 가장 안전하고 효율적이며 전문적인 디지털 자산 투자 서비스를 제공합니다.",

"Buy Up": "상승 매수",
"Buy Fall": "하락 매수",
"Confirm Order": "주문 확인",
"Selection Period": "기간 선택",
"Custom amount": "맞춤 금액",
"Balance": "잔액",

"Withdraw USDT": "USDT 출금",
"Network": "네트워크",
"Withdrawal address": "출금 주소",
"Enter withdrawal address": "출금 주소를 입력하세요",
"Withdrawal Password": "출금 비밀번호",
"Ordinary withdrawal": "일반 출금",
"Asset list": "자산 목록",
"Account total assets conversion": "총 자산 환산",

"Withdrawal Amount": "출금 금액",
"Enter withdrawal quantity": "출금 수량을 입력하세요",


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

      /* Record */
      "Record": "기록",
      "Time": "시간",
      "No withdrawal record": "출금 기록이 없습니다"
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

      /* 你新增的内容（已整理） */
      "User Center": "ユーザーセンター",
      "Introduction": "紹介",
      "Currency": "現物",
      "Futures": "先物",
      "Market": "マーケット",
      "Wallets": "ウォレット",
      "Mail": "メール",
      "Bank card": "銀行カード",
      "Language": "言語設定",
      "Withdrawal password setting": "出金パスワード設定",
      "MSB Certification": "MSB認証",
      "Submit": "送信",

      "Please enter the confirmation password": "確認用パスワードを入力してください",
      "Please enter a new password": "新しいパスワードを入力してください",
      "New password": "新しいパスワード",
      "Confirm password": "パスワード確認",
      "Change Password": "パスワード変更",

      "Online Service": "オンラインサービス",
      "Announcement center": "お知らせセンター",
      "Recharge": "チャージ",
      "Buy Cryptocurrency": "暗号資産の購入",
      "Search currency": "通貨検索",
      "Cancel": "キャンセル",

      "Symbol": "シンボル",
      "Latest Price": "最新価格",

      "The world's first social trading platform":
        "世界初のソーシャルトレーディングプラットフォーム",

      "Crypto.com intro paragraph 1":
        "Crypto.comは2016年に設立され、シンガポールに登録されています。運営本部はドバイにあり、米国や欧州など世界各地に運営センターを持ち、事業範囲は世界中に広がっています。",
      "Crypto.com intro paragraph 2":
        "プラットフォームには5,000万以上の登録ユーザー、月間300万以上のアクティブユーザー、そしてエコシステム全体で8,000万以上のアクセスがあります。",
      "Crypto.com intro paragraph 3":
        "Crypto.comは800以上の高品質な通貨と1000以上の取引ペアをサポートする総合取引プラットフォームです。現物取引、レバレッジ取引、OTC取引、先物取引、クレジットカードによる購入など幅広いサービスを提供し、安全で効率的かつ専門的なデジタル資産投資サービスをユーザーに提供します。",

      "Buy Up": "上昇に購入",
      "Buy Fall": "下落に購入",
      "Confirm Order": "注文確認",
      "Selection Period": "期間選択",
      "Custom amount": "カスタム金額",
      "Balance": "残高",

      "Withdraw USDT": "USDT出金",
      "Network": "ネットワーク",
      "Withdrawal address": "出金アドレス",
      "Enter withdrawal address": "出金アドレスを入力してください",
      "Withdrawal Password": "出金パスワード",
      "Ordinary withdrawal": "通常出金",
      "Asset list": "資産一覧",
      "Account total assets conversion": "総資産換算",

      "Withdrawal Amount": "出金金額",
      "Enter withdrawal quantity": "出金数量を入力してください",

      /* 下面是 commonKeys 原本的内容： */
      "Buy Crypto": "暗号資産を購入",
      "Money": "資金",
      "Submit order": "注文を送信",

      "Name": "名前",
      "Card number": "カード番号",
      "Bank name": "銀行名",

      "Notice": "通知",
      "No notification record": "通知なし",
      "Popular list": "人気リスト",
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

      /* Record */
      "Record": "記録",
      "Time": "時間",
      "No withdrawal record": "出金記録はありません"
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

    "User Center": "用戶中心",
    "Introduction": "平台介紹",
    "Currency": "幣幣交易",
    "Futures": "合約交易",
    "Market": "行情",
    "Wallets": "錢包",
    "Mail": "郵箱",
    "Language": "語言",
    "Withdrawal password setting": "提幣密碼設定",
    "MSB Certification": "MSB 認證",
    "Submit": "提交",

    "Please enter the confirmation password": "請輸入確認密碼",
    "Please enter a new password": "請輸入新密碼",
    "New password": "新密碼",
    "Confirm password": "確認密碼",
    "Change Password": "修改密碼",

    "Online Service": "在線客服",
    "Announcement center": "公告中心",
    "Recharge": "充值",
    "Buy Cryptocurrency": "購買加密貨幣",
    "Search currency": "搜尋幣種",
    "Cancel": "取消",

    "Symbol": "幣種",
    "Latest Price": "最新價格",

    "The world's first social trading platform": "全球首個社交交易平台",
    "Crypto.com intro paragraph 1":
      "Crypto.com 成立於 2016 年，註冊於新加坡，營運總部位於迪拜，並在美國、歐洲等多個國家及地區設有運營中心，業務範圍覆蓋全球。",
    "Crypto.com intro paragraph 2":
      "平台擁有超過 5,000 萬註冊用戶，月活躍用戶超過 300 萬，整體生態流量超過 8,000 萬。",
    "Crypto.com intro paragraph 3":
      "Crypto.com 是一個支持 800+ 優質貨幣、1000+ 交易對的綜合交易平台，提供幣幣交易、杠桿交易、OTC、合約交易、信用卡買幣等多種交易方式，為用戶提供最安全、高效、專業的數字資產投資服務。",

    "Buy Up": "買漲",
    "Buy Fall": "買跌",
    "Confirm Order": "確認訂單",
    "Selection Period": "選擇週期",
    "Custom amount": "自定義金額",
    "Balance": "餘額",

    "Withdraw USDT": "提幣 USDT",
    "Network": "網絡",
    "Withdrawal address": "提幣地址",
    "Enter withdrawal address": "請輸入提幣地址",
    "Withdrawal Password": "提幣密碼",
    "Ordinary withdrawal": "普通提幣",
    "Asset list": "資產列表",
    "Account total assets conversion": "賬戶總資產換算",

    "Withdrawal Amount": "提幣金額",
    "Enter withdrawal quantity": "請輸入提幣數量",

    "Notice": "通知",
    "No notification record": "暫無通知",
    "Popular list": "熱門列表",
    "24h": "24小時",

    "Please fill in all fields": "請填寫所有欄位",
    "Network error, please try again later": "網絡錯誤，請稍後再試",

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

    "Record": "紀錄",
    "Time": "時間",
    "No withdrawal record": "目前沒有提幣紀錄"
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

      /* Navigation */
      "User Center": "用户中心",
      "Introduction": "平台介绍",
      "Currency": "币币交易",
      "Futures": "合约交易",
      "Market": "行情",
      "Wallets": "钱包",
      "Mail": "邮箱",
      "Bank card": "银行卡",
      "Language": "语言",
      "Withdrawal password setting": "提币密码设置",
      "MSB Certification": "MSB 认证",
      "Submit": "提交",

      /* Password settings */
      "Please enter the confirmation password": "请输入确认密码",
      "Please enter a new password": "请输入新密码",
      "New password": "新密码",
      "Confirm password": "确认密码",
      "Change Password": "修改密码",

      /* Home */
      "Online Service": "在线客服",
      "Announcement center": "公告中心",
      "Recharge": "充值",
      "Buy Cryptocurrency": "购买加密货币",
      "Search currency": "搜索币种",
      "Cancel": "取消",

      "Symbol": "币种",
      "Latest Price": "最新价格",

      /* Intro paragraphs */
      "The world's first social trading platform": "全球首个社交交易平台",
      "Crypto.com intro paragraph 1":
        "Crypto.com 成立于 2016 年，注册于新加坡，运营总部位于迪拜，并在美国、欧洲等多个国家和地区设有运营中心，业务覆盖全球。",
      "Crypto.com intro paragraph 2":
        "平台拥有超过 5000 万注册用户，月活跃用户超过 300 万，生态系统用户流量超过 8000 万。",
      "Crypto.com intro paragraph 3":
        "Crypto.com 是一个支持 800+ 优质加密货币及 1000+ 交易对的综合交易平台，提供币币交易、杠杆交易、OTC 交易、合约交易、信用卡买币等多种交易方式，为用户提供最安全、高效、专业的数字资产投资服务。",

      /* Options trading */
      "Buy Up": "买涨",
      "Buy Fall": "买跌",
      "Confirm Order": "确认订单",
      "Selection Period": "选择周期",
      "Custom amount": "自定义金额",
      "Balance": "余额",

      /* Withdraw */
      "Withdraw USDT": "提币 USDT",
      "Network": "网络",
      "Withdrawal address": "提币地址",
      "Enter withdrawal address": "请输入提币地址",
      "Withdrawal Password": "提币密码",
      "Ordinary withdrawal": "普通提币",
      "Asset list": "资产列表",
      "Account total assets conversion": "账户总资产折算",

      "Withdrawal Amount": "提币金额",
      "Enter withdrawal quantity": "请输入提币数量",

      /* BuyCrypto */
      "Buy Crypto": "购买加密货币",
      "Money": "资金",
      "Submit order": "提交订单",

      /* More */
      "Name": "姓名",
      "Card number": "卡号",
      "Bank name": "银行名称",

      /* Notice */
      "Notice": "通知",
      "No notification record": "暂无通知",

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

      /* Record */
      "Record": "记录",
      "Time": "时间",
      "No withdrawal record": "暂无提币记录"
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

    /* 新增导航、页面标题 */
    "User Center": "ศูนย์ผู้ใช้",
    "Introduction": "แนะนำแพลตฟอร์ม",
    "Currency": "การซื้อขายสปอต",
    "Futures": "ฟิวเจอร์ส",
    "Market": "ตลาด",
    "Wallets": "กระเป๋าสตางค์",
    "Mail": "จดหมาย",
    "Bank card": "บัตรธนาคาร",
    "Language": "ภาษา",
    "Withdrawal password setting": "ตั้งรหัสผ่านการถอน",
    "MSB Certification": "การรับรอง MSB",
    "Submit": "ยืนยัน",

    /* 密码设置 */
    "Please enter the confirmation password": "กรุณากรอกรหัสผ่านยืนยัน",
    "Please enter a new password": "กรุณากรอกรหัสผ่านใหม่",
    "New password": "รหัสผ่านใหม่",
    "Confirm password": "ยืนยันรหัสผ่าน",
    "Change Password": "เปลี่ยนรหัสผ่าน",

    /* 其他功能项 */
    "Online Service": "บริการออนไลน์",
    "Announcement center": "ศูนย์ประกาศ",
    "Recharge": "เติมเงิน",
    "Buy Cryptocurrency": "ซื้อสกุลเงินดิจิทัล",
    "Search currency": "ค้นหาเหรียญ",
    "Cancel": "ยกเลิก",

    "Symbol": "สัญลักษณ์",
    "Latest Price": "ราคาล่าสุด",

    "The world's first social trading platform": "แพลตฟอร์มโซเชียลเทรดดิ้งแรกของโลก",
    "Crypto.com intro paragraph 1": "Crypto.com ก่อตั้งขึ้นในปี 2016 และจดทะเบียนในสิงคโปร์ ...",
    "Crypto.com intro paragraph 2": "แพลตฟอร์มมีผู้ใช้ลงทะเบียนมากกว่า 50 ล้านคน ...",
    "Crypto.com intro paragraph 3": "Crypto.com เป็นแพลตฟอร์มซื้อขายแบบครบวงจร ...",

    "Buy Up": "ซื้อขึ้น",
    "Buy Fall": "ซื้อเท",
    "Confirm Order": "ยืนยันคำสั่งซื้อ",
    "Selection Period": "เลือกช่วงเวลา",
    "Custom amount": "กำหนดจำนวนเอง",
    "Balance": "ยอดคงเหลือ",

    "Withdraw USDT": "ถอน USDT",
    "Network": "เครือข่าย",
    "Withdrawal address": "ที่อยู่ถอน",
    "Enter withdrawal address": "กรอกที่อยู่ถอน",
    "Withdrawal Password": "รหัสผ่านการถอน",
    "Ordinary withdrawal": "การถอนแบบปกติ",
    "Asset list": "รายการสินทรัพย์",
    "Account total assets conversion": "การแปลงมูลค่ารวมของสินทรัพย์ในบัญชี",
    "Withdrawal Amount": "จำนวนเงินที่ถอน",
    "Enter withdrawal quantity": "กรอกจำนวนที่ต้องการถอน",

    "Money": "เงิน",
    "Submit order": "ส่งคำสั่งซื้อ",

    "Notice": "การแจ้งเตือน",
    "No notification record": "ไม่มีการแจ้งเตือน",
    "Popular list": "รายการยอดนิยม",
    "24h": "24 ชั่วโมง",

    "Please fill in all fields": "กรุณากรอกข้อมูลให้ครบ",
    "Network error, please try again later": "เครือข่ายผิดพลาด กรุณาลองอีกครั้ง",

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

    "Record": "ประวัติ",
    "Time": "เวลา",
    "No withdrawal record": "ไม่มีประวัติการถอน"
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

      /* New keys */
      "User Center": "Trung tâm người dùng",
      "Introduction": "Giới thiệu",
      "Currency": "Giao dịch giao ngay",
      "Futures": "Hợp đồng tương lai",
      "Market": "Thị trường",
      "Wallets": "Ví",
      "Language": "Ngôn ngữ",
      "Withdrawal password setting": "Cài đặt mật khẩu rút tiền",
      "MSB Certification": "Chứng nhận MSB",
      "Submit": "Xác nhận",

      "Please enter the confirmation password": "Vui lòng nhập mật khẩu xác nhận",
      "Please enter a new password": "Vui lòng nhập mật khẩu mới",
      "New password": "Mật khẩu mới",
      "Confirm password": "Xác nhận mật khẩu",
      "Change Password": "Đổi mật khẩu",

      "Online Service": "Dịch vụ trực tuyến",
      "Announcement center": "Trung tâm thông báo",
      "Recharge": "Nạp tiền",
      "Buy Cryptocurrency": "Mua tiền điện tử",
      "Search currency": "Tìm kiếm tiền tệ",
      "Cancel": "Hủy",

      "The world's first social trading platform": "Nền tảng giao dịch xã hội đầu tiên trên thế giới",
      "Crypto.com intro paragraph 1": "Crypto.com được thành lập vào năm 2016 và đăng ký tại Singapore. Trụ sở hoạt động đặt tại Dubai và có trung tâm vận hành tại nhiều quốc gia bao gồm Mỹ và Châu Âu, phạm vi dịch vụ phủ rộng toàn cầu.",
      "Crypto.com intro paragraph 2": "Nền tảng có hơn 50 triệu người dùng đăng ký, hơn 3 triệu người dùng hoạt động hàng tháng và hơn 80 triệu lượt truy cập trong hệ sinh thái.",
      "Crypto.com intro paragraph 3": "Crypto.com là nền tảng giao dịch tổng hợp hỗ trợ hơn 800 loại tiền chất lượng và hơn 1.000 cặp giao dịch. Cung cấp giao dịch giao ngay, giao dịch đòn bẩy, OTC, hợp đồng tương lai và mua tiền điện tử bằng thẻ tín dụng—đem đến dịch vụ đầu tư tài sản kỹ thuật số an toàn, hiệu quả và chuyên nghiệp nhất cho người dùng.",

      "Buy Up": "Mua Lên",
      "Buy Fall": "Mua Xuống",
      "Confirm Order": "Xác nhận lệnh",
      "Selection Period": "Chọn thời gian",
      "Custom amount": "Tùy chỉnh số tiền",
      "Balance": "Số dư",

      "Withdraw USDT": "Rút USDT",
      "Network": "Mạng",
      "Withdrawal address": "Địa chỉ rút tiền",
      "Enter withdrawal address": "Nhập địa chỉ rút tiền",
      "Withdrawal Password": "Mật khẩu rút tiền",
      "Ordinary withdrawal": "Rút tiền thường",
      "Asset list": "Danh sách tài sản",
      "Account total assets conversion": "Quy đổi tổng tài sản tài khoản",

      "Withdrawal Amount": "Số tiền rút",
      "Enter withdrawal quantity": "Nhập số lượng rút",

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

      /* Record */
      "Record": "Lịch sử",
      "Time": "Thời gian",
      "No withdrawal record": "Không có lịch sử rút tiền"
    }
  },

 /* ========== Spanish ========== */
"español": {
  translation: {
    ...commonKeys,

    "User Center": "Centro de usuario",
    "Introduction": "Introducción",
    "Currency": "Spot",
    "Futures": "Futuros",
    "Market": "Mercado",
    "Wallets": "Carteras",
    "Mail": "Correo",
    "Bank card": "Tarjeta bancaria",
    "Language": "Idioma",
    "Withdrawal password setting": "Configuración de contraseña de retiro",
    "MSB Certification": "Certificación MSB",
    "Submit": "Enviar",

    "Please enter the confirmation password": "Por favor ingrese la contraseña de confirmación",
    "Please enter a new password": "Por favor ingrese una nueva contraseña",
    "New password": "Nueva contraseña",
    "Confirm password": "Confirmar contraseña",
    "Change Password": "Cambiar contraseña",

    "Online Service": "Servicio en línea",
    "Announcement center": "Centro de anuncios",
    "Recharge": "Recargar",
    "Buy Cryptocurrency": "Comprar criptomonedas",
    "Search currency": "Buscar moneda",
    "Cancel": "Cancelar",

    "Symbol": "Símbolo",
    "Latest Price": "Precio reciente",

    "The world's first social trading platform": "La primera plataforma de trading social del mundo",

    "Crypto.com intro paragraph 1":
      "Crypto.com fue fundada en 2016 y está registrada en Singapur. Su sede operativa se encuentra en Dubái y cuenta con centros de operación en países como Estados Unidos y Europa, con un alcance comercial global.",
    "Crypto.com intro paragraph 2":
      "La plataforma tiene más de 50 millones de usuarios registrados, más de 3 millones de usuarios activos mensuales y más de 80 millones de visitas dentro de su ecosistema.",
    "Crypto.com intro paragraph 3":
      "Crypto.com es una plataforma de trading integral que admite más de 800 criptomonedas de alta calidad y más de 1,000 pares de trading. Ofrece spot, trading apalancado, OTC, contratos y compras de criptomonedas con tarjeta de crédito, brindando a los usuarios servicios de inversión en activos digitales seguros, eficientes y profesionales.",

    "Buy Up": "Comprar al alza",
    "Buy Fall": "Comprar a la baja",
    "Confirm Order": "Confirmar orden",
    "Selection Period": "Seleccionar período",
    "Custom amount": "Monto personalizado",
    "Balance": "Balance",

    "Withdraw USDT": "Retirar USDT",
    "Network": "Red",
    "Withdrawal address": "Dirección de retiro",
    "Enter withdrawal address": "Ingrese la dirección de retiro",
    "Withdrawal Password": "Contraseña de retiro",
    "Ordinary withdrawal": "Retiro estándar",
    "Asset list": "Lista de activos",
    "Account total assets conversion": "Conversión del total de activos de la cuenta",

    "Withdrawal Amount": "Monto de retiro",
    "Enter withdrawal quantity": "Ingrese la cantidad de retiro"
  }
},


/* ========== Turkish ========== */
"Türkçe": {
  translation: {
    ...commonKeys,

    "User Center": "Kullanıcı Merkezi",
    "Introduction": "Giriş",
    "Currency": "Spot",
    "Futures": "Vadeli İşlemler",
    "Market": "Piyasa",
    "Wallets": "Cüzdanlar",
    "Mail": "Posta",
    "Bank card": "Banka Kartı",
    "Language": "Dil",
    "Withdrawal password setting": "Çekim şifresi ayarı",
    "MSB Certification": "MSB Sertifikası",
    "Submit": "Gönder",

    "Please enter the confirmation password": "Lütfen onay şifresini girin",
    "Please enter a new password": "Lütfen yeni bir şifre girin",
    "New password": "Yeni şifre",
    "Confirm password": "Şifreyi doğrulayın",
    "Change Password": "Şifreyi Değiştir",

    "Online Service": "Canlı Destek",
    "Announcement center": "Duyuru Merkezi",
    "Recharge": "Yeniden Yükle",
    "Buy Cryptocurrency": "Kripto Para Satın Al",
    "Search currency": "Para birimi ara",
    "Cancel": "İptal",

    "Symbol": "Sembol",
    "Latest Price": "Son Fiyat",

    "The world's first social trading platform": "Dünyanın ilk sosyal işlem platformu",
    "Crypto.com intro paragraph 1":
      "Crypto.com 2016 yılında kurulmuş olup Singapur’da kayıtlıdır. Operasyon merkezi Dubai’dedir ve ABD ile Avrupa dahil birçok ülkede operasyon merkezlerine sahiptir. Hizmet kapsamı dünya çapındadır.",
    "Crypto.com intro paragraph 2":
      "Platformun dünya genelinde 50 milyondan fazla kayıtlı kullanıcısı, 3 milyondan fazla aylık aktif kullanıcısı ve ekosistem içinde 80 milyondan fazla kullanıcı trafiği bulunmaktadır.",
    "Crypto.com intro paragraph 3":
      "Crypto.com; 800+ kaliteli kripto para ve 1000+ işlem çiftini destekleyen kapsamlı bir işlem platformudur. Spot, kaldıraçlı işlem, OTC, vadeli işlemler ve kredi kartı ile kripto satın alma gibi zengin ürünler sunarak kullanıcılarına en güvenli, en verimli ve profesyonel dijital varlık yatırım hizmetlerini sağlar.",

    "Buy Up": "Yukarı Al",
    "Buy Fall": "Aşağı Al",
    "Confirm Order": "Emri Onayla",
    "Selection Period": "Süre Seçimi",
    "Custom amount": "Özel miktar",
    "Balance": "Bakiye",

    "Withdraw USDT": "USDT Çek",
    "Network": "Ağ",
    "Withdrawal address": "Çekim adresi",
    "Enter withdrawal address": "Çekim adresini girin",
    "Withdrawal Password": "Çekim Şifresi",
    "Ordinary withdrawal": "Standart çekim",
    "Asset list": "Varlık listesi",
    "Account total assets conversion": "Hesap toplam varlık dönüşümü",

    "Withdrawal Amount": "Çekim Tutarı",
        "Enter withdrawal quantity": "Çekim miktarını girin"
  }
}
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "English",
  fallbackLng: "English",
  interpolation: { escapeValue: false },
});

export default i18n;

