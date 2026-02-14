# NewsSansaar - MERN Stack News Portal

A modern news portal built with MERN stack (MySQL + Express + React + Node.js) featuring role-based authentication and professional dashboard system.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server 8.0
- npm or yarn

### Installation & Setup

1. **Install Dependencies**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

2. **Setup Database**
```bash
# Run the interactive setup script
setup_database_interactive.bat

# This will:
# - Create nepnews database
# - Setup tables (news, categories, users, ads)
# - Add 50 real news articles
# - Create demo user accounts
```

3. **Start Servers**
```bash
# Terminal 1 - Backend (Port 5000)
cd backend
node server.js

# Terminal 2 - Frontend (Port 5173)
cd frontend
npm run dev
```

4. **Access Application**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 👥 Login Credentials

### Writer (Staff)
- **URL**: http://localhost:5173/staff
- **Email**: staff@nepnews.com
- **Password**: staff123
- **Role**: Create and submit articles as drafts

### Editor
- **URL**: http://localhost:5173/editor
- **Username**: editor
- **Password**: admin123
- **Role**: Review, edit, and publish articles

### Admin
- **URL**: http://localhost:5173/Admin
- **Username**: admin
- **Password**: admin123
- **Role**: Manage users, categories, ads, and delete articles

## 📁 Project Structure

```
NewsSansaar/
├── backend/
│   ├── config/database.js       # MySQL connection
│   ├── controllers/             # Business logic
│   ├── routes/                  # API routes
│   ├── .env                     # Environment variables
│   └── server.js                # Express server
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── pages/               # Page components
│   │   └── App.jsx              # Main app component
│   └── package.json
│
├── database_setup_simple.sql    # Database schema
├── database_real_news_2026.sql  # 50 real news articles
└── setup_database_interactive.bat
```

## 🎨 Features

### Public Site
- Browse news by category (Politics, Business, Technology, Sports, Entertainment)
- Search functionality
- Responsive design
- 50+ real news articles

### Dashboard System
- **Professional UI**: Flat design with slate color scheme
- **Role-based Access**: Separate dashboards for each role
- **Article Workflow**: Writer → Editor → Published
- **User Management**: Add/remove users, assign roles
- **Category Management**: Organize news content
- **Ad Management**: Schedule advertisements

## 🔐 Security

- JWT authentication
- Role-based access control
- Bcrypt password hashing
- Protected API routes
- Logout confirmation

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new user

### News
- `GET /api/news` - Get all news
- `GET /api/news/:id` - Get single article
- `POST /api/news` - Create article
- `PUT /api/news/:id` - Update article
- `DELETE /api/news/:id` - Delete article

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `DELETE /api/categories/:id` - Delete category

### Ads
- `GET /api/ads` - Get all ads
- `POST /api/ads` - Create ad
- `DELETE /api/ads/:id` - Delete ad

## 🎯 Workflow

1. **Writer** creates article → Saved as draft
2. **Editor** reviews and edits → Approves for publishing
3. **Editor** publishes → Article goes live
4. **Admin** manages system → Users, categories, ads

## 🐛 Troubleshooting

### Database Connection Error
- Verify MySQL is running
- Check `backend/.env` credentials
- Password should be: `Password1#`

### Login Issues
- Clear browser cache: Press `Ctrl + Shift + Delete`
- Clear localStorage: Open console (F12) and run `localStorage.clear()`
- Verify credentials match the ones above

### Port Already in Use
```bash
# Check what's using the port
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <PID> /F
```

## 📊 Database Info

- **Database Name**: nepnews
- **Host**: localhost:3306
- **User**: root
- **Password**: Password1#

### Tables
- `news` - Articles (55 articles with real 2026 news)
- `categories` - 8 news categories
- `adminlogin` - Admin and Editor users
- `staffLoginCredential` - Writer/Staff users
- `ads` - Advertisement management

## 🚀 Production Deployment

1. Update `backend/.env` with production database credentials
2. Build frontend: `cd frontend && npm run build`
3. Serve frontend build folder with nginx or similar
4. Run backend with PM2: `pm2 start server.js`

---

**Built with MERN Stack (MySQL variant)**
