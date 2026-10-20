# Frontend Parity and Production Roadmap

Status date: 2026-10-20

This repository is an authorized frontend backup in progress. The active application is a Vite/React site. Inventory search and property detail can query Supabase when configured, but no verified inventory is loaded yet. Production account, application, payment, tour-booking, and resident-service workflows are not connected.

## Current Implementation

- Shared responsive site header and footer with local Invitation Homes logo and hamburger assets.
- Homepage sections for the renter value pillars, regional markets, communities, resident services, application guidance, apps, and testimonials.
- Search and market routes with URL-synchronized location, price, bed/bath, area, pet, Smart Home, sort, layout, and page state.
- Supabase-aware property repository with a paginated search RPC; local fixtures are used when Supabase is not configured.
- Property detail pages query by slug and include a photo gallery, rent/deposit summary, disclosures, school information, and affordability estimate.
- Optional property data fields for 360-degree tour and floor-plan media; viewer controls only appear when those assets exist.
- Qualification, before-you-apply, application-process, and leasing-fees pages.
- Google Maps component with clustered price markers and map/list selection wiring. A restricted Google Maps API key is required for map tiles; the no-key state is intentional.
- Playwright capture script at `scripts/capture-visual-parity.mjs` for desktop/mobile homepage screenshots and basic browser diagnostics.

## Remaining Frontend Work

### 1. Complete Visual Parity Review

- Run `npm run visual:capture` at 1440x900 and 390x844, review every capture against the official site, and fix layout, typography, assets, spacing, and responsive differences.
- Capture and compare search, market, property-detail, and renter-guide routes, not just the homepage.
- Confirm keyboard behavior, focus states, accessible names, mobile menu behavior, and map interactions.
- Treat screenshots as acceptance artifacts; do not describe the replica as pixel-identical until the comparison has been reviewed.

### 2. Finish Search and Map Experience

- Configure the authorized, domain-restricted Google Maps key and map ID in the deployment environment; verify tiles, clustering, info windows, zoom, and mobile gestures.
- Replace fixture inventory and market counts with an authorized inventory feed when the backend phase begins.
- Confirm result-card ordering, pagination, saved searches, empty states, and list/map synchronization against the official experience.

### 3. Complete Property Detail Parity

- Populate the actual property media and data fields, including image sets, floor plans, 360-degree tours, rent breakdowns, availability, disclosures, nearby information, and lease options.
- Match the official gallery/viewer, all-in pricing, and application/tour calls to action for each listing type.
- Do not invent tour links or access codes when a listing does not provide authorized values.

### 4. Complete Remaining Public Routes

- Reproduce the communities, difference/service, resident resource, FAQ, contact, privacy, and terms routes with page-specific content and layouts.
- Verify every navigation and footer destination against the official route inventory, including external resident, payment, support, investor, and career services.

## Backend Phase (In Progress)

- The initial migration `supabase/migrations/20261020000000_initial_rental_backend.sql` is applied to the linked hosted Supabase project. This workspace has no local `VITE_SUPABASE_URL` or public anon/publishable key configured.
- Import approved, verified listing data into `public.properties`; no seed inventory is included, and records remain private until marked published.
- Configure local and Cloudflare Pages `VITE_SUPABASE_URL` and public anon/publishable key values without committing them.
- Add Supabase-backed automated tests for `search_public_properties`, RLS access, and published/unpublished inventory behavior.
- Complete the authenticated saved-homes and saved-searches UI backed by the existing user-scoped RLS tables.
- Define any additional schema, migrations, RLS, and role policies before storing resident or applicant data.
- Connect authorized availability and application state when approved data/services are available.
- Integrate approved identity/income screening, e-signature, payment, tour scheduling, smart-lock, and maintenance providers as separate services.
- Keep secrets server-side. Do not put service-role keys, payment secrets, screening credentials, or lock codes in Vite client variables.

## Security and Release Gates

- The Express server contains a URL-fetching `/api/clone` endpoint. Before any public deployment, restrict or remove it, validate destinations against SSRF, add payload/time/rate limits, and protect access.
- Confirm authorization and asset usage for the target deployment and preserve required legal, privacy, fair-housing, and accessibility requirements.
- Test responsive behavior and browser compatibility, then add route and interaction tests for the renter workflows.
- Run `npm run lint`, `npm run build`, route smoke tests, and the visual capture suite in CI before release.
- Add production logging, monitoring, health checks, content/security headers, backup and rollback procedures, and an incident contact path.

## Useful Commands

```bash
npm ci
npm run dev
npm run lint
npm run build
npm run visual:capture
```

Set `VITE_GOOGLE_MAPS_API_KEY` and optionally `VITE_GOOGLE_MAP_ID` locally or in the deployment environment. Restrict the Maps key to approved origins and APIs; do not commit it.