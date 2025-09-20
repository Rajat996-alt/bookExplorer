import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  async function fetchBooks() {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/books", {
        params: { page, limit: 12, search },
      });
      setBooks(res.data.books);
      setTotalPages(res.data.pages);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchBooks();
  }, [page, search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <header className="relative bg-gradient-to-r from-white/95 via-blue-50/95 to-indigo-50/95 backdrop-blur-xl shadow-2xl border-b border-white/40 sticky top-0 z-50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/10 rounded-full animate-bounce-gentle"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-indigo-400/10 rounded-full animate-bounce-gentle" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-purple-400/10 rounded-full animate-bounce-gentle" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Book Discovery Platform</span>
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black gradient-text mb-4 tracking-tight leading-tight">
              📚 Book Explorer
            </h1>
            
            <p className="text-gray-700 text-2xl font-medium mb-6 max-w-2xl mx-auto leading-relaxed">
              Discover your next favorite book in our vast collection
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <div className="w-8 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
            
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/50">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">Live Collection</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="flex justify-center mb-16">
          <div className="relative w-full max-w-3xl">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <svg className="h-7 w-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for books, authors, or genres..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="search-input pl-16 text-lg"
            />
            <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="loading-spinner mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-600 animate-pulse">Loading amazing books...</h2>
          </div>
        ) : (
          <>
            {/* Books Count */}
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/50">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-gray-700 text-lg font-semibold">
                  {books.length > 0 ? `Found ${books.length} amazing books` : 'No books found'}
                </p>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mb-20 px-4 lg:px-8">
              {books.map((book, index) => (
                <div 
                  key={book._id} 
                  className="book-card group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image Section */}
                  <div className="relative overflow-hidden rounded-t-2xl flex-shrink-0">
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="w-full h-56 sm:h-60 md:h-56 lg:h-60 object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm font-bold text-amber-600 flex items-center gap-1 shadow-lg">
                      ⭐ {book.rating}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-600 font-medium">Hover for details</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-4 content-section">
                    <div className="title">
                      <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                        {book.title}
                      </h2>
                    </div>
                    
                    <div className="price-section">
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between">
                          <span className="text-lg sm:text-xl font-bold text-green-600">
                            {book.price}
                          </span>
                          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                            book.availability === 'In Stock' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {book.availability}
                          </span>
                        </div>
                      </div>
                      
                      <div className="button-section">
                        <button className="w-full btn-primary text-sm py-3 font-semibold">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-500 hover:to-blue-600 text-gray-700 hover:text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100 disabled:hover:from-gray-100 disabled:hover:to-gray-200 disabled:hover:text-gray-700"
                >
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </button>
                
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/50">
                  {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 6, page - 3)) + i;
                    if (pageNum > totalPages) return null;
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-12 h-12 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-110 ${
                          pageNum === page
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl scale-110'
                            : 'text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 shadow-md hover:shadow-lg'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-500 hover:to-blue-600 text-gray-700 hover:text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100 disabled:hover:from-gray-100 disabled:hover:to-gray-200 disabled:hover:text-gray-700"
                >
                  <span className="hidden sm:inline">Next</span>
                  <span className="sm:hidden">Next</span>
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full animate-pulse-slow"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-indigo-500/5 rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-purple-500/5 rounded-full animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {/* Main Footer Content */}
            <div className="mb-12">
              <h3 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                📚 Book Explorer
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Your gateway to endless literary adventures. Discover, explore, and fall in love with books.
              </p>
              
              {/* Decorative Line */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
                <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              </div>
            </div>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🔍</span>
                </div>
                <h4 className="text-xl font-bold mb-2">Smart Search</h4>
                <p className="text-gray-400">Find exactly what you're looking for with our intelligent search system</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">📖</span>
                </div>
                <h4 className="text-xl font-bold mb-2">Vast Collection</h4>
                <p className="text-gray-400">Access thousands of books across all genres and categories</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="text-xl font-bold mb-2">Lightning Fast</h4>
                <p className="text-gray-400">Experience blazing fast loading and smooth navigation</p>
              </div>
            </div>
            
            {/* Bottom Section */}
            <div className="border-t border-gray-700 pt-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400">© 2024 Book Explorer. All rights reserved.</span>
                </div>
                
                <div className="flex items-center gap-6">
                  <span className="text-sm text-gray-400">Made with</span>
                  <div className="flex items-center gap-1">
                    <span className="text-red-500 animate-pulse">❤️</span>
                    <span className="text-sm text-gray-400">for book lovers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;