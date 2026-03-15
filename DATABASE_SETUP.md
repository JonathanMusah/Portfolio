# Database Setup Guide

## Step-by-Step MySQL Setup

### Step 1: Install MySQL (if not already installed)

#### Option A: Download MySQL Installer (Windows)
1. Go to https://dev.mysql.com/downloads/installer/
2. Download "MySQL Installer for Windows"
3. Run the installer
4. Choose "Developer Default" or "Server only"
5. Complete the installation
6. **Remember your root password!**

#### Option B: Use XAMPP (Easier for beginners)
1. Download XAMPP from https://www.apachefriends.org/
2. Install XAMPP
3. Start MySQL from XAMPP Control Panel
4. Default root password is usually empty (blank)

#### Option C: Use MySQL via Docker
```bash
docker run --name mysql-portfolio -e MYSQL_ROOT_PASSWORD=yourpassword -e MYSQL_DATABASE=portfolio_db -p 3306:3306 -d mysql:8.0
```

### Step 2: Start MySQL Server

**If using XAMPP:**
- Open XAMPP Control Panel
- Click "Start" next to MySQL

**If using MySQL Installer:**
- MySQL should start automatically as a Windows service
- Check Services (Win+R → services.msc) to verify "MySQL80" is running

**If using Docker:**
- Container should already be running from Step 1

### Step 3: Create the Database

Open MySQL Command Line Client or any MySQL client (like MySQL Workbench, phpMyAdmin, or HeidiSQL) and run:

```sql
CREATE DATABASE portfolio_db;
```

Or if you prefer a different name, use that instead.

### Step 4: Update Your .env File

Open the `.env` file in your project root and update the `DATABASE_URL`:

```env
DATABASE_URL="mysql://root:yourpassword@localhost:3306/portfolio_db"
```

**Replace:**
- `root` - with your MySQL username (usually "root")
- `yourpassword` - with your MySQL root password
- `portfolio_db` - with your database name (if different)

**Examples:**
- If root password is "mypassword123": `DATABASE_URL="mysql://root:mypassword123@localhost:3306/portfolio_db"`
- If no password (XAMPP default): `DATABASE_URL="mysql://root@localhost:3306/portfolio_db"`
- If using different user: `DATABASE_URL="mysql://username:password@localhost:3306/portfolio_db"`

### Step 5: Test the Connection

Run this command to test if Prisma can connect:

```bash
npm run prisma:generate
```

If it works without errors, you're connected!

### Step 6: Run Database Migrations

This will create all the tables in your database:

```bash
npm run prisma:migrate
```

When prompted:
- Enter a migration name (e.g., "init" or "initial_setup")
- Press Enter

You should see: "✔ Migration applied successfully"

### Step 7: Create Your Admin User

```bash
npm run create-admin your-email@example.com your-password "Your Name"
```

**Example:**
```bash
npm run create-admin admin@portfolio.com MySecurePass123 "Admin User"
```

### Step 8: Verify Everything Works

1. **Restart your dev server** (if it's running):
   - Press `Ctrl+C` to stop
   - Run `npm run dev` again

2. **Check the site**: http://localhost:3000
   - Should load without database errors

3. **Login to admin panel**: http://localhost:3000/admin/login
   - Use the email and password you created in Step 7

## Troubleshooting

### "Can't reach database server at localhost:3306"

**Solution:**
1. Make sure MySQL is running
2. Check if port 3306 is correct (default is 3306)
3. Verify your password in `.env` matches your MySQL password
4. Try connecting with MySQL Workbench or command line to test credentials

### "Access denied for user"

**Solution:**
1. Double-check username and password in `.env`
2. If using XAMPP, try empty password: `DATABASE_URL="mysql://root@localhost:3306/portfolio_db"`
3. Reset MySQL root password if needed

### "Unknown database 'portfolio_db'"

**Solution:**
1. Make sure you created the database (Step 3)
2. Check the database name in `.env` matches what you created
3. Create it manually: `CREATE DATABASE portfolio_db;`

### "Migration failed"

**Solution:**
1. Make sure the database exists
2. Check your `.env` file has correct `DATABASE_URL`
3. Try: `npm run prisma:generate` first, then `npm run prisma:migrate`

## Alternative: Use SQLite (No Setup Required)

If you want to skip MySQL setup entirely, you can use SQLite:

1. **Update `prisma/schema.prisma`**:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = "file:./dev.db"
   }
   ```

2. **Update `.env`**:
   ```env
   DATABASE_URL="file:./dev.db"
   ```

3. **Run migrations**:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

4. **Create admin user**:
   ```bash
   npm run create-admin your-email@example.com your-password "Your Name"
   ```

SQLite is easier for development but MySQL is better for production.

## Next Steps

Once your database is set up:

1. ✅ Login to admin panel
2. ✅ Add your personal information
3. ✅ Add projects
4. ✅ Write blog posts
5. ✅ Add skills, education, and certifications

See `README.md` for more details on using the admin panel!

