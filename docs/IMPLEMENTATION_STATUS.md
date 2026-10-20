# Implementation Status

Last updated: 2026-10-20

This page is the current at-a-glance status. The [Project Guide](PROJECT_GUIDE.md) explains the public app and inventory; the [Tenant Leasing Workflow](TENANT_LEASING_WORKFLOW.md) describes the tenant lifecycle, local workflow, and production integration boundary.

## Done

- Active React/Vite public renter experience: homepage, search/market routes, property detail, renter guides, and public inventory reads.
- Hosted Supabase inventory and search migrations 1-4, including RLS-protected public listing reads and saved-property/search tables.
- Authorized inventory importer and a documented 60-listing pilot across 20 markets.
- Local-only workflow schema covering applications, participants/consents, staff memberships, offers/holds, screening cases and required notices, payment ledger/allocations, security-deposit receipt/disposition, lease documents/signers/events, renewals, resident service requests, and notification outbox/delivery attempts.
- Pure workflow guards for screening/application transitions, offer eligibility, confirmed holding payments, provider-confirmed lease execution, security-deposit receipt, and final deposit reconciliation.
- Browser-local `/tenant-workflow` covering application entry, screening state, holding terms, lease review, security deposit, move-in checklist, maintenance request/status, renewal choice, move-out notice/checklist, deposit disposition, and an activity feed. It loads the selected public listing and stores workflow progress in the current browser tab.
- 38 versioned email templates with subject, plain-text, and HTML rendering, escaped interpolation, required-variable checks, secure-link validation, and approval gates for legally/operationally sensitive notices.
- Leasing workflow specification with tenant lifecycle, status models, holding-fee safeguards, notification catalog, implementation sequence, and acceptance gates.
- Append-only table grants for captured application consents, application events, and notification delivery attempts. No browser roles have grants on the new leasing tables.
- `npm run lint`, all 19 unit tests, and `npm run build` passed during this work. The build reports the existing Vite `__dirname` warning.

## Local Only

- Migrations `20261020000004_add_leasing_workflow_foundation.sql` and `20261020000005_add_screening_deposits_lease_workflows.sql` are not applied to the linked hosted database.
- Supabase CLI `2.121.0` is available via `npx`; it is not a project dependency.
- Browser-local workflow transitions use session storage and are not authoritative account records. The private workflow tables have no tenant/staff policies or application APIs; the domain guards are exercised by the local workflow service, not a trusted backend.
- Email templates render locally in code but are not connected to an email provider or delivery worker; no messages are sent. Sensitive legal templates require approved content before rendering.

## Blocked

- Local migration lint/integration test: `supabase start` and `supabase db start` fail during the internal Realtime migration with a Postgres connection timeout. Postgres reports healthy, the expected `supabase_admin` role exists, but Realtime does not establish a session before the CLI tears down the local containers. The new project migration has therefore not been validated by a running local database.
- Real applicant submission and screening: require a working migration test target, authenticated server-side API, provider integration, approved consent/screening policy versions, applicant data/retention rules, and operations ownership.
- Live payments, provider screening, tour booking, e-signature, email/SMS delivery, and resident operations: require approved providers, sandbox access, jurisdiction-specific policies, server-side credentials, and tested webhooks.

## Not Started

- Tenant sign-in/account UI and persisted saved-home/search UI.
- Authenticated application submission, staff review queues, multi-applicant account access, and database-backed application state transitions.
- Notification worker/provider adapters, delivery logs, tenant/staff template preview tooling, and production email/SMS delivery.
- Provider-backed holding/security-deposit checkout, refund/reconciliation, live screening/adverse-action delivery, legally executed lease provider callbacks, resident account integration, and operational maintenance/renewal/move-out workflows.
- Production end-to-end workflow tests, staff role provisioning procedure, operational monitoring/alerts, and release runbooks for leasing.

## Decisions Needed

- Choose backend runtime for authenticated workflows. Cloudflare Pages serves the static frontend only; Supabase Edge Functions or a separately hosted API are candidates.
- Choose/approve application, screening, payment, e-signature, tour, email/SMS, and resident-service providers.
- Approve market-specific application consent, holding fee/deposit classification, refund/credit rules, deadlines, notices, screening criteria, lease terms, and data retention with the responsible business/legal owners.
- Decide whether this remains an authorized public-site backup with external service handoffs or becomes an operational leasing product. Do not imply the latter until its systems and authorization are in place.

## Recommended Next Sequence

1. Resolve local Supabase startup or provide a disposable staging database and lint/test migrations 5 and 6 without touching production.
2. Record backend runtime and approved consent/policy ownership; provision staging configuration without committing secrets.
3. Implement the server-backed version of the existing local application flow: authenticated submission, server authorization, append-only application event, staff status update, and outbox notification.
4. Connect approved screening, payment, and e-signature providers to the existing workflow guards and add authorization, webhook/idempotency, reconciliation, and notification retry tests before live launch.
5. Update this status page in the same change as each feature, marking it done only after its tests and deployment/environment requirements are verified.