import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [news, setNews] = useState([]);
  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/Admin');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'admin') {
      alert('Access denied. Admin only.');
      navigate('/');
      return;
    }
    
    setUser(parsedUser);
    fetchNews();
  }, [navigate]);

  const fetchNews = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/news?status=all&limit=100');
      const result = await response.json();
      
      if (result.success) {
        setNews(result.data);
        
        const published = result.data.filter(n => n.status === 'published').length;
        const draft = result.data.filter(n => n.status === 'draft').length;
        
        setStats({
          total: result.data.length,
          published,
          draft
        });
      }
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/news/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const result = await response.json();
      if (result.success) {
        alert('Article deleted successfully');
        fetchNews();
      }
    } catch (error) {
      alert('Failed to delete article');
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('storage'));
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout user={user} onLogout={handleLogout}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-md p-5">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Total Articles</p>
          <p className="text-2xl font-semibold text-slate-900">{stats.total}</p>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-md p-5">
          <p className="text-xs font-medium text-emerald-700 uppercase tracking-wide mb-2">Published</p>
          <p className="text-2xl font-semibold text-emerald-900">{stats.published}</p>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-md p-5">
          <p className="text-xs font-medium text-amber-700 uppercase tracking-wide mb-2">Pending Review</p>
          <p className="text-2xl font-semibold text-amber-900">{stats.draft}</p>
        </div>
      </div>

      {/* Management Actions */}
      <div className="bg-white border border-slate-200 rounded-md p-5 mb-6">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-4">System Management</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => navigate('/admin/manage-users')}
            className="flex items-center justify-between p-4 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-md hover:border-slate-400 transition-all"
          >
            <div className="text-left">
              <p className="text-sm font-medium text-slate-900">Users</p>
              <p className="text-xs text-slate-500 mt-0.5">Manage team members</p>
            </div>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <button
            onClick={() => navigate('/admin/manage-categories')}
            className="flex items-center justify-between p-4 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-md hover:border-slate-400 transition-all"
          >
            <div className="text-left">
              <p className="text-sm font-medium text-slate-900">Categories</p>
              <p className="text-xs text-slate-500 mt-0.5">Organize content</p>
            </div>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <button
            onClick={() => navigate('/admin/manage-ads')}
            className="flex items-center justify-between p-4 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-md hover:border-slate-400 transition-all"
          >
            <div className="text-left">
              <p className="text-sm font-medium text-slate-900">Advertisements</p>
              <p className="text-xs text-slate-500 mt-0.5">Manage ads</p>
            </div>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">All Articles</p>
          <p className="text-xs text-slate-400 mt-1">View and manage published content</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">Title</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">Category</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">Status</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">Author</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">Views</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {news.map((article) => (
                <tr key={article.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 text-sm text-slate-900">{article.title.slice(0, 60)}...</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded bg-slate-100 text-slate-700">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded ${
                      article.status === 'published' 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-600">{article.admin}</td>
                  <td className="px-5 py-3 text-sm text-slate-600">{article.views}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate(`/foreign?id=${article.id}`)}
                        className="text-xs text-slate-600 hover:text-slate-900 font-medium"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="text-xs text-red-600 hover:text-red-700 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
