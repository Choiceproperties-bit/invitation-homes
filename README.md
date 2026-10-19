# Invitation Homes Cloner & Zero-AI Web Inspector

> A high-fidelity, production-grade reverse-engineered clone of **Invitation Homes** (`https://www.invitationhomes.com/`) built with React 19, Next.js, and Tailwind CSS v4. Features a built-in **Zero-AI Deterministic Cloner & AST Transpiler Engine** that extracts HTML sections, design tokens, color palettes, and assets without requiring external AI APIs or subscriptions.

---

## 🌟 Key Features

- **Houses for Rent \| Invitation Homes Replica**:
  - Interactive Location Search by city, state, or zip code.
  - Bedrooms & Maximum Price Filtering.
  - 4 Interactive Value Pillars (*More value, More simplicity, More flexibility, More Genuine CARE™*) with live Contentful CDN photography.
  - 16 Premier US Metro Markets directory (*Atlanta, Austin, Dallas-Fort Worth, Phoenix, etc.*).
  - ProCare maintenance and Smart Home feature highlights.
- **Side-by-Side Fidelity Split View**:
  - Direct live comparison between the React 19 clone and the original `invitationhomes.com` website.
- **Accuracy & Parity Audit**:
  - Dimension-by-dimension breakdown of visual layout, typography, interactivity, and backend architecture limitations.
- **Zero-AI Cloner Studio**:
  - Scrapes public URLs or arbitrary HTML using a deterministic AST parser (Cheerio + regex).
  - Decomposes layouts into modular `.tsx` components (`Navbar.tsx`, `Hero.tsx`, `Pillars.tsx`, `Footer.tsx`).
  - Generates custom `tailwind.config.js` with detected brand color palettes and typography.
  - 1-click **Export Project ZIP** bundle.
- **HTML → React 19 Transpiler**:
  - Paste any DOM snippet directly from Chrome DevTools (*Inspect Element > Copy outerHTML*) to transpile instantly into clean JSX with self-closing tags and converted style attributes.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React
- **Backend / Engine**: Express, Vite middleware, Cheerio DOM parser
- **Archival & Export**: JSZip

---

## 🚀 Getting Started

### 1. Installation

```bash
git clone https://github.com/choice121/invitation-homes-cloner.git
cd invitation-homes-cloner
npm install
```

### 2. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build

```bash
npm run build
npm start
```

---

## ⚖️ Legal & Ethical Notice

This codebase is provided strictly for educational purposes, architecture evaluation, and frontend reverse-engineering studies. Trademarks, brand names, and logos belong to their respective owners (Invitation Homes Inc.).

---

## 📄 License

MIT License
