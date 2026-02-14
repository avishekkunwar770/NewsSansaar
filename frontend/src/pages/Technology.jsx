import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Technology = () => {
  const [techNews, setTechNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/news/category/technology")
      .then((res) => res.json())
      .then((result) => {
        setTechNews(result.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch technology news:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-24 px-6">
      <a href="/" className="text-lg text-gray-600">&larr; Back to Home</a>
      <h1 className="text-4xl font-bold mt-4">Technology</h1>
      <p className="text-lg text-gray-500 mb-6">
        Latest news and updates from the technology category.
      </p>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading...</p>
      ) : techNews.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No articles found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techNews.map((news, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              {news.thumbnail && (
                <img
                  src={news.thumbnail.startsWith('http') ? news.thumbnail : `http://localhost:5000/images/${news.thumbnail}`}
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2
                  className="text-xl font-bold text-gray-800 hover:underline cursor-pointer"
                  onClick={() => navigate(`/foreign?id=${news.id}`)}
                >
                  {news.title}
                </h2>
                <p className="text-gray-600 mt-2">
                  {news.description.slice(0, 100)}...
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  By {news.admin} | {news.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Newsletter Section */}
      <div className="flex justify-center items-center mt-16">
        <div className="w-full max-w-3xl bg-gray-50 p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-900">Stay Updated</h2>
          <p className="text-gray-600 mt-2">
            Subscribe to our newsletter to receive the latest news and updates directly in your inbox.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="relative w-full max-w-md">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">📩</span>
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
export default Technology;