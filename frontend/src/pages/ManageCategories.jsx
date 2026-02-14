import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const ManageCategories = () => {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    description: ''
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
    fetchCategories();
  }, [navigate]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const result = await response.json();
      if (result.success) {
        setCategories(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newCategory)
      });

      const result = await response.json();
      if (result.success) {
        alert('Category added successfully!');
        setShowAddModal(false);
        setNewCategory({ name: '', slug: '', description: '' });
        fetchCategories();
      } else {
        alert(result.error || 'Failed to add category');
      }
    } catch (error) {
      alert('Error adding category');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure? This will affect all articles in this category.')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/categories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const result = await response.json();
      if (result.success) {
        alert('Category deleted');
        fetchCategories();
      }
    } catch (error) {
      alert('Error deleting category');
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

  if (!user) return null;

  return (
    <DashboardLayout user={user} onLogout={handleLogout}>
      {/* Add Category Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800 transition-colors"
        >
          Add New Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-white border border-slate-200 rounded-md p-5 hover:border-slate-400 transition-all">
            <div className="flex justify-between items-start mb-3">
              <p className="text-sm font-medium text-slate-900">{category.name}</p>
              <button
                onClick={() => handleDelete(category.id)}
                className="text-xs text-red-600 hover:text-red-700 font-medium"
              >
                Delete
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-2">
              Slug: <span className="font-mono text-slate-700">{category.slug}</span>
            </p>
            <p className="text-xs text-slate-600">{category.description}</p>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 max-w-md w-full mx-4">
            <p className="text-sm font-medium text-slate-900 mb-5">Add New Category</p>
            <form onSubmit={handleAddCategory}>
              <div className="mb-3">
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Category Name</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ 
                    ...newCategory, 
                    name: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                  })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
                  placeholder="e.g., Technology"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Slug (URL-friendly)</label>
                <input
                  type="text"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900 focus:border-slate-900 font-mono"
                  placeholder="e.g., technology"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Description</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
                  rows="3"
                  placeholder="Brief description of this category"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-slate-900 text-white py-2 text-sm rounded-md hover:bg-slate-800 font-medium"
                >
                  Add Category
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

export default ManageCategories;
