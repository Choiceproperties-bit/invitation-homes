# Invitation Homes Platform — Development Roadmap & Architecture

This repository is pre-configured and architected to support continuous development into a full-scale **Single-Family Home Leasing and Property Management Platform**.

---

## 🏗️ Project Architecture & Structure

```
├── public/
│   ├── icons/                 # All 13 official SVGs from invitationhomes.com
│   └── Logo.svg               # Official primary brand vector logo
├── src/
│   ├── components/
│   │   ├── InvitationHomesApp.tsx  # Core interactive marketplace application
│   │   ├── InvitationIcons.tsx     # Reusable vector icon library
│   │   ├── LiveCloneView.tsx       # Live comparison & multi-device viewport engine
│   │   ├── AccuracyAudit.tsx       # Architectural parity audit
│   │   ├── FutureUseCases.tsx      # Roadmap & integration playbooks
│   │   └── QuickTranspiler.tsx     # AST HTML-to-React generator
│   ├── data/
│   │   ├── properties.ts           # Seed listings (single-family homes)
│   │   ├── presets.ts              # Curated site presets
│   │   └── repoBreakdown.ts        # Architecture critique and analysis
│   ├── types/
│   │   ├── rental.ts               # PropertyListing, Filters, Applications, Tours
│   │   └── index.ts                # Cloner AST types
│   ├── services/                   # Extension point for live MLS / Supabase / Stripe
│   ├── App.tsx                     # Top-level application shell
│   └── main.tsx                    # React 19 root
├── server.ts                       # Full-stack Node/Express engine + Cheerio AST scraper
├── package.json                    # Dependencies & dev scripts
└── README.md                       # Setup and usage guide
```

---

## 🎯 5-Phase Production Roadmap

### Phase 1: Dynamic Property Search & Map View
- [ ] Connect interactive Mapbox GL / Google Maps Platform with custom price pins.
- [ ] Multi-filter drawer: Minimum/Maximum Sqft, Move-in Date, Single-story vs Multi-story, Garage size.
- [ ] Real-time URL query param synchronization (`/search?city=Atlanta&beds=4&maxPrice=2500`).

### Phase 2: Property Detail Page (PDP) & Self-Guided Tours
- [ ] High-resolution photo gallery with full-screen lightbox modal.
- [ ] Matterport / 3D Virtual Tour embed viewer.
- [ ] Interactive self-guided tour scheduler with calendar time-slot selection.
- [ ] Smart Home lock code delivery integration (Rently / PointCentral API).

### Phase 3: Online Digital Lease Application
- [ ] Multi-step application wizard (Personal Info -> Employment/Income -> Rental History -> Pet Details).
- [ ] Plaid integration for instant income & bank verification.
- [ ] TransUnion / Experian credit & background check automation.
- [ ] E-Signature integration (DocuSign / HelloSign API).

### Phase 4: Resident Portal & Automated Rent Collection
- [ ] Tenant dashboard with upcoming rent due date and payment history.
- [ ] Stripe ACH bank transfer & credit card autopay.
- [ ] ProCare maintenance ticket submission with photo uploads and status tracker.
- [ ] Smart Home device manager (remote lock control, thermostat temperature presets).

### Phase 5: Owner & Property Manager CRM
- [ ] Portfolio performance dashboard: occupancy rate, average rent/sqft, delinquent accounts.
- [ ] Work order dispatch system for local vendor technicians.
- [ ] Automated lease renewal notification engine.

---

## 🔌 API & Integration Cheatsheet

### 1. Live MLS & Rental Listings API
```typescript
// RentCast API: https://www.rentcast.io/api
const res = await fetch('https://api.rentcast.io/v1/listings/rental/long-term?city=Atlanta&state=GA', {
  headers: { 'X-Api-Key': process.env.RENTCAST_API_KEY }
});
```

### 2. Database Connection (Supabase / PostgreSQL)
```typescript
import { createClient } from '@supabase/supabase-js';
export const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);
```

### 3. Stripe Rent Autopay
```typescript
import Stripe from 'stripe';
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
```
