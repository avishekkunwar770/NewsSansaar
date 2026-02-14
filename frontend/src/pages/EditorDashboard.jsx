import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const EditorDashboard = () => {
  const [user, setUser] = useState(null);
  const [draftNews, setDraftNews] = useState([]);
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
    if (parsedUser.role !== 'editor' && parsedUser.role !== 'admin') {
      alert('Access denied. Editor only.');
      navigate('/');
      return;
    }
    
    setUser(parsedUser);
    fetchDraftNews();
  }, [navigate]);

  const fetchDraftNews = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/news?status=draft&limit=100');
      const result = await response.json();
      
      if (result.success) {
        setDraftNews(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch draft news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/news/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'published' })
      });
      
      const result = await response.json();
      if (result.success) {
        alert('Article published successfully!');
        fetchDraftNews();
      }
    } catch (error) {
      alert('Failed to publish article');
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-md p-5">
          <p className="text-xs font-medium text-amber-700 uppercase tracking-wide mb-2">Pending Review</p>
          <p className="text-2xl font-semibold text-amber-900">{draftNews.length}</p>
        </div>
        
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-md p-5">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Workflow</p>
          <p className="text-xs text-slate-600">Review → Edit → Approve → Publish</p>
        </div>
      </div>

      {/* Pending Articles */}
      <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Pending Articles</p>
          <p className="text-xs text-slate-400 mt-1">Review and edit articles submitted by writers before publishing</p>
        </div>
        
        {draftNews.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-400 text-sm">No articles pending review</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {draftNews.map((article) => (
              <div key={article.id} className="p-5 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-slate-900 mb-2">{article.title}</h3>
                    <p className="text-xs text-slate-600 mb-3 line-clamp-2">{article.description.slice(0, 200)}...</p>
                    <div className="flex gap-4 text-xs text-slate-500">
                      <span className="inline-flex px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-medium">
                        {article.category}
                      </span>
                      <span>Author: {article.admin}</span>
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => navigate(`/editor/edit-news/${article.id}`)}
                      className="px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-md hover:bg-slate-800 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleApprove(article.id)}
                      className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded-md hover:bg-emerald-700 transition-colors"
                    >
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EditorDashboard;
