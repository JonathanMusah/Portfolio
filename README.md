# Portfolio Website

A modern, responsive personal portfolio website built with Next.js 14, TypeScript, TailwindCSS, Prisma, and MySQL.

## Features

- 🎨 **Modern Design**: Beautiful, responsive UI with smooth animations
- 📱 **Mobile Responsive**: Fully optimized for all device sizes
- 🔐 **Admin Panel**: Protected admin area for managing content
- 📝 **Blog System**: Easy-to-use blog/updates section
- 🖼️ **Image Upload**: Cloudinary integration for image management
- ⚡ **Fast Performance**: Optimized for speed and SEO
- 🎯 **SEO Optimized**: Built-in metadata and Open Graph support

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Database**: MySQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Image Storage**: Cloudinary
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form + Zod

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- MySQL database
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository** (or use this as your starting point)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="mysql://user:password@localhost:3306/portfolio_db"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here" # Generate with: openssl rand -base64 32

   # Cloudinary
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. **Set up the database**:
   ```bash
   # Generate Prisma Client
   npm run prisma:generate

   # Run migrations
   npm run prisma:migrate
   ```

5. **Create an admin user**:
   You'll need to create a user in the database. You can do this via Prisma Studio:
   ```bash
   npm run prisma:studio
   ```
   
   Or create a script to hash a password and insert a user. Here's a quick Node.js script:
   ```javascript
   const bcrypt = require('bcryptjs');
   const { PrismaClient } = require('@prisma/client');
   const prisma = new PrismaClient();
   
   async function createAdmin() {
     const hashedPassword = await bcrypt.hash('your-password', 10);
     await prisma.user.create({
       data: {
         email: 'admin@example.com',
         name: 'Admin',
         password: hashedPassword,
       },
     });
   }
   ```

6. **Run the development server**:
   ```bash
   npm run dev
   ```

7. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
portfolio/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── admin/             # Admin panel (protected)
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   ├── projects/          # Projects page
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── admin/            # Admin components
│   ├── about/            # About page components
│   ├── blog/             # Blog components
│   ├── contact/          # Contact components
│   ├── layout/           # Layout components (Navbar, Footer)
│   └── projects/         # Project components
├── lib/                  # Utility functions
│   ├── data.ts          # Data fetching functions
│   └── prisma.ts        # Prisma client
├── prisma/               # Prisma schema and migrations
│   └── schema.prisma    # Database schema
└── public/              # Static assets
```

## Admin Panel

Access the admin panel at `/admin/login`. Use the credentials you created during setup.

### Admin Features:

- **Projects Management**: Create, edit, and delete projects
- **Blog Management**: Create, edit, and delete blog posts
- **Image Upload**: Upload images to Cloudinary
- **Content Management**: Update personal info, skills, education, and certifications

## Content Management

### Adding Projects

1. Go to `/admin/projects`
2. Click "New Project"
3. Fill in the form:
   - Title and description
   - Tech stack (as JSON array: `["React", "Next.js"]`)
   - GitHub and live demo URLs
   - Upload a project image
   - Mark as featured if desired

### Adding Blog Posts

1. Go to `/admin/blog`
2. Click "New Post"
3. Fill in the form:
   - Title (slug auto-generates)
   - Excerpt and content (HTML supported)
   - Upload featured image
   - Toggle publish status

### Updating Personal Info

You can update personal information directly in the database using Prisma Studio or by creating admin pages for these sections.

## Customization

### Styling

- Modify `tailwind.config.ts` for theme customization
- Update `app/globals.css` for global styles
- Component styles are in individual component files

### SEO

- Update metadata in `app/layout.tsx`
- Add page-specific metadata in each page file
- Update Open Graph images in the metadata

### Colors

The default color scheme uses a blue primary color. To change it:
1. Update the `primary` color in `tailwind.config.ts`
2. Replace `primary-*` classes throughout components

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

1. Build the project: `npm run build`
2. Set up environment variables
3. Run migrations: `npm run prisma:migrate`
4. Start the server: `npm start`

## Database Management

### Prisma Commands

```bash
# Generate Prisma Client
npm run prisma:generate

# Create a new migration
npm run prisma:migrate

# Open Prisma Studio (database GUI)
npm run prisma:studio
```

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MySQL connection string | Yes |
| `NEXTAUTH_URL` | Your app URL | Yes |
| `NEXTAUTH_SECRET` | Secret for JWT signing | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |

## Troubleshooting

### Database Connection Issues

- Verify your `DATABASE_URL` is correct
- Ensure MySQL is running
- Check database credentials

### Image Upload Issues

- Verify Cloudinary credentials
- Check file size limits
- Ensure CORS is configured correctly

### Authentication Issues

- Verify `NEXTAUTH_SECRET` is set
- Check that user exists in database
- Ensure password is properly hashed

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please open an issue on GitHub or contact the maintainer.

---

Built with ❤️ using Next.js and TypeScript

