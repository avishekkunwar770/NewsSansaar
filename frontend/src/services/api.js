import axios from 'axios';

// API Base URL - change this for production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Unauthorized - clear token and redirect to login
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// News API
export const newsAPI = {
    // Get all news
    getAll: (params = {}) => api.get('/news', { params }),
    
    // Get latest news
    getLatest: (limit = 20) => api.get('/news/latest', { params: { limit } }),
    
    // Get news by ID
    getById: (id) => api.get(`/news/${id}`),
    
    // Get news by category
    getByCategory: (category, params = {}) => api.get(`/news/category/${category}`, { params }),
    
    // Create news (admin only)
    create: (newsData) => api.post('/news', newsData),
    
    // Update news (admin only)
    update: (id, newsData) => api.put(`/news/${id}`, newsData),
    
    // Delete news (admin only)
    delete: (id) => api.delete(`/news/${id}`),
    
    // Increment views
    incrementViews: (id) => api.patch(`/news/${id}/views`)
};

// Categories API
export const categoryAPI = {
    // Get all categories
    getAll: () => api.get('/categories'),
    
    // Get category statistics
    getStats: () => api.get('/categories/stats')
};

// Authentication API
export const authAPI = {
    // Login
    login: (credentials) => api.post('/auth/login', credentials),
    
    // Register (admin only)
    register: (userData) => api.post('/auth/register', userData),
    
    // Verify token
    verify: () => api.get('/auth/verify'),
    
    // Logout (client-side)
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

// Advertisements API
export const adsAPI = {
    // Get active ads
    getActive: () => api.get('/ads/active'),
    
    // Get all ads (admin only)
    getAll: () => api.get('/ads'),
    
    // Create ad (admin only)
    create: (adData) => api.post('/ads', adData),
    
    // Update ad (admin only)
    update: (id, adData) => api.put(`/ads/${id}`, adData),
    
    // Delete ad (admin only)
    delete: (id) => api.delete(`/ads/${id}`)
};

// Helper function to get image URL
export const getImageUrl = (imagePath) => {
    if (!imagePath) return '/placeholder.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:5000/images/${imagePath}`;
};

export default api;
