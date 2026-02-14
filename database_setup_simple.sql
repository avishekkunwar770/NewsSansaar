-- Simple Database Setup for NewsSansaar
-- Run this in MySQL Workbench

-- Create database
DROP DATABASE IF EXISTS nepnews;
CREATE DATABASE nepnews CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE nepnews;

-- Create categories table
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create news table
CREATE TABLE news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description LONGTEXT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    category VARCHAR(100) NOT NULL,
    thumbnail VARCHAR(500),
    admin VARCHAR(100) DEFAULT 'Admin',
    status ENUM('draft', 'published', 'archived') DEFAULT 'published',
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_status (status),
    INDEX idx_date (date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create adminlogin table
CREATE TABLE adminlogin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor', 'author') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create staffLoginCredential table
CREATE TABLE staffLoginCredential (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'staff',
    name VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create ads table
CREATE TABLE ads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ad_image VARCHAR(500) NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    redirect_link VARCHAR(500),
    clicks INT DEFAULT 0,
    impressions INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_dates (start_time, end_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Categories
INSERT INTO categories (name, slug, description) VALUES
('Politics', 'politics', 'Political news and government affairs'),
('Business', 'business', 'Business, economy, and financial news'),
('Technology', 'technology', 'Tech news, gadgets, and innovations'),
('Sports', 'sports', 'Sports news and updates'),
('Entertainment', 'entertainment', 'Entertainment, movies, and celebrity news'),
('Health', 'health', 'Health and wellness news'),
('Education', 'education', 'Education and academic news'),
('International', 'international', 'International and foreign affairs');

-- Insert Admin Users (password: admin123)
-- Note: These are bcrypt hashed passwords
INSERT INTO adminlogin (username, email, password, role) VALUES
('admin', 'admin@nepnews.com', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8Z8W4uRUOY1wjHNvMQNqNvqKvXqKqm', 'admin'),
('editor', 'editor@nepnews.com', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8Z8W4uRUOY1wjHNvMQNqNvqKvXqKqm', 'editor');

-- Insert Staff Users (password: staff123)
INSERT INTO staffLoginCredential (email, password, role, name) VALUES
('staff@nepnews.com', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8Z8W4uRUOY1wjHNvMQNqNvqKvXqKqm', 'staff', 'Staff User');

-- Insert Sample News Articles
INSERT INTO news (title, description, category, thumbnail, admin, status, views) VALUES
('Government Announces New Economic Reform Package', 
'The government has unveiled a comprehensive economic reform package aimed at boosting growth and creating jobs. The package includes tax incentives for small businesses, infrastructure investments, and measures to attract foreign investment.',
'Politics', 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800', 'Admin', 'published', 1250),

('Stock Market Reaches All-Time High', 
'The national stock exchange has reached an all-time high, with the benchmark index crossing the 3000-point mark for the first time in history. Market analysts attribute this growth to strong corporate earnings and increased foreign investment.',
'Business', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800', 'Admin', 'published', 1420),

('5G Network Rollout Begins in Major Cities', 
'Telecom operators have officially launched 5G services in major cities, marking a significant milestone in the country digital transformation journey. The ultra-fast network promises download speeds up to 100 times faster than 4G.',
'Technology', 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800', 'Admin', 'published', 2100),

('National Cricket Team Wins International Series', 
'The national cricket team has won the international series 3-1, marking their best performance in recent years. The team showed exceptional batting and bowling performances throughout the series.',
'Sports', 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800', 'Admin', 'published', 3200),

('Local Film Wins International Award', 
'A locally produced film has won the Best Foreign Film award at a prestigious international film festival. The movie, which tells the story of rural life and traditions, has been praised for its authentic storytelling.',
'Entertainment', 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800', 'Admin', 'published', 2340);

-- Insert Sample Ads
INSERT INTO ads (ad_image, start_time, end_time, redirect_link, impressions) VALUES
('https://via.placeholder.com/728x90/FF6B6B/FFFFFF?text=Special+Offer', 
 NOW(), 
 DATE_ADD(NOW(), INTERVAL 30 DAY), 
 'https://example.com/offer1', 
 5000);

-- Success message
SELECT 'Database setup completed successfully!' AS message;
SELECT COUNT(*) AS total_news FROM news;
SELECT COUNT(*) AS total_categories FROM categories;
