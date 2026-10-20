# Production Roadmap

Status date: 2026-10-20

## Status Summary

The authorized Vite/React backup has a working public listing/search integration and a **60-listing pilot across 20 markets** in the linked Supabase project. The sync is repeatable and defaults to a dry-run sample. This is a development pilot, not the full property catalog and not a production leasing/resident platform.

Search, market routes, property details, renter guides, public inventory RLS, and the market-aware search RPC are implemented. The original public application handoff is linked when available. Authentication, saved-home persistence, application submission/status, self-tour scheduling, payments, screening, and resident service workflows remain unconnected.

For repository structure, exact sync behavior, configuration, data fields, migrations, security boundaries, and commands, see [docs/PROJECT_GUIDE.md](docs/PROJECT_GUIDE.md).

## Implemented and Verified

- Responsive public homepage, shared site chrome, renter guides, search/map/list view, property detail, and generic public-information routes.
- Supabase inventory tables, RLS, published-only search, UUID-aware search response, extended source fields, and exact market-slug filtering.
- Authorized source importer at `scripts/sync-official-inventory.mjs`. Default mode is dry-run, selecting three listings per market; pilot upserts use source IDs and do not copy image binaries.
- 60 source-managed listings across 20 source markets. 58 have photo URLs; the imported pilot has fees, lease terms, and school data for all records.
- Supabase integration test `npm run test:supabase`; test fixtures are transaction-scoped and rolled back.
- Production builds, TypeScript checks, five unit tests, hosted RLS/search checks, and hosted schema lint pass.
- `/api/clone` and `/api/transpile` are not registered in production. In development they require `ENABLE_CLONER_API=true`; that flag is not protection against untrusted traffic.
- User-provided HTML preview in the dormant transpiler is sandboxed. Unsupported hard-coded parity-score panel was removed.

## Current External Configuration

- Supabase schema and pilot data are in the linked hosted project. The local workspace does not persist Supabase URL/anon-key configuration; configure the public key and URL in an ignored local environment file or deployment settings to see hosted listings.
- Google Maps requires a browser-restricted key and optional map ID. Map tiles have not been validated with production credentials.
- ImageKit transformation support exists, but no ImageKit URL endpoint is configured. Images still load from the authorized source CDN. The current integration optimizes a remote origin and does not upload images or reduce storage at the original host.
- The Playwright capture is not verified in this container: Chromium's Linux dependency `libatk-1.0.so.0` is unavailable. The capture script currently covers the homepage; broader route visual checks remain.

## Next Work, in Order

### 1. Validate the Backup Experience

- Configure persistent Supabase public client variables and a restricted Maps key for a staging/preview environment.
- Test market filters, all-in rent display, application handoff, photo/floor-plan galleries, empty states, and direct route loads against the 60-listing pilot.
- Configure ImageKit's approved remote origin and URL endpoint if desired, then compare delivery, transformations, failures, and mobile performance.
- Install browser system dependencies in CI or a suitable host and capture homepage, search, market, property-detail, and renter-guide routes at desktop and mobile widths.
- Add accessibility/keyboard review and route/interactions tests before claiming parity.

### 2. Make Inventory Sync Operational

- Review a full-catalog dry run before using `--all --apply`; verify per-market counts, unique source IDs, status mapping, photos, fee records, and rate limits.
- Add import-run tracking, retry/resume, stale-listing reconciliation, rollback/restore guidance, and alerts. Current upserts do not unpublish records missing from a later source response.
- Decide whether the 60-listing sample stays as staging content or is replaced with complete approved inventory.
- Add source freshness indicators and a scheduled sync only after operations ownership and failure handling are defined.

### 3. Implement Renter and Resident Workflows

- Add authenticated saved homes and searches using existing RLS tables; map public slugs to database UUIDs.
- Keep applications, applicant PII, payments, screening, e-signature, tour booking, resident maintenance, and smart-lock functions in separate approved provider integrations.
- Before storing sensitive user data, define schemas, RLS/policies, consent, retention, audit logging, incident response, and applicable legal/fair-housing controls.
- Never store lock access credentials in public listing records or client-visible fields.

### 4. Finish Public Content and Release Operations

- Replace generic content fallbacks with approved page-specific copy/layouts, or deliberately link users to authorized official services.
- Verify every header/footer link, privacy/terms/cookie controls, Equal Housing/accessibility content, and external service destinations.
- Add production monitoring, structured logging, health checks, content/security headers, backups, rollback procedure, and CI release gates.
- Resolve the Vite `__dirname` configuration warning and the outstanding browser visual-check environment issue.

## Database Migrations

All four migrations below are applied to the currently linked Supabase project:

1. `20261020000000_initial_rental_backend.sql` creates property inventory, saved-data tables, RLS, grants, and the original search RPC.
2. `20261020000001_add_property_uuid_to_search.sql` adds the UUID-aware v2 search RPC.
3. `20261020000002_add_official_inventory_fields.sql` adds source identity/details and expands the property data returned to the app.
4. `20261020000003_add_market_slug_search.sql` adds market-slug filtering used by market routes.

Run `npx supabase@latest migration list --linked` to compare local and remote migration history. Preview changes with `npx supabase@latest db push --linked --dry-run` before applying a migration.

## Release Checks

```bash
npm run lint
npm test
npm run build
npm run test:supabase
npm run visual:capture
```

See the Project Guide for command details, staging recommendations, and credential handling.