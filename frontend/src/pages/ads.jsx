import React, { useState, useEffect } from 'react';

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/ads/active', {
          headers: {
            'Accept': 'application/json',
          }
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        
        const result = await res.json();
        setAds(result.data || []);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  return (
    <div>
      {loading && <p>Loading ads...</p>}
      {error && <p>Error: {error}</p>}
      {ads.map(ad => (
        <a key={ad.id} href={ad.redirect_link} target="_blank" rel="noopener">
          <img 
            src={ad.ad_image?.startsWith('http') ? ad.ad_image : `http://localhost:5000/images/${ad.ad_image}`}
            alt="Advertisement"
          />
        </a>
      ))}
    </div>
  );
};
export default Ads;