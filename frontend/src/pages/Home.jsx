import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/news/latest');
                if (!response.ok) throw new Error('Network response was not ok');
                const result = await response.json();
                setNews(result.data || []);
            } catch (err) {
                setError(err.message);
                console.error('Failed to fetch news:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) return <div className="text-center py-8">Loading news...</div>;
    if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

    const heroNews = news[0];
    const secondaryNews = news.slice(1, 3);
    const latestNews = news.slice(3, 12);

    return (
        <main className="flex flex-col md:flex-row pt-20">
            {/* Main Content */}
            <div className="w-full md:w-3/4">
                {/* Hero Section */}
                <section className="flex flex-col md:flex-row justify-between items-center p-6 mb-12">
                    {heroNews && (
                        <div className="flex flex-col md:flex-row w-full">
                            <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-6">
                                <img
                                    src={heroNews.thumbnail?.startsWith('http') ? heroNews.thumbnail : `http://localhost:5000/images/${heroNews.thumbnail || 'default-news.jpg'}`}
                                    alt={heroNews.title}
                                    className="w-full h-96 rounded-2xl object-cover"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/800x400/CCCCCC/666666?text=Image+Not+Available';
                                    }}
                                />
                            </div>
                            <div className="w-full md:w-1/2">
                                <span className="bg-black text-white text-xs font-semibold px-2 py-1 rounded">
                                    {heroNews.category || 'General'}
                                </span>
                                <h1
                                    className='text-4xl font-bold mt-4 mb-4 cursor-pointer'
                                    onClick={() => navigate(`/foreign?id=${heroNews.id}`)}
                                >
                                    {heroNews.title}
                                </h1>
                                <p className="text-gray-600 text-lg">
                                    {heroNews.description.length > 200
                                        ? `${heroNews.description.substring(0, 200)}...`
                                        : heroNews.description}
                                </p>
                                <p className="text-gray-500 mt-4">
                                    {heroNews.date !== "0000-00-00"
                                        ? new Date(heroNews.date).toLocaleDateString()
                                        : 'Date not specified'}
                                </p>
                            </div>
                        </div>
                    )}
                </section>

                {/* Secondary News */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 mb-12">
                    {secondaryNews.map((item, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-1/2">
                                <img
                                    src={item.thumbnail?.startsWith('http') ? item.thumbnail : `http://localhost:5000/images/${item.thumbnail || 'default-news.jpg'}`}
                                    alt={item.title}
                                    className="w-full h-48 rounded-2xl object-cover"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/800x400/CCCCCC/666666?text=Image+Not+Available';
                                    }}
                                />
                            </div>
                            <div className="w-full md:w-1/2">
                                <span className="bg-black text-white text-xs font-semibold px-2 py-1 rounded">
                                    {item.category || 'General'}
                                </span>
                                <h2
                                    className='text-2xl font-bold mt-2 mb-2 hover:underline cursor-pointer'
                                    onClick={() => navigate(`/foreign?id=${item.id}`)}
                                >
                                    {item.title}
                                </h2>
                                <p className="text-gray-500">
                                    {item.description.length > 120
                                        ? `${item.description.substring(0, 120)}...`
                                        : item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </section>

                {/* News Grid */}
                <section className="px-6 mb-12">
                    <h2 className="text-3xl font-bold mb-8">More News</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {latestNews.map((item, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={item.thumbnail?.startsWith('http') ? item.thumbnail : `http://localhost:5000/images/${item.thumbnail || 'default-news.jpg'}`}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/800x400/CCCCCC/666666?text=Image+Not+Available';
                                        }}
                                    />
                                </div>
                                <div className="p-4">
                                    <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
                                        {item.category || 'General'}
                                    </span>
                                    <h3
                                        className='text-xl font-bold mt-2 mb-2 hover:underline cursor-pointer'
                                        onClick={() => navigate(`/foreign?id=${item.id}`)}
                                    >
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {item.description.length > 100
                                            ? `${item.description.substring(0, 100)}...`
                                            : item.description}
                                    </p>
                                    <p className="text-gray-500 text-sm mt-2">
                                        {item.date !== "0000-00-00"
                                            ? new Date(item.date).toLocaleDateString()
                                            : 'Date not specified'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Sidebar */}
            <aside className="w-full md:w-1/4 p-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6">Latest Updates</h2>
                    <div className="space-y-6">
                        {news.slice(0, 4).map((item, index) => (
                            <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                                <h3 className="text-sm font-semibold text-gray-600 mb-1">
                                    {item.category || 'General'}
                                </h3>
                                <p
                                    className="text-lg font-bold hover:underline cursor-pointer mb-1"
                                    onClick={() => navigate(`/foreign?id=${item.id}`)}
                                >
                                    {item.title}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {item.date !== "0000-00-00"
                                        ? new Date(item.date).toLocaleDateString()
                                        : 'Date not specified'}
                                </p>
                            </div>
                        ))}
                        <div>
                        Advertisement
                        </div>
                    </div>
                </div>
                
            </aside>
            
        </main>
        
    );  
};
