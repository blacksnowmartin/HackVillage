# Local setup

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open http://localhost:3000.

## Notes

- The app can run locally without a live PostgreSQL instance for the public event pages because the backend service includes a safe fallback for development.
- If you want to exercise the Prisma-backed path fully, set up PostgreSQL and run:

```bash
npm run db:migrate
npm run db:seed
```

## Verification

You can confirm the app is running with:

```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/events
```
