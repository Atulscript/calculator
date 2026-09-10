export interface LanguageInfo {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' }
];

export type TranslationKey =
  | 'brand_tagline'
  | 'hero_title'
  | 'hero_subtitle'
  | 'search_placeholder'
  | 'explore_btn'
  | 'categories_title'
  | 'categories_subtitle'
  | 'browse_domain'
  | 'calculate_now'
  | 'home'
  | 'categories'
  | 'search'
  | 'popular'
  | 'dark_mode'
  | 'light_mode'
  | 'back_to_home'
  | 'footer_desc'
  | 'privacy_guarantee'
  | 'zero_tracking'
  | 'standards_title'
  | 'standards_accuracy'
  | 'all_rights_reserved'
  | 'currency_option'
  | 'select_language'
  | 'select_currency'
  | 'auto_detected'
  | 'loan_amount'
  | 'interest_rate'
  | 'loan_tenure'
  | 'monthly_emi'
  | 'total_interest'
  | 'total_amount'
  | 'principal'
  | 'interest';

export const TRANSLATIONS: Record<string, Record<TranslationKey, string>> = {
  en: {
    brand_tagline: 'Fast, Free Calculators with Clear Formulas',
    hero_title: 'Free online calculators for money, health, dates and maths',
    hero_subtitle: 'Fast, free calculators for EMI, SIP, BMI, age, percentages and unit conversions. Clear formulas, worked examples and no sign-up. Works on any phone.',
    search_placeholder: 'Search calculators (e.g. age, bmi, loan, percent)...',
    explore_btn: 'Explore',
    categories_title: 'Explore Categories',
    categories_subtitle: 'Navigate to focused tools built for specific problem domains',
    browse_domain: 'Browse',
    calculate_now: 'Calculate',
    home: 'Home',
    categories: 'Categories',
    search: 'Search',
    popular: 'Popular',
    dark_mode: 'Dark',
    light_mode: 'Light',
    back_to_home: 'Back to Home',
    footer_desc: 'Precision online computational tools designed for everyday life, health, finance, and science. Clean, verified, and completely free to use.',
    privacy_guarantee: '100% Client-Side Privacy Guarantee',
    zero_tracking: 'Zero tracking & zero external database logging',
    standards_title: 'Standards & Accuracy',
    standards_accuracy: 'Verified Mathematical Standards',
    all_rights_reserved: 'All rights reserved.',
    currency_option: 'Currency',
    select_language: 'Select Language',
    select_currency: 'Select Currency',
    auto_detected: 'Auto-detected from location',
    loan_amount: 'Loan Amount (Principal)',
    interest_rate: 'Annual Interest Rate (%)',
    loan_tenure: 'Loan Tenure',
    monthly_emi: 'Monthly EMI Payment',
    total_interest: 'Total Interest Cost',
    total_amount: 'Total Amount (P + I)',
    principal: 'Principal',
    interest: 'Interest'
  },
  es: {
    brand_tagline: 'Calculadoras en Línea Completas',
    hero_title: 'Calculadoras diseñadas para la precisión diaria',
    hero_subtitle: 'Explore nuestra biblioteca de herramientas verificadas para vida cotidiana, salud, finanzas y matemáticas.',
    search_placeholder: 'Buscar calculadoras (edad, imc, préstamo, porcentaje)...',
    explore_btn: 'Explorar',
    categories_title: 'Explorar Categorías',
    categories_subtitle: 'Herramientas enfocadas en áreas temáticas específicas',
    browse_domain: 'Explorar',
    calculate_now: 'Calcular',
    home: 'Inicio',
    categories: 'Categorías',
    search: 'Buscar',
    popular: 'Popular',
    dark_mode: 'Oscuro',
    light_mode: 'Claro',
    back_to_home: 'Volver al Inicio',
    footer_desc: 'Herramientas de cálculo precisas para vida diaria, salud, finanzas y ciencia. Gratuitas y privadas.',
    privacy_guarantee: '100% Privacidad Garantizada en el Cliente',
    zero_tracking: 'Sin rastreo ni almacenamiento en bases de datos',
    standards_title: 'Estándares y Precisión',
    standards_accuracy: 'Fórmulas Matemáticas Verificadas',
    all_rights_reserved: 'Todos los derechos reservados.',
    currency_option: 'Moneda',
    select_language: 'Seleccionar Idioma',
    select_currency: 'Seleccionar Moneda',
    auto_detected: 'Detectado automáticamente por ubicación',
    loan_amount: 'Monto del Préstamo (Capital)',
    interest_rate: 'Tasa de Interés Anual (%)',
    loan_tenure: 'Plazo del Préstamo',
    monthly_emi: 'Cuota Mensual (EMI)',
    total_interest: 'Interés Total',
    total_amount: 'Monto Total a Pagar',
    principal: 'Capital',
    interest: 'Interés'
  },
  fr: {
    brand_tagline: 'Calculatrices en Ligne Précises',
    hero_title: 'Des calculatrices conçues pour la précision quotidienne',
    hero_subtitle: 'Accédez à nos outils vérifiés pour la vie quotidienne, la santé, les finances et les mathématiques.',
    search_placeholder: 'Rechercher des calculatrices (âge, imc, prêt, pourcentage)...',
    explore_btn: 'Explorer',
    categories_title: 'Explorer les Catégories',
    categories_subtitle: 'Accédez à des outils ciblés par domaine',
    browse_domain: 'Parcourir',
    calculate_now: 'Calculer',
    home: 'Accueil',
    categories: 'Catégories',
    search: 'Recherche',
    popular: 'Populaire',
    dark_mode: 'Sombre',
    light_mode: 'Clair',
    back_to_home: 'Retour à l\'Accueil',
    footer_desc: 'Outils de calcul précis pour le quotidien, la santé, les finances et les sciences. Gratuits et privés.',
    privacy_guarantee: 'Garantie de Confidentialité 100% Locale',
    zero_tracking: 'Aucun suivi ni stockage externe',
    standards_title: 'Normes & Précision',
    standards_accuracy: 'Formules Mathématiques Vérifiées',
    all_rights_reserved: 'Tous droits réservés.',
    currency_option: 'Devise',
    select_language: 'Choisir la Langue',
    select_currency: 'Choisir la Devise',
    auto_detected: 'Détecté selon votre région',
    loan_amount: 'Montant du Prêt (Principal)',
    interest_rate: 'Taux d\'Intérêt Annuel (%)',
    loan_tenure: 'Durée du Prêt',
    monthly_emi: 'Mensualité (EMI)',
    total_interest: 'Total des Intérêts',
    total_amount: 'Montant Total Dû',
    principal: 'Capital',
    interest: 'Intérêts'
  },
  de: {
    brand_tagline: 'Präzise Online-Rechner',
    hero_title: 'Rechner für tägliche Genauigkeit',
    hero_subtitle: 'Geprüfte Rechenwerkzeuge für Alltag, Gesundheit, Finanzen und Mathematik.',
    search_placeholder: 'Rechner suchen (Alter, BMI, Kredit, Prozent)...',
    explore_btn: 'Erkunden',
    categories_title: 'Kategorien entdecken',
    categories_subtitle: 'Spezifische Werkzeuge für gezielte Berechnungen',
    browse_domain: 'Öffnen',
    calculate_now: 'Berechnen',
    home: 'Start',
    categories: 'Kategorien',
    search: 'Suche',
    popular: 'Beliebt',
    dark_mode: 'Dunkel',
    light_mode: 'Hell',
    back_to_home: 'Zurück zur Startseite',
    footer_desc: 'Präzise Rechenwerkzeuge für Alltag, Gesundheit, Finanzen und Wissenschaft. Kostenlos und privat.',
    privacy_guarantee: '100% Datenschutzgarantie auf Clientseite',
    zero_tracking: 'Kein Tracking und keine externen Serverlogs',
    standards_title: 'Standards & Genauigkeit',
    standards_accuracy: 'Verifizierte mathematische Formeln',
    all_rights_reserved: 'Alle Rechte vorbehalten.',
    currency_option: 'Währung',
    select_language: 'Sprache wählen',
    select_currency: 'Währung wählen',
    auto_detected: 'Automatisch nach Standort erkannt',
    loan_amount: 'Kreditbetrag (Kapital)',
    interest_rate: 'Jährlicher Zinssatz (%)',
    loan_tenure: 'Kreditlaufzeit',
    monthly_emi: 'Monatliche Rate (EMI)',
    total_interest: 'Gesamtzinsen',
    total_amount: 'Gesamtbetrag',
    principal: 'Hauptbetrag',
    interest: 'Zinsen'
  },
  hi: {
    brand_tagline: 'सटीक ऑनलाइन कैलकुलेटर',
    hero_title: 'दैनिक जीवन के लिए सटीक कैलकुलेटर',
    hero_subtitle: 'उम्र, स्वास्थ्य, लोन, वित्त, और गणित के लिए सत्यापित ऑनलाइन कैलकुलेटर।',
    search_placeholder: 'कैलकुलेटर खोजें (उम्र, बीएमआई, लोन, प्रतिशत)...',
    explore_btn: 'खोजें',
    categories_title: 'श्रेणियाँ देखें',
    categories_subtitle: 'विशिष्ट विषयों के लिए बनाए गए उपयोगी टूल्स',
    browse_domain: 'देखें',
    calculate_now: 'गणना करें',
    home: 'होम',
    categories: 'श्रेणियाँ',
    search: 'खोजें',
    popular: 'लोकप्रिय',
    dark_mode: 'डार्क',
    light_mode: 'लाइट',
    back_to_home: 'होम पेज पर वापस जाएं',
    footer_desc: 'रोजमर्रा की जिंदगी, स्वास्थ्य और वित्त के लिए सटीक ऑनलाइन कैलकुलेटर। पूरी तरह से मुफ्त और सुरक्षित।',
    privacy_guarantee: '100% क्लाइंट-साइड गोपनीयता गारंटी',
    zero_tracking: 'शून्य ट्रैकिंग और सुरक्षित डेटा',
    standards_title: 'मानक और सटीकता',
    standards_accuracy: 'प्रमाणित गणितीय सूत्र',
    all_rights_reserved: 'सर्वाधिकार सुरक्षित।',
    currency_option: 'मुद्रा (Currency)',
    select_language: 'भाषा चुनें',
    select_currency: 'मुद्रा चुनें',
    auto_detected: 'आपके स्थान से स्वतः पहचाना गया',
    loan_amount: 'ऋण राशि (मूलधन)',
    interest_rate: 'वार्षिक ब्याज दर (%)',
    loan_tenure: 'ऋण अवधि (Tenure)',
    monthly_emi: 'मासिक ईएमआई (EMI)',
    total_interest: 'कुल ब्याज लागत',
    total_amount: 'कुल भुगतान (मूल + ब्याज)',
    principal: 'मूलधन',
    interest: 'ब्याज'
  },
  pt: {
    brand_tagline: 'Calculadoras Online Precisas',
    hero_title: 'Calculadoras projetadas para precisão diária',
    hero_subtitle: 'Ferramentas de cálculo verificadas para saúde, finanças e matemática.',
    search_placeholder: 'Pesquise calculadoras (idade, imc, empréstimo, porcentagem)...',
    explore_btn: 'Explorar',
    categories_title: 'Explorar Categorias',
    categories_subtitle: 'Ferramentas focadas para áreas específicas',
    browse_domain: 'Navegar',
    calculate_now: 'Calcular',
    home: 'Início',
    categories: 'Categorias',
    search: 'Pesquisar',
    popular: 'Popular',
    dark_mode: 'Escuro',
    light_mode: 'Claro',
    back_to_home: 'Voltar ao Início',
    footer_desc: 'Ferramentas de cálculo precisas para vida diária, saúde, finanças e ciência. Gratuitas e privadas.',
    privacy_guarantee: '100% de Privacidade no Cliente',
    zero_tracking: 'Sem rastreamento nem registro em banco de dados',
    standards_title: 'Padrões e Precisão',
    standards_accuracy: 'Fórmulas Matemáticas Verificadas',
    all_rights_reserved: 'Todos os direitos reservados.',
    currency_option: 'Moeda',
    select_language: 'Selecionar Idioma',
    select_currency: 'Selecionar Moeda',
    auto_detected: 'Detectado automaticamente por localização',
    loan_amount: 'Valor do Empréstimo (Principal)',
    interest_rate: 'Taxa de Juros Anual (%)',
    loan_tenure: 'Prazo do Empréstimo',
    monthly_emi: 'Parcela Mensal (EMI)',
    total_interest: 'Total de Juros',
    total_amount: 'Total a Pagar',
    principal: 'Principal',
    interest: 'Juros'
  },
  ja: {
    brand_tagline: '精密オンライン計算ツール',
    hero_title: '日々の精度のために設計された計算機',
    hero_subtitle: '日常生活、健康、財務、数学の分野で検証済みの計算ツールをご利用ください。',
    search_placeholder: '計算機を検索（年齢、BMI、ローン、パーセントなど）...',
    explore_btn: '探索',
    categories_title: 'カテゴリーを見る',
    categories_subtitle: '特定の問題分野に特化した高精度ツール',
    browse_domain: '開く',
    calculate_now: '計算する',
    home: 'ホーム',
    categories: 'カテゴリー',
    search: '検索',
    popular: '人気',
    dark_mode: 'ダーク',
    light_mode: 'ライト',
    back_to_home: 'ホームに戻る',
    footer_desc: '日常生活、健康、財務、科学のための精密な計算ツール。完全無料でプライバシー保護。',
    privacy_guarantee: '100% クライアント側プライバシー保証',
    zero_tracking: 'トラッキングなし・外部データベース不使用',
    standards_title: '標準と精度',
    standards_accuracy: '検証済みの数学的公式',
    all_rights_reserved: '無断転載を禁じます。',
    currency_option: '通貨',
    select_language: '言語を選択',
    select_currency: '通貨を選択',
    auto_detected: '地域から自動検出',
    loan_amount: '融資金額（元金）',
    interest_rate: '年利率（%）',
    loan_tenure: '返済期間',
    monthly_emi: '毎月の返済額（EMI）',
    total_interest: '利息合計',
    total_amount: '総返済額（元金＋利息）',
    principal: '元金',
    interest: '利息'
  },
  zh: {
    brand_tagline: '全方位在线精确计算工具',
    hero_title: '专为日常精确计算设计的计算器',
    hero_subtitle: '探索涵盖日常生活、健康、金融、烹饪及数学的经检验计算工具。',
    search_placeholder: '搜索计算器（年龄、BMI、贷款、百分比）...',
    explore_btn: '浏览',
    categories_title: '浏览分类',
    categories_subtitle: '按专门领域分类的实用计算工具',
    browse_domain: '查看',
    calculate_now: '计算',
    home: '首页',
    categories: '分类',
    search: '搜索',
    popular: '热门',
    dark_mode: '深色',
    light_mode: '浅色',
    back_to_home: '返回首页',
    footer_desc: '适用于日常生活、健康、金融与科学的精密计算工具。完全免费，保护隐私。',
    privacy_guarantee: '100% 客户端本地隐私保证',
    zero_tracking: '零追踪、无外部数据存储',
    standards_title: '标准与准确性',
    standards_accuracy: '经严格验证的数学公式',
    all_rights_reserved: '版权所有。',
    currency_option: '货币',
    select_language: '选择语言',
    select_currency: '选择货币',
    auto_detected: '根据您所在地区自动识别',
    loan_amount: '贷款金额（本金）',
    interest_rate: '年利率 (%)',
    loan_tenure: '还款期限',
    monthly_emi: '每月还款额 (EMI)',
    total_interest: '支付总利息',
    total_amount: '还款总额（本金+利息）',
    principal: '本金',
    interest: '利息'
  },
  ar: {
    brand_tagline: 'حاسبات إلكترونية دقيقة وشاملة',
    hero_title: 'حاسبات مصممة للدقة اليومية',
    hero_subtitle: 'ابحث في مكتبتنا عن أدوات حسابية معتمدة للحياة اليومية والصحة والمال والرياضيات.',
    search_placeholder: 'ابحث عن الحاسبات (العمر، كتلة الجسم، القرض، النسبة)...',
    explore_btn: 'استكشاف',
    categories_title: 'استكشاف الفئات',
    categories_subtitle: 'أدوات مخصصة لمجالات حسابية محددة',
    browse_domain: 'تصفح',
    calculate_now: 'احسب',
    home: 'الرئيسية',
    categories: 'الفئات',
    search: 'بحث',
    popular: 'الشائع',
    dark_mode: 'داكن',
    light_mode: 'فاتح',
    back_to_home: 'العودة للرئيسية',
    footer_desc: 'أدوات حسابية دقيقة للحياة اليومية والصحة والمال والعلوم. مجانية تماماً وخاصة.',
    privacy_guarantee: 'ضمان خصوصية محلي بنسبة 100%',
    zero_tracking: 'بدون أي تتبع أو تسجيل بيانات خارجية',
    standards_title: 'المعايير والدقة',
    standards_accuracy: 'معادلات رياضية موثقة',
    all_rights_reserved: 'جميع الحقوق محفوظة.',
    currency_option: 'العملة',
    select_language: 'اختر اللغة',
    select_currency: 'اختر العملة',
    auto_detected: 'تم التعرف التلقائي حسب موقعك',
    loan_amount: 'مبلغ القرض (الأصل)',
    interest_rate: 'معدل الفائدة السنوي (%)',
    loan_tenure: 'مدة القرض',
    monthly_emi: 'القسط الشهري (EMI)',
    total_interest: 'إجمالي الفائدة',
    total_amount: 'إجمالي المبلغ المستحق',
    principal: 'أصل القرض',
    interest: 'الفائدة'
  }
};

export function getLanguage(code: string): LanguageInfo {
  return SUPPORTED_LANGUAGES.find(l => l.code === code) || SUPPORTED_LANGUAGES[0];
}

export function getTranslation(lang: string, key: TranslationKey): string {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS['en'];
  return dict[key] || TRANSLATIONS['en'][key] || key;
}
