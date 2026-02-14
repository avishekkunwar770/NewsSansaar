
import React from "react";
import { Link } from "react-router-dom";

const Sports = () => {
  return (
    <div>
      <div className="p-4 mt-20">
        
        <Link to="/" className="text-lg text-gray-600">
          &larr; Back to Home
        </Link>
        <h1 className="text-4xl font-bold mt-2">Sports</h1>
        <p className="text-lg text-gray-500 mt-2">
          Latest news and updates from the sports category.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-500 text-lg text-center mb-4">
          No articles found in this category.
        </p>
        <form className="flex justify-center">
          <Link to="/">
            <button type="button" className="bg-black text-white w-52 h-16 rounded-2xl">
              Return to Homepage
            </button>
          </Link>
        </form>
      </div>

      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-3xl bg-gray-50 p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-900">Stay Updated</h2>
          <p className="text-gray-600 mt-2">
            Subscribe to our newsletter to receive the latest news and updates directly in your inbox.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="relative w-full max-w-md">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                📩
              </span>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-l-lg focus:ring focus:ring-gray-300 focus:outline-none"
              />
            </div>
            <button className="bg-black text-white px-5 py-2 rounded-r-lg hover:bg-gray-800">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sports; // ✅ Corrected component name
