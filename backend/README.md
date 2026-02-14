# NewsSansaar Backend API

Node.js + Express + MySQL backend for NewsSansaar portal.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update with your MySQL credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=nepnews
PORT=5000
```

### 3. Setup Database

```bash
npm run setup
```

This will:
- Create the `nepnews` database
- Create all tables
- Insert 30+ sample news articles
- Create admin and staff users

### 4. Start Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on: `http://localhost:5000`

## 📚 API Endpoints

### News

- `GET /api/news` - Get all news
- `GET /api/news/latest` - Get latest news
- `GET /api/news/:id` - Get news by ID
- `GET /api/news/category/:category` - Get news by category
- `POST /api/news` - Create news (admin)
- `PUT /api/news/:id` - Update news (admin)
- `DELETE /api/news/:id` - Delete news (admin)
- `PATCH /api/news/:id/views` - Increment views

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/stats` - Get category statistics

### Authentication

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register (admin)
- `GET /api/auth/verify` - Verify token

### Advertisements

- `GET /api/ads/active` - Get active ads
- `GET /api/ads` - Get all ads (admin)
- `POST /api/ads` - Create ad (admin)
- `PUT /api/ads/:id` - Update ad (admin)
- `DELETE /api/ads/:id` - Delete ad (admin)

### Health Check

- `GET /api/health` - Server health check

## 🔐 Authentication

Login credentials (default):
- **Admin:** username: `admin`, password: `admin123`
- **Editor:** username: `editor`, password: `admin123`
- **Staff:** email: `staff@nepnews.com`, password: `staff123`

⚠️ Change these in production!

## 📊 Tech Stack

- **Node.js** - Runtime
- **Express** - Web framework
- **MySQL2** - Database driver
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

## 🗂️ Project Structure

```
backend/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   ├── news.controller.js   # News logic
│   ├── category.controller.js
│   ├── auth.controller.js
│   └── ads.controller.js
├── routes/
│   ├── news.routes.js       # News routes
│   ├── category.routes.js
│   ├── auth.routes.js
│   └── ads.routes.js
├── .env                     # Environment variables
├── server.js                # Main server file
├── setup-database.js        # Database setup script
└── package.json
```

## 🧪 Testing

Test the API:

```bash
# Health check
curl http://localhost:5000/api/health

# Get latest news
curl http://localhost:5000/api/news/latest

# Get news by category
curl http://localhost:5000/api/news/category/politics
```

## 🚀 Deployment

### Environment Variables

Set these in production:

```env
NODE_ENV=production
DB_PASSWORD=strong_password
JWT_SECRET=strong_random_secret
CORS_ORIGIN=https://your-frontend-domain.com
```

### Production Checklist

- [ ] Change default passwords
- [ ] Set strong JWT_SECRET
- [ ] Update CORS_ORIGIN
- [ ] Set NODE_ENV=production
- [ ] Use process manager (PM2)
- [ ] Set up SSL/HTTPS
- [ ] Configure firewall
- [ ] Set up database backups

### Using PM2

```bash
npm install -g pm2
pm2 start server.js --name nepnews-api
pm2 save
pm2 startup
```

## 🆘 Troubleshooting

### Database Connection Failed

```bash
# Check MySQL is running
net start MySQL80

# Test connection
mysql -u root -p

# Verify credentials in .env
```

### Port Already in Use

```bash
# Change PORT in .env
PORT=5001

# Or kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

For issues, check:
1. MySQL Server is running
2. `.env` file is configured correctly
3. Database is set up (`npm run setup`)
4. All dependencies are installed (`npm install`)

---

**Made with ❤️ for NewsSansaar**
