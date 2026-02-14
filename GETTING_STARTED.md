# Getting Started with NewsSansaar

## First Time Setup (5 minutes)

### Step 1: Setup Database
```bash
# Double-click this file:
setup_database_interactive.bat

# It will:
# ✅ Create nepnews database
# ✅ Setup all tables
# ✅ Add 50 real news articles
# ✅ Create demo accounts
```

### Step 2: Start Backend
```bash
cd backend
node server.js

# You should see:
# ✅ MySQL Database connected successfully!
# Server listening on http://localhost:5000
```

### Step 3: Start Frontend
```bash
cd frontend
npm run dev

# You should see:
# VITE ready in XXXms
# ➜ Local: http://localhost:5173/
```

### Step 4: Login & Test

1. **Open**: http://localhost:5173
2. **Click**: Profile icon (top right)
3. **Choose a role**:
   - Writer → staff@nepnews.com / staff123
   - Editor → editor / admin123
   - Admin → admin / admin123

## Common Issues

### "Cannot connect to database"
- Make sure MySQL Server is running
- Password in `backend/.env` should be `Password1#`

### "Profile icon not showing"
- Clear browser cache: `Ctrl + Shift + R`
- Clear localStorage: Open console (F12) → `localStorage.clear()`

### "Port 5173 already in use"
- Vite will automatically use port 5174
- Just use the port shown in terminal

## Quick Commands

```bash
# Clear everything and start fresh
localStorage.clear()  # In browser console (F12)

# Restart backend
cd backend
node server.js

# Restart frontend
cd frontend
npm run dev

# Check if MySQL is running
mysql -u root -pPassword1# -e "SHOW DATABASES;"
```

## What's Included

- ✅ 55 news articles (real 2026 news)
- ✅ 8 categories (Politics, Business, Tech, Sports, Entertainment, etc.)
- ✅ 3 user roles (Admin, Editor, Writer)
- ✅ Professional dashboards
- ✅ Complete authentication system

## Next Steps

1. **Explore the site**: Browse news categories
2. **Login as Writer**: Create a new article
3. **Login as Editor**: Review and publish articles
4. **Login as Admin**: Manage users and categories

---

Need help? Check README.md for detailed documentation.
