# RidefleetAZ — Next.js Landing + Funnel

This repository contains a production-minded Next.js (App Router) TypeScript app built for RidefleetAZ — a vehicle rental service for rideshare and gig drivers. The site includes a high-converting multi-step application funnel, admin dashboard, file uploads, email notifications, Prisma DB (SQLite for dev), and basic protections.

https://ridefleetaz.vercel.app/

Quick start

1. Install dependencies

```bash
npm install
```

2. Copy env

```bash
cp .env.example .env
# edit .env and set ADMIN_PASSWORD and DATABASE_URL
```

3. Generate Prisma client and migrate

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

4. Run dev

```bash
npm run dev
```

Environment variables
- `ADMIN_PASSWORD` — password for admin area
- `ADMIN_EMAIL` — receives notifications
- `SMTP_HOST/PORT/USER/PASS` — SMTP for Nodemailer (optional; dev logs to console)
- `DATABASE_PROVIDER` and `DATABASE_URL` — set to `sqlite` + `file:./dev.db` for local
- `UPLOAD_DIR` — optional, defaults to `./uploads`

Uploads
- Local dev uses `./uploads` (private directory). Files are served via `/api/files/[filename]` and require an authenticated admin session.
- There's an `s3Adapter` skeleton in `src/lib/uploads.ts` to implement production S3 uploads.

Admin
- Visit `/admin` and sign in with `ADMIN_PASSWORD` set in env.

Tests

```bash
npm test
```

Assumptions & Notes
- Basic cookie-based admin gate is implemented; it's intentionally simple for demo purposes.
- Rate limiting is basic and not included as a separate service — can be added via middleware.
- Virus scanning is out-of-scope; file type and size are validated in the server route.
- This scaffold focuses on the required features; polish and further production hardening (HTTPS, CSP, advanced auth) recommended before deployment.
