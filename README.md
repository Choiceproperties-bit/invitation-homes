# Invitation Homes Frontend Replica

An authorized frontend backup project for the Invitation Homes website. The current implementation is a Vite + React application focused on matching the public renter experience. It is a frontend preview, not a production leasing or resident platform: inventory is fixture-backed, Google Maps requires a restricted API key, and authentication, applications, tours, payments, and resident services are not connected.

## Current Experience

- Responsive homepage with the official navigation structure, brand assets, market directory, service information, renter guidance, and testimonials.
- Search routes at `/search/houses-for-rent` and `/markets/houses-for-rent/:market` with fixture-based location, price, bedroom, bathroom, square-footage, pet, and Smart Home filters.
- URL-synchronized search filters, sort order, map/list mode, and pagination state.
- Property detail routes at `/houses-for-rent/:slug` with a photo gallery, rent summary, listing sections, and optional property-specific 360-degree tour or floor-plan media.
- Qualification, before-you-apply, application-process, and leasing-fees pages.
- Google Maps integration in the search view. Without a configured key, the page displays a setup message instead of a simulated map.
- A Playwright capture script for comparing the official and local homepages at desktop and mobile viewports.

These routes are a work in progress and have not been certified for pixel-perfect parity. The current property fixtures and some informational copy are previews and must be reconciled with authorized source data before launch.

## Technology

- React 19, TypeScript, Vite, and Tailwind CSS v4.
- Express server with Vite middleware in development and static-file serving in production.
- Google Maps React components and marker clustering.
- Playwright for browser-based visual capture and interaction checks.
- Cheerio and JSZip remain in the repository for the separate cloner/transpiler tooling; those tools are not mounted in the active official-site application shell.

## Local Development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The server uses the `PORT` environment variable when set.

### Google Maps

Set a browser-restricted Google Maps key in the local environment to enable map tiles and markers:

```bash
VITE_GOOGLE_MAPS_API_KEY=your-restricted-key
VITE_GOOGLE_MAP_ID=your-map-id
```

Do not commit API keys. `VITE_` values are included in browser code, so restrict the key to approved application origins and only the required Maps APIs. The map ID is optional; the component uses Google's demo map ID when none is provided.

## Validation and Capture

```bash
npm run lint
npm run build
npm run visual:capture
```

The capture script writes screenshots and a JSON report to `.artifacts/visual-parity/`, which is git-ignored. It captures the official and local homepages at 1440x900 and 390x844, and checks rendering, browser errors, image failures, and horizontal overflow. Install Playwright's browser first with `npx playwright install chromium`. On Linux systems missing browser libraries, `npx playwright install-deps chromium` requires system package installation privileges.

## Deploy a Preview to Cloudflare Pages

Cloudflare Pages can host the built frontend as a static site. This does not deploy the Express server or create a production leasing backend.

1. In the Cloudflare dashboard, open **Workers & Pages**, create a Pages application, and connect this GitHub repository.
2. Select `main` as the production branch and use these build settings:

	| Setting | Value |
	| --- | --- |
	| Framework preset | Vite |
	| Build command | `npm run build` |
	| Build output directory | `dist` |
	| Root directory | Repository root (leave the default) |

3. Set the build environment to Node.js 22 or newer (Vite 8 requires Node.js 20.19+ or 22.12+).
4. In the Pages project settings, add `VITE_GOOGLE_MAPS_API_KEY` and, optionally, `VITE_GOOGLE_MAP_ID` for both Preview and Production environments. Restrict the key to the approved Pages preview and production origins, and allow only the required Google Maps APIs. A `VITE_` value is public in the generated browser bundle; never use it for a secret.
5. Save the settings and trigger a deployment. Cloudflare builds the selected branch and publishes `dist`; use the generated `*.pages.dev` URL to review the preview. Add a custom domain only after the preview and authorization settings are verified.

The app uses client-side routes. Cloudflare Pages serves the SPA entry point for routes when no `404.html` is present; verify direct loads of `/search/houses-for-rent`, `/qualify`, and a property route on the deployed preview.

### Cloudflare Pages Runtime Boundary

Pages serves the static Vite output only. The local Express endpoints (`/api/clone` and `/api/transpile`) are not deployed by these settings. The active rental frontend does not depend on them, but any future feature that needs those endpoints must be moved to Pages Functions/Workers or a separately hosted API. Do not expose the URL-fetching clone endpoint publicly without SSRF protections, destination validation, request limits, and access controls.

## Production Status and Security Notes

The current frontend is not ready to serve as the live leasing backup. Before deployment, connect an authorized inventory source and the required operational services, implement error/loading states for those integrations, and complete desktop/mobile visual and accessibility reviews.

The Express server also contains development cloner endpoints, including `/api/clone`, which fetches a caller-provided URL. Do not expose this endpoint publicly until it has strict destination validation, SSRF protections, request limits, and appropriate access controls; remove or disable it from the production service if the cloner is not needed.

## Backend Direction

Supabase is the preferred future backend for application-owned data and authentication. Inventory, screening, applications, e-signatures, payments, maintenance dispatch, and smart-lock access will also require authorized provider APIs and appropriate security controls; Supabase by itself does not supply those services.

## Authorization and License

This project is maintained as an authorized Invitation Homes backup frontend. Use of the Invitation Homes name, marks, copy, and assets must remain within the authorization granted for this project. The repository license is MIT; that license does not grant rights to third-party marks or content beyond the applicable authorization.
