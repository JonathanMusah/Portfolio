# Database Connection Checker Script
Write-Host "Checking database configuration..." -ForegroundColor Cyan

# Check if .env exists
if (Test-Path .env) {
    Write-Host "✓ .env file found" -ForegroundColor Green
    
    # Read DATABASE_URL from .env
    $envContent = Get-Content .env
    $dbUrl = $envContent | Where-Object { $_ -match '^DATABASE_URL=' }
    
    if ($dbUrl) {
        Write-Host "✓ DATABASE_URL found in .env" -ForegroundColor Green
        Write-Host "  $dbUrl" -ForegroundColor Gray
        
        # Extract connection details
        if ($dbUrl -match 'mysql://([^:]+):([^@]+)@([^:]+):(\d+)/(.+)') {
            $username = $matches[1]
            $host = $matches[3]
            $port = $matches[4]
            $database = $matches[5]
            
            Write-Host "`nConnection Details:" -ForegroundColor Yellow
            Write-Host "  Host: $host" -ForegroundColor Gray
            Write-Host "  Port: $port" -ForegroundColor Gray
            Write-Host "  Database: $database" -ForegroundColor Gray
            Write-Host "  Username: $username" -ForegroundColor Gray
        }
    } else {
        Write-Host "✗ DATABASE_URL not found in .env" -ForegroundColor Red
    }
} else {
    Write-Host "✗ .env file not found" -ForegroundColor Red
    Write-Host "  Run: copy env.template .env" -ForegroundColor Yellow
}

# Check if MySQL service is running (Windows)
Write-Host "`nChecking MySQL service..." -ForegroundColor Cyan
$mysqlService = Get-Service -Name "*mysql*" -ErrorAction SilentlyContinue

if ($mysqlService) {
    foreach ($service in $mysqlService) {
        if ($service.Status -eq 'Running') {
            Write-Host "✓ MySQL service is running: $($service.Name)" -ForegroundColor Green
        } else {
            Write-Host "✗ MySQL service is not running: $($service.Name)" -ForegroundColor Red
            Write-Host "  Start it from Services or XAMPP Control Panel" -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "⚠ MySQL service not found" -ForegroundColor Yellow
    Write-Host "  Make sure MySQL is installed and running" -ForegroundColor Yellow
}

# Check if Prisma is configured
Write-Host "`nChecking Prisma configuration..." -ForegroundColor Cyan
if (Test-Path "prisma\schema.prisma") {
    Write-Host "✓ Prisma schema found" -ForegroundColor Green
} else {
    Write-Host "✗ Prisma schema not found" -ForegroundColor Red
}

Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Make sure MySQL is running" -ForegroundColor White
Write-Host "2. Create database: CREATE DATABASE portfolio_db;" -ForegroundColor White
Write-Host "3. Update DATABASE_URL in .env file" -ForegroundColor White
Write-Host "4. Run: npm run prisma:migrate" -ForegroundColor White
Write-Host "5. Run: npm run create-admin your-email@example.com password" -ForegroundColor White
