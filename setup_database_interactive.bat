@echo off
echo ========================================
echo NewsSansaar Database Setup
echo ========================================
echo.
echo Please enter your MySQL root password:
set /p MYSQL_PASSWORD=Password: 

echo.
echo Updating backend/.env file...
powershell -Command "(Get-Content backend\.env) -replace 'DB_PASSWORD=.*', 'DB_PASSWORD=%MYSQL_PASSWORD%' | Set-Content backend\.env"

echo.
echo Running database setup...
cd backend
call npm run setup

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo ✅ Database setup complete!
    echo ========================================
    echo.
    echo You can now start the application with:
    echo start_mern_app.bat
    echo.
) else (
    echo.
    echo ❌ Setup failed. Please check your MySQL password.
    echo.
)

pause
