import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const ManageAds = () => {
  const [user, setUser] = useState(null);
  const [ads, setAds] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAd, setNewAd] = useState({
    ad_image: '',
    redirect_link: '',
    start_time: '',
    end_time: ''
  });
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
    fetchAds();
  }, [navigate]);

  const fetchAds = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/ads');
      const result = await response.json();
      if (result.success) {
        setAds(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch ads:', error);
    }
  };

  const handleAddAd = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/ads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newAd)
      });

      const result = await response.json();
      if (result.success) {
        alert('Advertisement added successfully!');
        setShowAddModal(false);
        setNewAd({ ad_image: '', redirect_link: '', start_time: '', end_time: '' });
        fetchAds();
      } else {
        alert(result.error || 'Failed to add advertisement');
      }
    } catch (error) {
      alert('Error adding advertisement');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this advertisement?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/ads/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const result = await response.json();
      if (result.success) {
        alert('Advertisement deleted');
        fetchAds();
      }
    } catch (error) {
      alert('Error deleting advertisement');
    }
  };

  const isActive = (ad) => {
    const now = new Date();
    const start = new Date(ad.start_time);
    const end = new Date(ad.end_time);
    return now >= start && now <= end;
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('storage'));
      navigate('/');
    }
  };

  if (!user) return null;

  return (
    <DashboardLayout user={user} onLogout={handleLogout}>
      {/* Add Ad Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800 transition-colors"
        >
          Add New Advertisement
        </button>
      </div>

      {/* Ads List */}
      <div className="space-y-3">
        {ads.map((ad) => (
          <div key={ad.id} className="bg-white border border-slate-200 rounded-md p-5 hover:border-slate-400 transition-all">
            <div className="flex items-start gap-5">
              <img
                src={ad.ad_image}
                alt="Advertisement"
                className="w-40 h-20 object-cover rounded border border-slate-200"
                onError={(e) => e.target.src = 'https://via.placeholder.com/300x150?text=Ad+Image'}
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded ${
                    isActive(ad) ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {isActive(ad) ? 'Active' : 'Inactive'}
                  </span>
                  <button
                    onClick={() => handleDelete(ad.id)}
                    className="text-xs text-red-600 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-xs text-slate-600 mb-1">
                  <span className="font-medium">Link:</span> <a href={ad.redirect_link} target="_blank" rel="noopener" className="text-slate-900 hover:underline truncate">{ad.redirect_link}</a>
                </p>
                <p className="text-xs text-slate-600 mb-1">
                  <span className="font-medium">Start:</span> {new Date(ad.start_time).toLocaleString()}
                </p>
                <p className="text-xs text-slate-600 mb-1">
                  <span className="font-medium">End:</span> {new Date(ad.end_time).toLocaleString()}
                </p>
                <p className="text-xs text-slate-600">
                  <span className="font-medium">Stats:</span> {ad.impressions} impressions, {ad.clicks} clicks
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Ad Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <p className="text-sm font-medium text-slate-900 mb-5">Add New Advertisement</p>
            <form onSubmit={handleAddAd}>
              <div className="mb-3">
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Image URL</label>
                <input
                  type="url"
                  value={newAd.ad_image}
                  onChange={(e) => setNewAd({ ...newAd, ad_image: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
                  placeholder="https://example.com/ad-image.jpg"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Redirect Link</label>
                <input
                  type="url"
                  value={newAd.redirect_link}
                  onChange={(e) => setNewAd({ ...newAd, redirect_link: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
                  placeholder="https://example.com/landing-page"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Start Date & Time</label>
                <input
                  type="datetime-local"
                  value={newAd.start_time}
                  onChange={(e) => setNewAd({ ...newAd, start_time: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-xs font-medium text-slate-600 mb-1.5">End Date & Time</label>
                <input
                  type="datetime-local"
                  value={newAd.end_time}
                  onChange={(e) => setNewAd({ ...newAd, end_time: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-slate-900 text-white py-2 text-sm rounded-md hover:bg-slate-800 font-medium"
                >
                  Add Advertisement
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-slate-100 text-slate-700 py-2 text-sm rounded-md hover:bg-slate-200 font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ManageAds;
