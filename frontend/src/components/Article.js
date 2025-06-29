import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader'; // Sesuaikan path jika perlu

// Menerima prop heroText dari Layout/App
function Article({ heroText }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:3001/api';

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/articles`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch articles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 text-gray-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 border-solid"></div>
        <p className="mt-4 text-lg">Memuat artikel...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 bg-red-100 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Error Memuat Artikel</h2>
        <p>Terjadi kesalahan saat memuat artikel: {error}. Harap pastikan server backend berjalan dengan benar.</p>
      </div>
    );
  }

  return (
    // Hapus kelas layout seperti min-h-screen, bg-gray-100 dari div ini.
    // Layout.js dan index.css akan mengurusnya.
    <div className="py-8"> {/* Hanya mempertahankan padding vertikal */}
      <SectionHeader
        title="Artikel Terbaru"
        subtitle=""
        titleColor="text-gray-800"
        subtitleColor="text-gray-600"
      />

      {articles.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Belum ada artikel untuk ditampilkan.</p>
      ) : (
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
              {article.image_url && (
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/333333?text=No+Image'; }}
                />
              )}
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{article.title}</h2>
                <p className="text-gray-500 text-sm mb-3">Oleh {article.author} pada {article.date}</p>
                <p className="text-gray-700 text-base mb-4 line-clamp-4">{article.content}</p>
                {article.article_url && (
                  <a
                    href={article.article_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Baca Selengkapnya
                    <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                {!article.article_url && (
                    <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-gray-200 rounded-md">
                        Link tidak tersedia
                    </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Footer tidak lagi di sini */}
    </div>
  );
}

export default Article;
