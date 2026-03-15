# Quick Start Guide

## Current Status

✅ **Good News**: Your portfolio website is running! The site is accessible at http://localhost:3000

⚠️ **Database Not Configured**: You're seeing errors because the database connection isn't set up yet. The site still works, but you'll need to configure the database to add content.

## Quick Fix: Create .env File

1. **Copy the template**:
   ```bash
   copy env.template .env
   ```
   (On Mac/Linux: `cp env.template .env`)

2. **Edit `.env`** and update these values:
   - `DATABASE_URL` - Your MySQL connection string
   - `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
   - `CLOUDINARY_*` - Your Cloudinary credentials (optional for now)

## Setting Up Database

### Option 1: Use MySQL (Recommended)

1. **Install MySQL** if you haven't already
2. **Create a database**:
   ```sql
   CREATE DATABASE portfolio_db;
   ```
3. **Update `.env`** with your connection string:
   ```
   DATABASE_URL="mysql://username:password@localhost:3306/portfolio_db"
   ```
4. **Run migrations**:
   ```bash
   npm run prisma:migrate
   ```
5. **Create admin user**:
   ```bash
   npm run create-admin your-email@example.com your-password "Your Name"
   ```

### Option 2: Use SQLite (Easier for Development)

If you want to get started quickly without MySQL:

1. **Update `prisma/schema.prisma`**:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = "file:./dev.db"
   }
   ```

2. **Run migrations**:
   ```bash
   npm run prisma:migrate
   ```

3. **Create admin user**:
   ```bash
   npm run create-admin your-email@example.com your-password "Your Name"
   ```

## What Works Now

Even without a database:
- ✅ Site loads and displays
- ✅ All pages are accessible
- ✅ Navigation works
- ✅ Styling and animations work
- ⚠️ Content pages show "no data" messages (expected)

## Next Steps After Database Setup

1. **Login to Admin Panel**: http://localhost:3000/admin/login
2. **Add Personal Info**: Use Prisma Studio (`npm run prisma:studio`) or create admin pages
3. **Add Projects**: Go to `/admin/projects`
4. **Write Blog Posts**: Go to `/admin/blog`
5. **Add Skills/Education**: Use Prisma Studio or create admin pages

## Need Help?

- See `README.md`` for full documentation
- See `SETUP.md` for detailed setup instructions
- Check `env.template` for all required environment variables

---

**The site is working!** You just need to set up the database to start adding content. 🚀

