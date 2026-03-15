# Quick Setup Guide

Follow these steps to get your portfolio website up and running:

## 1. Install Dependencies

```bash
npm install
```

## 2. Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/portfolio_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### Generating NEXTAUTH_SECRET

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

## 3. Set Up Database

### Create MySQL Database

```sql
CREATE DATABASE portfolio_db;
```

### Run Prisma Migrations

```bash
# Generate Prisma Client
npm run prisma:generate

# Create and run migrations
npm run prisma:migrate
```

## 4. Create Admin User

After setting up the database, create your admin user:

```bash
npm run create-admin your-email@example.com your-password "Your Name"
```

Replace:
- `your-email@example.com` with your email
- `your-password` with your desired password
- `Your Name` with your name (optional)

## 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your portfolio!

## 6. Access Admin Panel

1. Go to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Log in with the credentials you created in step 4
3. Start adding your content!

## Initial Content Setup

### Add Personal Information

You can add personal information directly to the database using Prisma Studio:

```bash
npm run prisma:studio
```

Navigate to `PersonalInfo` and create a new record with:
- Your name
- Your title (e.g., "Full Stack Developer")
- Your bio
- Your email
- Social media links (GitHub, LinkedIn, Twitter)
- Resume URL (if you have one hosted)

### Add Skills

In Prisma Studio, go to `Skill` and add your skills:
- Name: e.g., "React"
- Category: e.g., "Frontend", "Backend", "Tools"
- Proficiency: 0-100
- Order: for sorting

### Add Education

Add your education history in the `Education` table:
- Institution name
- Degree
- Field of study
- Start and end dates
- Description (optional)
- Logo URL (optional)

### Add Certifications

Add certifications in the `Certification` table:
- Certification name
- Issuer
- Issue date
- Expiry date (if applicable)
- Credential URL (if available)
- Logo URL (optional)

## Next Steps

1. **Add Projects**: Go to `/admin/projects` and start adding your projects
2. **Write Blog Posts**: Go to `/admin/blog` and create your first blog post
3. **Customize Styling**: Update colors in `tailwind.config.ts`
4. **Update SEO**: Modify metadata in `app/layout.tsx`

## Troubleshooting

### Database Connection Issues

- Verify your MySQL server is running
- Check that the database exists
- Verify credentials in `DATABASE_URL`

### Authentication Not Working

- Ensure `NEXTAUTH_SECRET` is set
- Verify admin user exists in database
- Check that password was hashed correctly

### Image Upload Issues

- Verify Cloudinary credentials are correct
- Check file size limits
- Ensure CORS is configured in Cloudinary settings

## Production Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add all environment variables
4. Run migrations: `npm run prisma:migrate`
5. Deploy!

### Other Platforms

1. Build: `npm run build`
2. Set environment variables
3. Run migrations
4. Start: `npm start`

---

For more details, see the main [README.md](./README.md) file.

