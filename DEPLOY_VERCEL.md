# Deploy Portfolio to Vercel (Production)

This project is ready to deploy now.

## What I prepared

- Added production migration script: `npm run prisma:migrate:deploy`
- Added explicit Vercel build script: `npm run vercel-build`
- Confirmed production build passes locally

## 1. Push repository to GitHub

From project root:

```powershell
git add .
git commit -m "Prepare portfolio for production deployment"
git push
```

## 2. Create production database (free tier)

Use any MySQL provider and copy its connection string.

Set:

- `DATABASE_URL`

## 3. Import in Vercel

1. Open Vercel dashboard
2. Click "Add New Project"
3. Import this repository

Build settings:

- Framework preset: Next.js
- Build command: `npm run vercel-build`
- Install command: `npm install`

## 4. Add Environment Variables in Vercel

Required:

- `DATABASE_URL` = your production MySQL URL
- `NEXTAUTH_SECRET` = long random secret
- `NEXTAUTH_URL` = your Vercel app URL (for first deploy use `https://<your-project>.vercel.app`)
- `NEXT_PUBLIC_SITE_URL` = same as `NEXTAUTH_URL`

Optional now (can be added later):

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `RESEND_API_KEY`
- `FROM_EMAIL`
- `TO_EMAIL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`

## 5. Deploy

Click Deploy in Vercel.

## 6. Run migrations against production DB

Run locally after setting your terminal env to the same production `DATABASE_URL` value:

```powershell
npm run prisma:migrate:deploy
```

If no migration is pending, Prisma will report nothing to apply.

## 7. Create admin user

After deployment, create one admin user in your production DB.

Use your existing helper:

```powershell
npm run create-admin
```

(Ensure `DATABASE_URL` points to production while running this.)

## 8. Post-deploy checks

- Home page loads
- Projects page shows flagship crypto project
- Contact form submits
- Admin login works

## Notes

- The large crypto project is integrated as a flagship entry, not bundled into this app runtime.
- When crypto is deployed later, just add its live URL in `lib/externalProjects.ts`.
