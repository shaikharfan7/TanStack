# Learning TanStack

Learning TanStack by coding manually for fun. This TanStack Start playground explores file-based routing, database-backed products, and interactive examples from the TanStack ecosystem.

## Features

- TanStack Start with file-based routing
- Prisma and SQLite product data
- TanStack Query fetching and cache invalidation
- TanStack Table sorting, filtering, and pagination
- TanStack Virtual list rendering
- TanStack Ranger range slider
- TanStack Form validation with an in-memory submission preview
- Tailwind CSS and a theme toggle

## Run locally

```bash
npm install
cp .env.example .env
npm run db:push
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To enable Google Analytics 4, set `VITE_GA_MEASUREMENT_ID` in `.env` to your
Measurement ID (for example, `G-XXXXXXXXXX`). The ID is public in the browser
bundle, not a secret. Leave it empty to disable analytics locally. Configure
the same variable in Render and redeploy to enable it for the deployed app.

The seed script can be run more than once; it adds missing products and updates their descriptions without duplicating existing rows.

## Build

```bash
npm run build
npm run start
```

## License

MIT. See the repository [LICENSE](../LICENSE).
