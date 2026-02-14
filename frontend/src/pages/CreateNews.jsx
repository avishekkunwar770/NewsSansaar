import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CreateNews = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Politics',
    thumbnail: '',
    status: 'draft'
  });
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  const categories = [
    'Politics', 'Business', 'Technology', 'Sports', 
    'Entertainment', 'Health', 'Education', 'International'
  ];

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/news/${id}`);
      const result = await response.json();
      
      if (result.success) {
        setFormData({
          title: result.data.title,
          description: result.data.description,
          category: result.data.category,
          thumbnail: result.data.thumbnail || '',
          status: result.data.status
        });
      }
    } catch (error) {
      alert('Failed to load article');
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      
      const url = isEditMode 
        ? `http://localhost:5000/api/news/${id}`
        : 'http://localhost:5000/api/news';
      
      const method = isEditMode ? 'PUT' : 'POST';
      
      const body = isEditMode 
        ? formData 
        : { ...formData, admin: user.username || user.name || 'Staff' };
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      const result = await response.json();
      
      if (result.success) {
        alert(isEditMode ? 'Article updated successfully!' : 'Article created successfully!');
        
        // Redirect based on role
        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (user.role === 'editor') {
          navigate('/editor/dashboard');
        } else {
          navigate('/writer/dashboard');
        }
      } else {
        alert(result.error || 'Failed to save article');
      }
    } catch (error) {
      alert('Error saving article');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">
            {isEditMode ? 'Edit Article' : 'Create New Article'}
          </h1>
          
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Article Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter article title"
                required
              />
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Thumbnail URL */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Thumbnail Image URL
              </label>
              <input
                type="url"
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg or leave empty"
              />
              <p className="text-sm text-gray-500 mt-1">
                Use Unsplash URLs like: https://images.unsplash.com/photo-xxxxx?w=800
              </p>
            </div>

            {/* Description/Content */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Article Content *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="15"
                placeholder="Write your article content here... Use line breaks for paragraphs."
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Tip: Press Enter twice to create paragraph breaks
              </p>
            </div>

            {/* Status */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Draft (Needs Editor Approval)</option>
                <option value="published">Published (Live Immediately)</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Saving...' : (isEditMode ? 'Update Article' : 'Create Article')}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNews;
