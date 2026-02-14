import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const setupDatabase = async () => {
    let connection;
    
    try {
        console.log('\n╔══════════════════════════════════════════════════════════╗');
        console.log('║                                                          ║');
        console.log('║           🚀 NewsSansaar Database Setup 🚀               ║');
        console.log('║                                                          ║');
        console.log('╚══════════════════════════════════════════════════════════╝\n');
        
        // Connect to MySQL (without database)
        console.log('📡 Connecting to MySQL Server...');
        
        // Remove quotes from password if present
        const password = (process.env.DB_PASSWORD || '').replace(/^["']|["']$/g, '');
        
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER || 'root',
            password: password,
            multipleStatements: true
        });
        
        console.log('✅ Connected to MySQL Server\n');
        
        // Read SQL file
        console.log('📄 Reading database setup script...');
        const sqlFile = path.join(__dirname, '..', 'database_setup_simple.sql');
        
        if (!fs.existsSync(sqlFile)) {
            throw new Error(`SQL file not found: ${sqlFile}`);
        }
        
        const sql = fs.readFileSync(sqlFile, 'utf8');
        console.log('✅ SQL script loaded\n');
        
        // Execute SQL
        console.log('⚙️  Executing database setup...');
        await connection.query(sql);
        console.log('✅ Database setup completed\n');
        
        // Get statistics
        await connection.query(`USE ${process.env.DB_NAME || 'nepnews'}`);
        
        const [newsCount] = await connection.query('SELECT COUNT(*) as count FROM news');
        const [catCount] = await connection.query('SELECT COUNT(*) as count FROM categories');
        const [adsCount] = await connection.query('SELECT COUNT(*) as count FROM ads');
        const [adminCount] = await connection.query('SELECT COUNT(*) as count FROM adminlogin');
        
        console.log('╔══════════════════════════════════════════════════════════╗');
        console.log('║                                                          ║');
        console.log('║              ✅ Setup Completed Successfully! ✅          ║');
        console.log('║                                                          ║');
        console.log('╚══════════════════════════════════════════════════════════╝\n');
        
        console.log('📊 Database Statistics:');
        console.log(`   - News Articles: ${newsCount[0].count}`);
        console.log(`   - Categories: ${catCount[0].count}`);
        console.log(`   - Advertisements: ${adsCount[0].count}`);
        console.log(`   - Admin Users: ${adminCount[0].count}\n`);
        
        console.log('🔐 Login Credentials:');
        console.log('   Admin: admin / admin123');
        console.log('   Editor: editor / admin123');
        console.log('   Staff: staff@nepnews.com / staff123\n');
        
        console.log('🎯 Next Steps:');
        console.log('   1. Start backend: npm start (or already running)');
        console.log('   2. Start frontend: cd ../frontend && npm run dev (or already running)');
        console.log('   3. Open: http://localhost:5173\n');
        
    } catch (error) {
        console.error('\n❌ Setup failed:', error.message);
        console.log('\n💡 Troubleshooting:');
        console.log('   - Check MySQL Server is running: net start MySQL80');
        console.log('   - Verify credentials in .env file');
        console.log('   - Ensure database_setup.sql exists in parent directory\n');
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};

setupDatabase();
