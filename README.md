# Learning TanStack

Learning TanStack by coding manually for fun. This is a small TanStack Start playground for exploring the TanStack ecosystem through working examples.

- **Live demo:** [tanstack-6hzx.onrender.com](https://tanstack-6hzx.onrender.com/)
- **Source code:** [github.com/shaikharfan7/TanStack](https://github.com/shaikharfan7/TanStack)
- **TanStack:** [github.com/TanStack](https://github.com/TanStack)

## What’s included

- TanStack Start and file-based routing
- Product browsing backed by Prisma and SQLite
- TanStack Query data fetching and cache invalidation
- TanStack Table sorting, filtering, and pagination
- TanStack Virtual for long lists
- TanStack Ranger interactive range slider
- Tailwind CSS styling and light/dark theme toggle

## Run locally

The application is in the `my-app` directory. From the repository root:

```bash
cd my-app
npm install
```

Create a local environment file if you don’t already have one:

```bash
cp .env.example .env
```

Prepare and seed the SQLite database, then start the development server:

```bash
npm run db:push
npm run db:seed
npm run dev
```

The app is available at [http://localhost:3000](http://localhost:3000).

## Database

Prisma uses SQLite. The local connection is configured by `DATABASE_URL` in `my-app/.env`; `.env.example` contains the development value. The seed script inserts example products and updates their descriptions, and can be run repeatedly without duplicating products.

The checked-in SQLite database is intended for this learning demo. A deployment that needs database writes to persist across redeploys should use persistent storage; a database file in the application checkout is not durable storage.

## Build

From `my-app`:

```bash
npm run build
npm run start
```

## License

This project is licensed under the [MIT License](LICENSE).
