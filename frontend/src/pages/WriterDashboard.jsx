import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const WriterDashboard = () => {
  const [user, setUser] = useState(null);
  const [myArticles, setMyArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/staff');
      return;
    }
    
    setUser(JSON.parse(userData));
    fetchMyArticles();
  }, [navigate]);

  const fetchMyArticles = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/news?status=all&limit=100');
      const result = await response.json();
      
      if (result.success) {
        const userData = JSON.parse(localStorage.getItem('user'));
        const filtered = result.data.filter(n => n.admin === userData.username || n.admin === userData.name);
        setMyArticles(filtered);
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
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
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-slate-600 text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout user={user} onLogout={handleLogout}>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-md p-5">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">My Articles</p>
          <p className="text-2xl font-semibold text-slate-900">{myArticles.length}</p>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-md p-5">
          <p className="text-xs font-medium text-emerald-700 uppercase tracking-wide mb-2">Published</p>
          <p className="text-2xl font-semibold text-emerald-900">
            {myArticles.filter(a => a.status === 'published').length}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-md p-5">
          <p className="text-xs font-medium text-amber-700 uppercase tracking-wide mb-2">Pending Review</p>
          <p className="text-2xl font-semibold text-amber-900">
            {myArticles.filter(a => a.status === 'draft').length}
          </p>
        </div>
      </div>

      {/* Create Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/writer/create-news')}
          className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800 transition-colors"
        >
          Write New Article
        </button>
      </div>

      {/* My Articles */}
      <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">My Articles</p>
          <p className="text-xs text-slate-400 mt-1">Articles you've written and submitted</p>
        </div>
        
        {myArticles.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-400 text-sm">You haven't written any articles yet</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {myArticles.map((article) => (
              <div key={article.id} className="p-5 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-slate-900 mb-2">{article.title}</h3>
                    <p className="text-xs text-slate-600 mb-3 line-clamp-2">{article.description.slice(0, 150)}...</p>
                    <div className="flex gap-4 text-xs">
                      <span className={`inline-flex px-2 py-0.5 rounded font-medium ${
                        article.status === 'published' 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {article.status}
                      </span>
                      <span className="text-slate-500">Category: {article.category}</span>
                      <span className="text-slate-500">Views: {article.views}</span>
                    </div>
                  </div>
                  {article.status === 'draft' && (
                    <button
                      onClick={() => navigate(`/writer/edit-news/${article.id}`)}
                      className="px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-md hover:bg-slate-800 transition-colors flex-shrink-0"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default WriterDashboard;
