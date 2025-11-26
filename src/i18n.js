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
    "fastbuy": "Achat rapide", 
    "Unavailable": "Indisponible",
    "Available": "Disponible",
    "Frozen": "Gelé",
    "Equivalent (USDT)": "Équivalent (USDT)",
    "Financial records": "Dossiers financiers",
    "Temporarily no data": "Pas de données",
    "Deposit": "Dépôt",
    "Withdraw": "Retrait",
    
      "Fast buying coin": "Achat rapide de crypto",
      "Crypto.com was founded in 2016 and is registered in Singapore, with its operational headquarters located in Dubai. The platform has established operation centers across multiple countries and regions, including the United States and Europe, expanding its business presence worldwide.": "Crypto.com a été fondée en 2016 et est enregistrée à Singapour, son siège opérationnel étant situé à Dubaï. La plateforme a établi des centres d'opération dans plusieurs pays et régions, y compris les États-Unis et l'Europe, étendant sa présence commerciale dans le monde entier.",
      "Today, Crypto.com serves more than 50 million registered users globally, with over 3 million monthly active users and more than 80 million user interactions across its ecosystem.": "Aujourd'hui, Crypto.com dessert plus de 50 millions d'utilisateurs enregistrés dans le monde, avec plus de 3 millions d'utilisateurs actifs mensuels et plus de 80 millions d'interactions utilisateur à travers son écosystème.",
      "As a comprehensive digital asset trading platform, Crypto.com supports over 800 high-quality cryptocurrencies and more than 1,000 trading pairs. The platform offers a rich selection of trading services, including spot trading, leveraged trading, OTC trading, contract trading, and credit-card-based cryptocurrency purchases.": "En tant que plateforme de trading d'actifs numériques complète, Crypto.com prend en charge plus de 800 cryptomonnaies de haute qualité et plus de 1 000 paires de trading. La plateforme offre une riche sélection de services de trading, y compris le trading spot, le trading avec effet de levier, le trading de gré à gré, le trading de contrats et les achats de cryptomonnaies par carte de crédit.",
      "By combining advanced technology with rigorous security standards, Crypto.com is committed to providing users with the safest, most efficient, and most professional digital asset investment experience available.": "En combinant une technologie avancée avec des normes de sécurité rigoureuses, Crypto.com s'engage à offrir aux utilisateurs l'expérience d'investissement en actifs numériques la plus sûre, la plus efficace et la plus professionnelle disponible.",
      "Home": "Accueil",
    "Buy Crypto": "Acheter des cryptos",
    "Money": "Argent",
    "Submit order": "Soumettre la commande",
     "Transfer amount": "Montant du transfert",
      "Please enter the transfer amount": "Veuillez saisir le montant du transfert",
      "Upload transfer voucher": "Télécharger le justificatif de transfert",
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

      "Online": "En ligne",
      "Service": "Service",
    "Announcement center": "Centre d'annonces",
    "Recharge": "Recharger",
    "Buy Cryptocurrency": "Acheter des cryptomonnaies",
    "Search currency": "Rechercher une devise",
    "Cancel": "Annuler",

    "The world's first social trading platform": "La première plateforme de trading social au monde",
    "Crypto.com intro paragraph 1": "Crypto.com a été fondée en 2016 et est enregistrée à Singapour. Son siège opérationnel est situé à Dubaï. Elle dispose de centres d'opération dans de nombreux pays et régions, dont les États-Unis et l'Europe, et son activité couvre le monde entier.",
    "Crypto.com intro paragraph 2": "La plateforme compte plus de 50 millions d'utilisateurs enregistrés dans le monde, plus de 3 millions d'utilisateurs actifs mensuels et plus de 80 millions de visites dans l'écosystème.",
    "Crypto.com intro paragraph 3": "Crypto.com est une plateforme de trading complète prenant en charge plus de 800 cryptomonnaies de qualité et plus de 1 000 paires de trading. Elle propose des services tels que le spot, le levier, l'OTC, les contrats et les achats par carte bancaire, offrant aux utilisateurs des services d'investissement sûrs, efficaces et professionnels.",
    "online": "Service en ligne",
    "fastbuy": "Achat rapide",
    "Welcome to visit Crypto.com": "Bienvenue sur Crypto.com",
    "Minimum recharge amount：100.00USDT，Recharge less than the minimum amount will not be credited and cannot be returned": "Montant minimum de recharge : 100.00 USDT, Les recharges inférieures au montant minimum ne seront pas créditées et ne pourront pas être remboursées",
    "Recharge less than the minimum amount will not be credited and cannot be returned": "Les recharges inférieures au montant minimum ne seront pas créditées et ne pourront pas être remboursées",
    "Please select the correct recharge channel network, otherwise the assets will not be retrieved": "Veuillez sélectionner le bon réseau de canal de recharge, sinon les actifs ne pourront pas être récupérés",
    "Your recharge address will not change frequently, and you can recharge repeatedly; If there is any change, we will try our best to notify you through website announcement or email": "Votre adresse de recharge ne changera pas fréquemment et vous pouvez recharger à plusieurs reprises; En cas de changement, nous ferons de notre mieux pour vous informer via une annonce sur le site Web ou par e-mail",
  
    "Please make sure that the computer and browser are secure to prevent information from being tampered with or disclosed": "Veuillez vous assurer que l'ordinateur et le navigateur sont sécurisés pour empêcher la falsification ou la divulgation des informations",
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
    
      "Fast buying coin": "Schneller Münzkauf",
      "Crypto.com was founded in 2016 and is registered in Singapore, with its operational headquarters located in Dubai. The platform has established operation centers across multiple countries and regions, including the United States and Europe, expanding its business presence worldwide.": "Crypto.com wurde 2016 gegründet und ist in Singapur registriert, wobei sich der operative Hauptsitz in Dubai befindet. Die Plattform hat Betriebszentren in mehreren Ländern und Regionen eingerichtet, einschließlich der USA und Europa, und erweitert ihre Geschäftspräsenz weltweit.",
      "Today, Crypto.com serves more than 50 million registered users globally, with over 3 million monthly active users and more than 80 million user interactions across its ecosystem.": "Heute bedient Crypto.com weltweit mehr als 50 Millionen registrierte Benutzer, mit über 3 Millionen monatlich aktiven Benutzern und mehr als 80 Millionen Benutzerinteraktionen in seinem Ökosystem.",
      "As a comprehensive digital asset trading platform, Crypto.com supports over 800 high-quality cryptocurrencies and more than 1,000 trading pairs. The platform offers a rich selection of trading services, including spot trading, leveraged trading, OTC trading, contract trading, and credit-card-based cryptocurrency purchases.": "Als umfassende Handelsplattform für digitale Assets unterstützt Crypto.com über 800 hochwertige Kryptowährungen und mehr als 1.000 Handelspaare. Die Plattform bietet eine reiche Auswahl an Handelsdienstleistungen, einschließlich Spot-Handel, Hebelhandel, OTC-Handel, Vertragshandel und kreditkartenbasierten Kryptowährungskäufen.",
      "By combining advanced technology with rigorous security standards, Crypto.com is committed to providing users with the safest, most efficient, and most professional digital asset investment experience available.": "Durch die Kombination fortschrittlicher Technologie mit strengen Sicherheitsstandards verpflichtet sich Crypto.com, den Benutzern die sicherste, effizienteste und professionellste digitale Asset-Investment-Erfahrung zu bieten.",
      "Home": "Startseite",
    "Please enter the confirmation password": "Bitte das Bestätigungspasswort eingeben",
    "Please enter a new password": "Bitte ein neues Passwort eingeben",
    "New password": "Neues Passwort",
    "Confirm password": "Passwort bestätigen",
    "Change Password": "Passwort ändern",
    

      "Online": "Online",
      "Service": "Service",
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
    "online": "Online-Service",
    "fastbuy": "Schnellkauf",
    "Welcome to visit Crypto.com": "Willkommen bei Crypto.com",
    "Minimum recharge amount：100.00USDT，Recharge less than the minimum amount will not be credited and cannot be returned": "Mindestaufladebetrag: 100.00 USDT, Aufladungen unter dem Mindestbetrag werden nicht gutgeschrieben und können nicht zurückerstattet werden",
    "Recharge less than the minimum amount will not be credited and cannot be returned": "Aufladungen unter dem Mindestbetrag werden nicht gutgeschrieben und können nicht zurückerstattet werden",
    "Please select the correct recharge channel network, otherwise the assets will not be retrieved": "Bitte wählen Sie das richtige Aufladekanalnetzwerk, da die Vermögenswerte sonst nicht abgerufen werden können",
    "Your recharge address will not change frequently, and you can recharge repeatedly; If there is any change, we will try our best to notify you through website announcement or email": "Ihre Aufladeadresse ändert sich nicht häufig und Sie können wiederholt aufladen; Falls es Änderungen gibt, werden wir Sie nach besten Kräften über Website-Ankündigungen oder E-Mail benachrichtigen",
    "Please make sure that the computer and browser are secure to prevent information from being tampered with or disclosed": "Bitte stellen Sie sicher, dass Computer und Browser sicher sind, um zu verhindern, dass Informationen manipuliert oder offengelegt werden",
    "Buy Up": "Kaufen (Long)",
    "Buy Fall": "Verkaufen (Short)",
    "Confirm Order": "Order bestätigen",
    "Selection Period": "Auswahlperiode",
    "Custom amount": "Benutzerdefinierter Betrag",
    "Balance": "Guthaben",
      "Transfer amount": "Überweisungsbetrag",
      "Please enter the transfer amount": "Bitte geben Sie den Überweisungsbetrag ein",
      "Upload transfer voucher": "Überweisungsbeleg hochladen",
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
    "fastbuy": "Schnellkauf", 

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
    "fastbuy": "Acquisto rapido",
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
    
      "Fast buying coin": "Acquisto rapido di cripto",
      "Crypto.com was founded in 2016 and is registered in Singapore, with its operational headquarters located in Dubai. The platform has established operation centers across multiple countries and regions, including the United States and Europe, expanding its business presence worldwide.": "Crypto.com è stata fondata nel 2016 ed è registrata a Singapore, con la sua sede operativa situata a Dubai. La piattaforma ha stabilito centri operativi in più paesi e regioni, inclusi Stati Uniti ed Europa, espandendo la sua presenza commerciale in tutto il mondo.",
      "Today, Crypto.com serves more than 50 million registered users globally, with over 3 million monthly active users and more than 80 million user interactions across its ecosystem.": "Oggi, Crypto.com serve più di 50 milioni di utenti registrati a livello globale, con oltre 3 milioni di utenti attivi mensili e più di 80 milioni di interazioni utente nel suo ecosistema.",
      "As a comprehensive digital asset trading platform, Crypto.com supports over 800 high-quality cryptocurrencies and more than 1,000 trading pairs. The platform offers a rich selection of trading services, including spot trading, leveraged trading, OTC trading, contract trading, and credit-card-based cryptocurrency purchases.": "Come piattaforma completa di trading di asset digitali, Crypto.com supporta oltre 800 criptovalute di alta qualità e più di 1.000 coppie di trading. La piattaforma offre una ricca selezione di servizi di trading, inclusi trading spot, trading con leva, trading OTC, trading di contratti e acquisti di criptovalute basati su carte di credito.",
      "By combining advanced technology with rigorous security standards, Crypto.com is committed to providing users with the safest, most efficient, and most professional digital asset investment experience available.": "Combinando tecnologia avanzata con rigorosi standard di sicurezza, Crypto.com si impegna a fornire agli utenti l'esperienza di investimento in asset digitali più sicura, efficiente e professionale disponibile.",
      "Home": "Home",
    "Please enter the confirmation password": "Inserisci la password di conferma",
    "Please enter a new password": "Inserisci una nuova password",
    "New password": "Nuova password",
    "Confirm password": "Conferma password",
    "Change Password": "Cambia password",
      "Transfer amount": "Importo del trasferimento",
      "Please enter the transfer amount": "Inserisci l'importo del trasferimento",
      "Upload transfer voucher": "Carica ricevuta di trasferimento",
      "Online": "Online",
      "Service": "Servizio",
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
    "online": "Servizio online",
    "fastbuy": "Acquisto rapido",
    "Welcome to visit Crypto.com": "Benvenuto su Crypto.com",
     "Minimum recharge amount：100.00USDT，Recharge less than the minimum amount will not be credited and cannot be returned": "Importo minimo di ricarica: 100.00 USDT, Le ricariche inferiori all'importo minimo non verranno accreditate e non potranno essere rimborsate",
    "Recharge less than the minimum amount will not be credited and cannot be returned": "Le ricariche inferiori all'importo minimo non verranno accreditate e non potranno essere rimborsate",
    "Please select the correct recharge channel network, otherwise the assets will not be retrieved": "Seleziona la rete del canale di ricarica corretta, altrimenti le risorse non potranno essere recuperate",
    "Your recharge address will not change frequently, and you can recharge repeatedly; If there is any change, we will try our best to notify you through website announcement or email": "Il tuo indirizzo di ricarica non cambierà frequentemente e puoi ricaricare ripetutamente；In caso di modifiche, faremo del nostro meglio per informarti tramite annunci sul sito web o email",
    "Please make sure that the computer and browser are secure to prevent information from being tampered with or disclosed": "Assicurati che il computer e il browser siano sicuri per prevenire la manomissione o la divulgazione delle informazioni",
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


"Announcement center": "공지 센터",
"Recharge": "충전",
"Buy Cryptocurrency": "암호화폐 구매",
"Search currency": "코인 검색",
"Cancel": "취소",

"Symbol": "심볼",
"Latest Price": "최신 가격",
      "Transfer amount": "이체 금액",
      "Please enter the transfer amount": "이체 금액을 입력해 주세요",
      "Upload transfer voucher": "이체 증빙서류 업로드",
"The world's first social trading platform": "세계 최초의 소셜 트레이딩 플랫폼",
"Crypto.com intro paragraph 1":
  "Crypto.com은 2016년에 설립되어 싱가포르에 등록되어 있습니다. 운영 본사는 두바이에 있으며 미국과 유럽 등 여러 국가와 지역에 운영 센터를 두고 전 세계적으로 서비스를 제공합니다.",
"Crypto.com intro paragraph 2":
  "이 플랫폼은 전 세계적으로 5천만 명 이상의 등록 사용자, 월간 300만 명 이상의 활성 사용자, 그리고 생태계 내 8천만 이상의 방문량을 보유하고 있습니다.",
"Crypto.com intro paragraph 3":
  "Crypto.com은 800개 이상의 고품질 암호화폐와 1000개 이상의 거래 페어를 지원하는 종합 거래 플랫폼입니다. 현물, 레버리지, OTC, 선물, 신용카드 구매 등 다양한 거래 서비스를 제공하며 가장 안전하고 효율적이며 전문적인 디지털 자산 투자 서비스를 제공합니다.",
    "online": "온라인 서비스",
    "fastbuy": "빠른 구매",
    "Welcome to visit Crypto.com": "Crypto.com에 오신 것을 환영합니다",
    "Minimum recharge amount：100.00USDT，Recharge less than the minimum amount will not be credited and cannot be returned": "최소 충전 금액: 100.00USDT, 최소 금액 미만으로 충전할 경우 입금되지 않으며 환불도 불가능합니다",
    "Recharge less than the minimum amount will not be credited and cannot be returned": "최소 금액 미만으로 충전할 경우 입금되지 않으며 환불되지 않습니다",
    "Please select the correct recharge channel network, otherwise the assets will not be retrieved": "정확한 충전 채널 네트워크를 선택하세요, 그렇지 않으면 자산을 회수할 수 없습니다",
    "Your recharge address will not change frequently, and you can recharge repeatedly; If there is any change, we will try our best to notify you through website announcement or email": "귀하의 충전 주소는 자주 변경되지 않으며 반복적으로 충전할 수 있습니다；변경 사항이 있을 경우 웹사이트 공지 또는 이메일을 통해 최대한 알려드리겠습니다",
    "Please make sure that the computer and browser are secure to prevent information from being tampered with or disclosed": "컴퓨터와 브라우저가 안전한지 확인하여 정보가 변조되거나 유출되는 것을 방지하세요",
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
      "Online": "온라인",
      "Service": "서비스",
      "Fast buying coin": "빠른 코인 구매",
      "Crypto.com was founded in 2016 and is registered in Singapore, with its operational headquarters located in Dubai. The platform has established operation centers across multiple countries and regions, including the United States and Europe, expanding its business presence worldwide.": "Crypto.com은 2016년에 설립되었으며 싱가포르에 등록되어 있고, 운영 본부는 두바이에 위치해 있습니다. 이 플랫폼은 미국과 유럽을 포함한 여러 국가와 지역에 운영 센터를 설립하여 전 세계적으로 비즈니스 존재를 확장하고 있습니다.",
      "Today, Crypto.com serves more than 50 million registered users globally, with over 3 million monthly active users and more than 80 million user interactions across its ecosystem.": "오늘날 Crypto.com은 전 세계적으로 5천만 명 이상의 등록 사용자에게 서비스를 제공하며, 월간 활성 사용자는 3백만 명 이상이고 그 생태계 전체에서 8천만 건 이상의 사용자 상호 작용이 있습니다.",
      "As a comprehensive digital asset trading platform, Crypto.com supports over 800 high-quality cryptocurrencies and more than 1,000 trading pairs. The platform offers a rich selection of trading services, including spot trading, leveraged trading, OTC trading, contract trading, and credit-card-based cryptocurrency purchases.": "종합 디지털 자산 거래 플랫폼으로서 Crypto.com은 800개 이상의 고품질 암호화폐와 1,000개 이상의 거래 쌍을 지원합니다. 이 플랫폼은 현물 거래, 레버리지 거래, 장외 거래, 계약 거래 및 신용 카드 기반 암호화폐 구매를 포함한 다양한 거래 서비스를 제공합니다.",
      "By combining advanced technology with rigorous security standards, Crypto.com is committed to providing users with the safest, most efficient, and most professional digital asset investment experience available.": "선진 기술과 엄격한 보안 기준을 결합함으로써 Crypto.com은 사용자에게 가장 안전하고 효율적이며 전문적인 디지털 자산 투자 경험을 제공하기 위해 최선을 다하고 있습니다.",
      "Home": "홈", 

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
      "fastbuy": "빠른 구매",

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
     
      "Fast buying coin": "高速コイン購入",
      "Crypto.com was founded in 2016 and is registered in Singapore, with its operational headquarters located in Dubai. The platform has established operation centers across multiple countries and regions, including the United States and Europe, expanding its business presence worldwide.": "Crypto.comは2016年に設立され、シンガポールに登録され、その運営本部はドバイにあります。このプラットフォームは、アメリカやヨーロッパを含む複数の国と地域に運営センターを設立し、世界中にビジネスプレゼンスを拡大しています。",
      "Today, Crypto.com serves more than 50 million registered users globally, with over 3 million monthly active users and more than 80 million user interactions across its ecosystem.": "現在、Crypto.comは世界中で5000万人以上の登録ユーザーにサービスを提供しており、月間アクティブユーザーは300万人以上、そのエコシステム全体でのユーザーインタラクションは8000万回以上にのぼります。",
      "As a comprehensive digital asset trading platform, Crypto.com supports over 800 high-quality cryptocurrencies and more than 1,000 trading pairs. The platform offers a rich selection of trading services, including spot trading, leveraged trading, OTC trading, contract trading, and credit-card-based cryptocurrency purchases.": "包括的なデジタル資産取引プラットフォームとして、Crypto.comは800以上の高品質な暗号通貨と1000以上の取引ペアをサポートしています。このプラットフォームは、現物取引、レバレッジ取引、相対取引、契約取引、クレジットカードベースの暗号通貨購入など、豊富な取引サービスの選択肢を提供しています。",
      "By combining advanced technology with rigorous security standards, Crypto.com is committed to providing users with the safest, most efficient, and most professional digital asset investment experience available.": "先進的な技術と厳格なセキュリティ基準を組み合わせることで、Crypto.comはユーザーに利用可能な最も安全で、効率的で、専門的なデジタル資産投資体験を提供することに取り組んでいます。",
      "Home": "ホーム",
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

      "Online": "オンライン",
      "Service": "サービス",
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
    "online": "オンラインサービス",
    "fastbuy": "クイック購入",
    "Welcome to visit Crypto.com": "Crypto.comへようこそ",
     "Minimum recharge amount：100.00USDT，Recharge less than the minimum amount will not be credited and cannot be returned": "最低チャージ金額：100.00USDT、最低金額未満のチャージは入金されず、返金もできません",
    "Recharge less than the minimum amount will not be credited and cannot be returned": "最低入金額未満の入金は反映されず、返金もできません",
    "Please select the correct recharge channel network, otherwise the assets will not be retrieved": "正しい入金チャネルネットワークを選択してください。そうでない場合、資産は回収できません",
    "Your recharge address will not change frequently, and you can recharge repeatedly; If there is any change, we will try our best to notify you through website announcement or email": "お客様の入金アドレスは頻繁に変更されることはなく、繰り返し入金できます； 変更がある場合は、ウェブサイトの告知またはメールでお知らせします",
    "Please make sure that the computer and browser are secure to prevent information from being tampered with or disclosed": "コンピューターとブラウザーが安全であることを確認し、情報が改ざんまたは漏洩しないようにしてください",
      "Buy Up": "上昇に購入",
      "Buy Fall": "下落に購入",
      "Confirm Order": "注文確認",
      "Selection Period": "期間選択",
      "Custom amount": "カスタム金額",
      "Balance": "残高",
      "Transfer amount": "振込金額",
      "Please enter the transfer amount": "振込金額を入力してください",
      "Upload transfer voucher": "振込証明書をアップロード",
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
      "fastbuy": "クイック購入",

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
    "fastbuy": "快速購買",

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
    "online": "在線客服",
    "fastbuy": "快速購買",
    "Welcome to visit Crypto.com": "歡迎訪問 Crypto.com",
    "Minimum recharge amount：100.00USDT，Recharge less than the minimum amount will not be credited and cannot be returned": "最低充值金額：100.00USDT，低於最低金額的充值將不會到賬且無法退回",
    "Recharge less than the minimum amount will not be credited and cannot be returned": "低於最低金額的充值將不會到賬且無法退回",
    "Please select the correct recharge channel network, otherwise the assets will not be retrieved": "請選擇正確的充值通道網絡，否則資產將無法找回",
    "Your recharge address will not change frequently, and you can recharge repeatedly; If there is any change, we will try our best to notify you through website announcement or email": "您的充值地址不會頻繁變更，可多次充值；如有任何變更，我們將盡力通過網站公告或郵件通知您",

    "Please make sure that the computer and browser are secure to prevent information from being tampered with or disclosed": "請確保電腦和瀏覽器安全，以防信息被篡改或泄露",
    "Buy Up": "買漲",
    "Buy Fall": "買跌",
    "Confirm Order": "確認訂單",
    "Selection Period": "選擇週期",
    "Custom amount": "自定義金額",
    "Balance": "餘額",
      "Transfer amount": "轉賬金額",
      "Please enter the transfer amount": "請輸入轉賬金額",
      "Upload transfer voucher": "上傳轉賬憑證",
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
      "Online": "線上",
      "Service": "客服", 
    "Please fill in all fields": "請填寫所有欄位",
    "Network error, please try again later": "網絡錯誤，請稍後再試",
      "Online Service": "線上客服",
      "Fast buying coin": "快速買幣",
      "Crypto.com was founded in 2016 and is registered in Singapore, with its operational headquarters located in Dubai. The platform has established operation centers across multiple countries and regions, including the United States and Europe, expanding its business presence worldwide.": "Crypto.com 成立於2016年，註冊於新加坡，營運總部位於杜拜。該平台已在美國和歐洲等多個國家和地區設立營運中心，將業務擴展到全球範圍。",
      "Today, Crypto.com serves more than 50 million registered users globally, with over 3 million monthly active users and more than 80 million user interactions across its ecosystem.": "如今，Crypto.com 在全球為超過5000萬註冊用戶提供服務，月活躍用戶超過300萬，其生態系統中的用戶互動超過8000萬次。",
      "As a comprehensive digital asset trading platform, Crypto.com supports over 800 high-quality cryptocurrencies and more than 1,000 trading pairs. The platform offers a rich selection of trading services, including spot trading, leveraged trading, OTC trading, contract trading, and credit-card-based cryptocurrency purchases.": "作為綜合性數位資產交易平台，Crypto.com 支援超過800種優質加密貨幣和1000多個交易對。平台提供豐富的交易服務選擇，包括現貨交易、槓桿交易、場外交易、合約交易和基於信用卡的加密貨幣購買。",
      "By combining advanced technology with rigorous security standards, Crypto.com is committed to providing users with the safest, most efficient, and most professional digital asset investment experience available.": "透過將先進技術與嚴格的安全標準相結合，Crypto.com 致力於為用戶提供最安全、最高效和最專業的數位資產投資體驗。",
      "Home": "首頁",
    "Buy": "買入",
    "Sell": "賣出",
    "Limit Order": "限價委託",
    "Market Order": "市價委託",
    "Enter Quantity": "輸入數量",
    "Order Success": "下單成功",
    "Order Failed": "下單失敗",
    "Turnover": "成交額",
    "Submitting": "提交中...",
    "fastbuy": "クイック購入", 
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
      "fastbuy": "快速购买", 
      
      "Fast buying coin": "快速买币",
      "Crypto.com was founded in 2016 and is registered in Singapore, with its operational headquarters located in Dubai. The platform has established operation centers across multiple countries and regions, including the United States and Europe, expanding its business presence worldwide.": "Crypto.com 成立于2016年，注册于新加坡，运营总部位于迪拜。该平台已在美国和欧洲等多个国家和地区设立运营中心，将业务扩展到全球范围。",
      "Today, Crypto.com serves more than 50 million registered users globally, with over 3 million monthly active users and more than 80 million user interactions across its ecosystem.": "如今，Crypto.com 在全球为超过5000万注册用户提供服务，月活跃用户超过300万，其生态系统中的用户互动超过8000万次。",
      "As a comprehensive digital asset trading platform, Crypto.com supports over 800 high-quality cryptocurrencies and more than 1,000 trading pairs. The platform offers a rich selection of trading services, including spot trading, leveraged trading, OTC trading, contract trading, and credit-card-based cryptocurrency purchases.": "作为综合性数字资产交易平台，Crypto.com 支持超过800种优质加密货币和1000多个交易对。平台提供丰富的交易服务选择，包括现货交易、杠杆交易、场外交易、合约交易和基于信用卡的加密货币购买。",
      "By combining advanced technology with rigorous security standards, Crypto.com is committed to providing users with the safest, most efficient, and most professional digital asset investment experience available.": "通过将先进技术与严格的安全标准相结合，Crypto.com 致力于为用户提供最安全、最高效和最专业的数字资产投资体验。",
      "Home": "首页",

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
       "Online": "在线",
      "Service": "客服",
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
    "Welcome to visit Crypto.com": "欢迎访问 Crypto.com",
     "Minimum recharge amount：100.00USDT，Recharge less than the minimum amount will not be credited and cannot be returned": "最低充值金额：100.00USDT，低于最低金额的充值将不会到账且无法退回",
    "Recharge less than the minimum amount will not be credited and cannot be returned": "低于最低金额的充值将不会到账且无法退回",
    "Please select the correct recharge channel network, otherwise the assets will not be retrieved": "请选择正确的充值通道网络，否则资产将无法找回",
    "Your recharge address will not change frequently, and you can recharge repeatedly; If there is any change, we will try our best to notify you through website announcement or email": "您的充值地址不会频繁变更，可多次充值；如有任何变更，我们将尽力通过网站公告或邮件通知您",

    "Please make sure that the computer and browser are secure to prevent information from being tampered with or disclosed": "请确保电脑和浏览器安全，以防信息被篡改或泄露",
      /* Options trading */
      "Buy Up": "买涨",
      "Buy Fall": "买跌",
      "Confirm Order": "确认订单",
      "Selection Period": "选择周期",
      "Custom amount": "自定义金额",
      "Balance": "余额",
      "Transfer amount": "转账金额",
      "Please enter the transfer amount": "请输入转账金额",
      "Upload transfer voucher": "上传转账凭证",
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
    "fastbuy": "ซื้อด่วน",
     
      "Fast buying coin": "ซื้อเหรียญอย่างรวดเร็ว",
      "Crypto.com was founded in 2016 and is registered in Singapore, with its operational headquarters located in Dubai. The platform has established operation centers across multiple countries and regions, including the United States and Europe, expanding its business presence worldwide.": "Crypto.com ก่อตั้งขึ้นในปี 2016 และจดทะเบียนในสิงคโปร์ โดยมีสำนักงานใหญ่ด้านการดำเนินงานตั้งอยู่ในดูไบ แพลตฟอร์มนี้ได้จัดตั้งศูนย์ดำเนินงานในหลายประเทศและภูมิภาค รวมถึงสหรัฐอเมริกาและยุโรป ขยายการมีอยู่ของธุรกิจไปทั่วโลก",
      "Today, Crypto.com serves more than 50 million registered users globally, with over 3 million monthly active users and more than 80 million user interactions across its ecosystem.": "ปัจจุบัน Crypto.com ให้บริการผู้ใช้ที่ลงทะเบียนมากกว่า 50 ล้านคนทั่วโลก โดยมีผู้ใช้ประจำเดือนมากกว่า 3 ล้านคนและการโต้ตอบของผู้ใช้มากกว่า 80 ล้านครั้งทั่วทั้งระบบนิเวศของมัน",
      "As a comprehensive digital asset trading platform, Crypto.com supports over 800 high-quality cryptocurrencies and more than 1,000 trading pairs. The platform offers a rich selection of trading services, including spot trading, leveraged trading, OTC trading, contract trading, and credit-card-based cryptocurrency purchases.": "ในฐานะแพลตฟอร์มการซื้อขายสินทรัพย์ดิจิทัลที่ครอบคลุม Crypto.com รองรับ cryptocurrencies คุณภาพสูงกว่า 800 รายการและคู่ซื้อขายมากกว่า 1,000 คู่ แพลตฟอร์มนี้มีบริการการซื้อขายที่หลากหลาย รวมถึงการซื้อขาย现货 การซื้อขายด้วยเลเวอเรจ การซื้อขายนอกตลาด การซื้อขายสัญญา และการซื้อ cryptocurrencies ด้วยบัตรเครดิต",
      "By combining advanced technology with rigorous security standards, Crypto.com is committed to providing users with the safest, most efficient, and most professional digital asset investment experience available.": "โดยการรวมเทคโนโลยีขั้นสูงกับมาตรฐานความปลอดภัยที่เข้มงวด Crypto.com มุ่งมั่นที่จะให้ผู้ใช้มีประสบการณ์การลงทุนในสินทรัพย์ดิจิทัลที่ปลอดภัย มีประสิทธิภาพและเป็นมืออาชีพที่สุดที่มีอยู่",
      "Home": "หน้าแรก",
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
      "Online": "ออนไลน์",
      "Service": "บริการ",
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
      "Transfer amount": "จำนวนเงินที่โอน",
      "Please enter the transfer amount": "กรุณาใส่จำนวนเงินที่โอน",
      "Upload transfer voucher": "อัปโหลดหลักฐานการโอนเงิน",
    "The world's first social trading platform": "แพลตฟอร์มโซเชียลเทรดดิ้งแรกของโลก",
    "Crypto.com intro paragraph 1": "Crypto.com ก่อตั้งขึ้นในปี 2016 และจดทะเบียนในสิงคโปร์ ...",
    "Crypto.com intro paragraph 2": "แพลตฟอร์มมีผู้ใช้ลงทะเบียนมากกว่า 50 ล้านคน ...",
    "Crypto.com intro paragraph 3": "Crypto.com เป็นแพลตฟอร์มซื้อขายแบบครบวงจร ...",
    "online": "บริการออนไลน์",
    "fastbuy": "ซื้อด่วน",
    "Welcome to visit Crypto.com": "ยินดีต้อนรับสู่ Crypto.com",
    "Minimum recharge amount：100.00USDT，Recharge less than the minimum amount will not be credited and cannot be returned": "จำนวนเงินเติมขั้นต่ำ: 100.00USDT, การเติมเงินที่น้อยกว่าจำนวนเงินขั้นต่ำจะไม่ถูก credited และไม่สามารถคืนเงินได้",
    "Recharge less than the minimum amount will not be credited and cannot be returned": "การเติมเงินที่น้อยกว่าจำนวนขั้นต่ำจะไม่ได้รับการเติมและไม่สามารถคืนเงินได้",
    "Please select the correct recharge channel network, otherwise the assets will not be retrieved": "กรุณาเลือกเครือข่ายช่องทางการเติมเงินที่ถูกต้อง มิฉะนั้นจะไม่สามารถกู้คืนสินทรัพย์ได้",
    "Your recharge address will not change frequently, and you can recharge repeatedly; If there is any change, we will try our best to notify you through website announcement or email": "ที่อยู่การเติมเงินของคุณจะไม่เปลี่ยนแปลงบ่อย และคุณสามารถเติมเงินซ้ำได้； หากมีการเปลี่ยนแปลงใดๆ เราจะแจ้งให้คุณทราบผ่านประกาศบนเว็บไซต์หรืออีเมล",
    
    "Please make sure that the computer and browser are secure to prevent information from being tampered with or disclosed": "โปรดตรวจสอบให้แน่ใจว่าคอมพิวเตอร์และเบราว์เซอร์มีความปลอดภัย เพื่อป้องกันไม่ให้ข้อมูลถูกแก้ไขหรือเปิดเผย",
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
      "fastbuy": "Mua nhanh", 
      "Online": "Trực tuyến",
      "Service": "Dịch vụ",      
      "Fast buying coin": "Mua coin nhanh",
      "Crypto.com was founded in 2016 and is registered in Singapore, with its operational headquarters located in Dubai. The platform has established operation centers across multiple countries and regions, including the United States and Europe, expanding its business presence worldwide.": "Crypto.com được thành lập vào năm 2016 và đăng ký tại Singapore, với trụ sở điều hành đặt tại Dubai. Nền tảng này đã thiết lập các trung tâm vận hành trên nhiều quốc gia và khu vực, bao gồm Hoa Kỳ và Châu Âu, mở rộng sự hiện diện kinh doanh trên toàn thế giới.",
      "Today, Crypto.com serves more than 50 million registered users globally, with over 3 million monthly active users and more than 80 million user interactions across its ecosystem.": "Ngày nay, Crypto.com phục vụ hơn 50 triệu người dùng đã đăng ký trên toàn cầu, với hơn 3 triệu người dùng hoạt động hàng tháng và hơn 80 triệu tương tác người dùng trên toàn bộ hệ sinh thái của nó.",
      "As a comprehensive digital asset trading platform, Crypto.com supports over 800 high-quality cryptocurrencies and more than 1,000 trading pairs. The platform offers a rich selection of trading services, including spot trading, leveraged trading, OTC trading, contract trading, and credit-card-based cryptocurrency purchases.": "Là một nền tảng giao dịch tài sản kỹ thuật số toàn diện, Crypto.com hỗ trợ hơn 800 loại tiền điện tử chất lượng cao và hơn 1.000 cặp giao dịch. Nền tảng cung cấp một loạt các dịch vụ giao dịch phong phú, bao gồm giao dịch spot, giao dịch ký quỹ, giao dịch OTC, giao dịch hợp đồng và mua tiền điện tử dựa trên thẻ tín dụng.",
      "By combining advanced technology with rigorous security standards, Crypto.com is committed to providing users with the safest, most efficient, and most professional digital asset investment experience available.": "Bằng cách kết hợp công nghệ tiên tiến với các tiêu chuẩn bảo mật nghiêm ngặt, Crypto.com cam kết mang đến cho người dùng trải nghiệm đầu tư tài sản kỹ thuật số an toàn, hiệu quả và chuyên nghiệp nhất có sẵn.",
      "Home": "Trang chủ",
      "Buy Crypto": "Mua Crypto",
      "Money": "Tiền",
      "Submit order": "Gửi đơn hàng",
      "Transfer amount": "Số tiền chuyển",
      "Please enter the transfer amount": "Vui lòng nhập số tiền chuyển",
      "Upload transfer voucher": "Tải lên biên lai chuyển tiền",
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
    "online": "Dịch vụ trực tuyến",
    "fastbuy": "Mua nhanh",
    "Welcome to visit Crypto.com": "Chào mừng đến với Crypto.com",
     "Minimum recharge amount：100.00USDT，Recharge less than the minimum amount will not be credited and cannot be returned": "Số tiền nạp tối thiểu: 100.00 USDT, Nạp tiền ít hơn số tiền tối thiểu sẽ không được ghi có và không thể hoàn trả",
    "Recharge less than the minimum amount will not be credited and cannot be returned": "Nạp ít hơn số tiền tối thiểu sẽ không được ghi có và không thể hoàn trả",
    "Please select the correct recharge channel network, otherwise the assets will not be retrieved": "Vui lòng chọn đúng mạng lưới kênh nạp tiền, nếu không tài sản sẽ không thể thu hồi",
    "Your recharge address will not change frequently, and you can recharge repeatedly; If there is any change, we will try our best to notify you through website announcement or email": "Địa chỉ nạp tiền của bạn sẽ không thay đổi thường xuyên và bạn có thể nạp tiền nhiều lần； Nếu có bất kỳ thay đổi nào, chúng tôi sẽ cố gắng thông báo cho bạn qua thông báo trên trang web hoặc email",
    
    "Please make sure that the computer and browser are secure to prevent information from being tampered with or disclosed": "Vui lòng đảm bảo máy tính và trình duyệt an toàn để ngăn thông tin bị giả mạo hoặc tiết lộ",
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
     
      "Fast buying coin": "Compra rápida de monedas",
      "Crypto.com was founded in 2016 and is registered in Singapore, with its operational headquarters located in Dubai. The platform has established operation centers across multiple countries and regions, including the United States and Europe, expanding its business presence worldwide.": "Crypto.com fue fundada en 2016 y está registrada en Singapur, con su sede operativa ubicada en Dubái. La plataforma ha establecido centros de operaciones en múltiples países y regiones, incluidos Estados Unidos y Europa, expandiendo su presencia comercial en todo el mundo.",
      "Today, Crypto.com serves more than 50 million registered users globally, with over 3 million monthly active users and more than 80 million user interactions across its ecosystem.": "Hoy, Crypto.com sirve a más de 50 millones de usuarios registrados a nivel global, con más de 3 millones de usuarios activos mensuales y más de 80 millones de interacciones de usuarios en su ecosistema.",
      "As a comprehensive digital asset trading platform, Crypto.com supports over 800 high-quality cryptocurrencies and more than 1,000 trading pairs. The platform offers a rich selection of trading services, including spot trading, leveraged trading, OTC trading, contract trading, and credit-card-based cryptocurrency purchases.": "Como una plataforma integral de trading de activos digitales, Crypto.com admite más de 800 criptomonedas de alta calidad y más de 1,000 pares de trading. La plataforma ofrece una rica selección de servicios de trading, incluyendo trading spot, trading con apalancamiento, trading OTC, trading de contratos y compras de criptomonedas basadas en tarjetas de crédito.",
      "By combining advanced technology with rigorous security standards, Crypto.com is committed to providing users with the safest, most efficient, and most professional digital asset investment experience available.": "Al combinar tecnología avanzada con estándares de seguridad rigurosos, Crypto.com se compromete a proporcionar a los usuarios la experiencia de inversión en activos digitales más segura, eficiente y profesional disponible.",
      "Home": "Inicio",   

    "Please enter the confirmation password": "Por favor ingrese la contraseña de confirmación",
    "Please enter a new password": "Por favor ingrese una nueva contraseña",
    "New password": "Nueva contraseña",
    "Confirm password": "Confirmar contraseña",
    "Change Password": "Cambiar contraseña",

      "Online": "En línea",
      "Service": "Servicio",
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
    "Enter withdrawal quantity": "Ingrese la cantidad de retiro",
    "online": "Servicio en línea",
    "fastbuy": "Compra rápida",
    "Welcome to visit Crypto.com": "Bienvenido a Crypto.com",
    "Minimum recharge amount：100.00USDT，Recharge less than the minimum amount will not be credited and cannot be returned": "Monto mínimo de recarga: 100.00 USDT, Las recargas inferiores al monto mínimo no se acreditarán y no se podrán devolver",
    "Recharge less than the minimum amount will not be credited and cannot be returned": "Las recargas inferiores al monto mínimo no se acreditarán y no se pueden devolver",
    "Please select the correct recharge channel network, otherwise the assets will not be retrieved": "Seleccione la red de canal de recarga correcta, de lo contrario los activos no se podrán recuperar",
    "Your recharge address will not change frequently, and you can recharge repeatedly; If there is any change, we will try our best to notify you through website announcement or email": "Su dirección de recarga no cambiará con frecuencia y puede recargar repetidamente； Si hay algún cambio, haremos todo lo posible para notificarle a través de anuncios en el sitio web o por correo electrónico",
      "Transfer amount": "Monto de transferencia",
      "Please enter the transfer amount": "Por favor ingrese el monto de transferencia",
      "Upload transfer voucher": "Subir comprobante de transferencia",  
    "Please make sure that the computer and browser are secure to prevent information from being tampered with or disclosed": "Asegúrese de que la computadora y el navegador sean seguros para evitar que la información sea manipulada o divulgada",    
    
    
    
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
    "fastbuy": "Hızlı Satın Al",
     
      "Fast buying coin": "Hızlı coin satın alma",
      "Crypto.com was founded in 2016 and is registered in Singapore, with its operational headquarters located in Dubai. The platform has established operation centers across multiple countries and regions, including the United States and Europe, expanding its business presence worldwide.": "Crypto.com 2016 yılında kuruldu ve Singapur'da kayıtlı olup, operasyonel merkezi Dubai'de bulunmaktadır. Platform, Amerika Birleşik Devletleri ve Avrupa dahil olmak üzere birçok ülke ve bölgede operasyon merkezleri kurarak dünya çapında iş varlığını genişletmektedir.",
      "Today, Crypto.com serves more than 50 million registered users globally, with over 3 million monthly active users and more than 80 million user interactions across its ecosystem.": "Bugün, Crypto.com küresel olarak 50 milyondan fazla kayıtlı kullanıcıya hizmet vermekte, aylık 3 milyondan fazla aktif kullanıcıya sahip olmakta ve ekosistemi boyunca 80 milyondan fazla kullanıcı etkileşimi gerçekleşmektedir.",
      "As a comprehensive digital asset trading platform, Crypto.com supports over 800 high-quality cryptocurrencies and more than 1,000 trading pairs. The platform offers a rich selection of trading services, including spot trading, leveraged trading, OTC trading, contract trading, and credit-card-based cryptocurrency purchases.": "Kapsamlı bir dijital varlık ticaret platformu olarak Crypto.com, 800'den fazla yüksek kaliteli kripto para birimini ve 1.000'den fazla ticaret çiftini desteklemektedir. Platform, spot ticaret, kaldıraçlı ticaret, tezgah üstü ticaret, sözleşme ticareti ve kredi kartı tabanlı kripto para satın alımları dahil olmak üzere zengin bir ticaret hizmetleri seçkisi sunmaktadır.",
      "By combining advanced technology with rigorous security standards, Crypto.com is committed to providing users with the safest, most efficient, and most professional digital asset investment experience available.": "İleri teknolojiyi titiz güvenlik standartlarıyla birleştirerek, Crypto.com kullanıcılara mevcut en güvenli, en verimli ve en profesyonel dijital varlık yatırım deneyimini sağlamaya kendini adamıştır.",
      "Home": "Ana Sayfa",
    "Please enter the confirmation password": "Lütfen onay şifresini girin",
    "Please enter a new password": "Lütfen yeni bir şifre girin",
    "New password": "Yeni şifre",
    "Confirm password": "Şifreyi doğrulayın",
    "Change Password": "Şifreyi Değiştir",

      "Online": "Çevrimiçi",
      "Service": "Hizmet",
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
    "online": "Çevrimiçi Hizmet",
    "fastbuy": "Hızlı Satın Al",
    "Welcome to visit Crypto.com": "Crypto.com'a hoş geldiniz",
    "Minimum recharge amount：100.00USDT，Recharge less than the minimum amount will not be credited and cannot be returned": "Minimum şarj miktarı: 100.00 USDT, Minimum miktardan daha az şarj işlemleri hesaba aktarılmaz ve iade edilemez",
    "Recharge less than the minimum amount will not be credited and cannot be returned": "Minimum miktardan daha az yükleme yapılırsa hesaba geçirilmez ve iade edilemez",
    "Please select the correct recharge channel network, otherwise the assets will not be retrieved": "Lütfen doğru yükleme kanalı ağını seçin, aksi takdirde varlıklar alınamaz",
    "Your recharge address will not change frequently, and you can recharge repeatedly; If there is any change, we will try our best to notify you through website announcement or email": "Yükleme adresiniz sık değişmeyecek ve tekrar tekrar yükleme yapabilirsiniz； Herhangi bir değişiklik olursa, web sitesi duyurusu veya e-posta yoluyla size bildirmek için elimizden geleni yapacağız",
      "Transfer amount": "Transfer miktarı",
      "Please enter the transfer amount": "Lütfen transfer miktarını girin",
      "Upload transfer voucher": "Transfer fişi yükle",    
    "Please make sure that the computer and browser are secure to prevent information from being tampered with or disclosed": "Bilgilerin değiştirilmesini veya ifşa edilmesini önlemek için bilgisayarın ve tarayıcının güvenli olduğundan emin olun",    
    
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

