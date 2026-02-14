import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUser } from 'react-icons/fa';

const categories = [
  { name: "Sports", path: "/sports" },
  { name: "Technology", path: "/technology" },
  { name: "Politics", path: "/politics" },
  { name: "Entertainment", path: "/entertainment" },
  { name: "Business", path: "/business" },
];

const LoginPopup = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="absolute right-0 top-12 w-72 bg-white border border-slate-200 rounded-md shadow-lg z-50">
      <div className="p-3">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">Sign In As</p>
        
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors group"
          onClick={() => {
            navigate('/staff');
            onClose();
          }}
        >
          <div className="w-8 h-8 bg-emerald-100 rounded-md flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
            <svg className="w-4 h-4 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">Writer</p>
            <p className="text-xs text-slate-500">Create and submit articles</p>
          </div>
        </button>

        <div className="my-2 border-t border-slate-200"></div>

        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors group"
          onClick={() => {
            navigate('/editor');
            onClose();
          }}
        >
          <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center group-hover:bg-blue-200 transition-colors">
            <svg className="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">Editor</p>
            <p className="text-xs text-slate-500">Review and publish content</p>
          </div>
        </button>

        <div className="my-2 border-t border-slate-200"></div>

        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors group"
          onClick={() => {
            navigate('/admin');
            onClose();
          }}
        >
          <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center group-hover:bg-red-200 transition-colors">
            <svg className="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">Admin</p>
            <p className="text-xs text-slate-500">Manage platform settings</p>
          </div>
        </button>
      </div>
      
      <div className="border-t border-slate-200 p-2">
        <button 
          onClick={onClose} 
          className="w-full px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export const Navbar = () => {
  const [query, setQuery] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Hide navbar on dashboard pages (but not login pages)
  const isDashboardPage = (location.pathname.includes('/admin/dashboard') || 
                          location.pathname.includes('/admin/manage') ||
                          location.pathname.includes('/editor/dashboard') || 
                          location.pathname.includes('/editor/edit') ||
                          location.pathname.includes('/editor/pending') ||
                          location.pathname.includes('/writer/dashboard') ||
                          location.pathname.includes('/writer/create') ||
                          location.pathname.includes('/writer/edit') ||
                          location.pathname.includes('/writer/my-articles'));

  // Check if user is logged in - check directly from localStorage
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const isLoggedIn = !!(token && user);

  // Close popup when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (showLoginPopup && !event.target.closest('.profile-dropdown-container')) {
        setShowLoginPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLoginPopup]);

  // Don't render navbar on dashboard pages
  if (isDashboardPage) {
    return null;
  }

  const filteredSuggestions = categories.filter((category) =>
    category.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path) => {
    navigate(path);
    setQuery("");
    setShowSuggestions(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      setQuery("");
      setShowSuggestions(false);
    } else {
      alert("Please enter a search term.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <header className="fixed top-0 w-full z-[1000] bg-white shadow p-4 transition-all">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        {/* Left Side Links */}
        <ul className="flex items-center space-x-6 text-gray-600">
          <h1 className="font-bold text-2xl text-emerald-400">NewsSansaar</h1>
          <li><Link to="/" className="hover:text-black">Home</Link></li>
          <li><Link to="/sports" className="hover:text-emerald-400">Sports</Link></li>
          <li><Link to="/technology" className="hover:text-emerald-400">Technology</Link></li>
          <li><Link to="/politics" className="hover:text-emerald-400">Politics</Link></li>
          <li><Link to="/entertainment" className="hover:text-black">Entertainment</Link></li>
          <li><Link to="/business" className="hover:text-emerald-400">Business</Link></li>
        </ul>

        {/* Right Side - Search and Profile */}
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="relative">
            <form onSubmit={handleSearch}>
              <input
                className="w-64 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Search news..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onKeyDown={handleKeyDown}
                onClick={() => setQuery("")}
              />
              <button
                className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow"
                type="submit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                </svg>
                Search
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && query && (
              <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow z-50">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((cat) => (
                    <li
                      key={cat.name}
                      className="px-4 py-2 hover:bg-emerald-100 cursor-pointer"
                      onClick={() => handleSelect(cat.path)}
                    >
                      {cat.name}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-400">No results found</li>
                )}
              </ul>
            )}
          </div>

          {/* User Icon + Login Popup - Only show when NOT logged in */}
          {!isLoggedIn && (
            <div className="relative profile-dropdown-container">
              <button
                className="w-9 h-9 border border-slate-300 rounded-md flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:border-slate-400 transition-all cursor-pointer"
                onClick={() => setShowLoginPopup(!showLoginPopup)}
              >
                <FaUser className="w-4 h-4" />
              </button>
              {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
