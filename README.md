# Calculator360

> **All-Around Online Calculators for Everyday Life, Health, Finance, & Mathematics**

Calculator360 is a fast, responsive, and privacy-first web application designed with Google Material Design 3 principles. It provides verified computational tools spanning multiple domains with zero external tracking, client-side execution, and full mobile app-like experiences.

---

## 🌟 Key Features

- **📍 Geography Auto-Detection**: Zero-latency client-side detection mapping browser timezone and locale to local currency and language without invasive geolocation prompts or IP tracking.
- **🌐 Multi-Lingual Support**: 9 global languages supported (English, Spanish, French, German, Hindi, Portuguese, Japanese, Chinese, and Arabic with full RTL layout support).
- **💱 Multi-Currency Architecture**: 10 global currencies (`USD`, `EUR`, `GBP`, `INR`, `JPY`, `CAD`, `AUD`, `BRL`, `CNY`, `AED`) with locale-specific formatting.
- **🏦 In-Tool Currency Switcher & Localized Presets**: Financial calculators (e.g. Loan & EMI) allow toggling currencies on the fly and adapt presets (e.g., ₹5 Lakh / ₹1 Crore vs $10k / $1M).
- **📱 Mobile App Experience**: Responsive bottom navigation, touch-optimized cards, swipeable category chips, and native back navigation.
- **⚡ Flagship Calculators**:
  - **Age Calculator**: Exact chronological age (years, months, days, hours, minutes, seconds), next birthday countdown, zodiac sign, planetary ages, heartbeats, and comparison mode.
  - **BMI Calculator**: Body mass index computation with WHO classification ranges, metric/imperial unit toggle, and healthy weight targets.
  - **Percentage Calculator**: 4 common computational modes with step-by-step visual formulas.
  - **Loan & EMI Calculator**: Monthly payments, total interest, principal-to-interest breakdown, and year-by-year amortization schedules.
- **🔍 Fast Search**: Full-text modal search with keyboard shortcuts (`⌘K` / `Ctrl+K`).
- **🌓 Material Design 3 Theming**: Seamless dark and light mode toggle with contrast preservation.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Google Material Design 3 CSS Variables & Utility Design System
- **Icons**: Lucide Icons
- **i18n & Formatting**: Native `Intl` API (`Intl.NumberFormat`, `Intl.DateTimeFormat`)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm / pnpm / yarn

### Installation

```bash
# Clone repository
git clone https://github.com/Atulscript/calculator.git
cd calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be accessible at `http://localhost:3000/`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📄 License

MIT License. Free for personal and commercial use.
