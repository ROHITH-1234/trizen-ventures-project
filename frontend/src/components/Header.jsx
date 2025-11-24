import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import SearchIcon from './icons/SearchIcon';
import UserIcon from './icons/UserIcon';
import CartIcon from './icons/CartIcon';
import HeartIcon from './icons/HeartIcon';
import BellIcon from './icons/BellIcon';

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const { getCartCount, setIsCartOpen } = useCart();

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save a search to recent searches
  const saveToRecentSearches = (query) => {
    if (!query.trim()) return;
    
    let updated = [query, ...recentSearches.filter(item => item !== query)];
    updated = updated.slice(0, 5); // Keep only last 5 searches
    
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      // Call backend API for autosuggest
      fetchSuggestions(searchQuery);
    } else {
      setSuggestions([]);
      // Show recent searches when input is empty and focused
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const fetchSuggestions = async (query) => {
    try {
      // Connect to backend API for search
      const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
      const result = await response.json();
      
      if (result.success && result.data) {
        setSuggestions(result.data);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveToRecentSearches(searchQuery);
      if (onSearch) {
        onSearch(searchQuery);
      }
    }
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    saveToRecentSearches(suggestion);
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(suggestion);
    }
  };

  return (
    <header className="bg-linear-to-r from-blue-600 to-blue-800 shadow-lg sticky top-0 z-50">
      <div className="w-full mx-auto px-2 sm:px-3 md:px-4 lg:px-6 py-2.5 sm:py-3 md:py-4">
        <div className="flex items-center justify-between gap-1.5 sm:gap-2 md:gap-3 lg:gap-4">
          {/* Logo */}
          <div className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group shrink-0">
            {/* Logo Image */}
            <div className="bg-white rounded-md sm:rounded-lg p-1 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
              <img 
                src="https://trizenventures.com/lovable-uploads/trizen-logo.png" 
                alt="Trizen Ventures Logo"
                className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain"
              />
            </div>
            {/* Brand Name */}
            <div className="hidden md:flex flex-col">
              <h1 className="text-base md:text-xl lg:text-2xl font-bold text-white leading-tight">
                Trizen Ventures
              </h1>
              <p className="text-xs text-blue-200 hidden lg:block">From Vision to Venture</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 min-w-0 max-w-md md:max-w-xl lg:max-w-2xl relative mx-1 sm:mx-2 lg:mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center bg-white rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-yellow-400">
                <div className="pl-2 sm:pl-3 md:pl-4 pr-1">
                  <SearchIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (searchQuery) {
                      setShowSuggestions(true);
                    } else if (recentSearches.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                  placeholder="Search..."
                  className="flex-1 px-1 sm:px-2 py-1.5 sm:py-2 md:py-2.5 lg:py-3 outline-none text-xs sm:text-sm md:text-base text-gray-700 placeholder-gray-400 min-w-0"
                />
                <button
                  type="submit"
                  className="bg-linear-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 px-2 sm:px-4 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-2.5 lg:py-3 transition-all duration-300 active:scale-95 shadow-md shrink-0"
                >
                  <span className="font-semibold text-gray-800 flex items-center gap-1 text-xs sm:text-sm md:text-base">
                    <SearchIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 md:hidden" />
                    <span className="hidden md:flex items-center gap-1.5">
                      <SearchIcon className="w-5 h-5" />
                      Search
                    </span>
                  </span>
                </button>
              </div>

              {/* Autosuggest and Recent Searches Dropdown */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 bg-white mt-2 rounded-xl shadow-2xl border border-gray-200 max-h-60 sm:max-h-80 overflow-y-auto z-50 animate-fade-in">
                  {/* Recent Searches */}
                  {!searchQuery && recentSearches.length > 0 && (
                    <div className="border-b border-gray-200">
                      <div className="px-3 sm:px-5 py-2 sm:py-3 flex items-center justify-between bg-gray-50">
                        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-1.5 sm:gap-2">
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Recent
                        </span>
                        <button
                          onClick={clearRecentSearches}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                          Clear
                        </button>
                      </div>
                      {recentSearches.map((recent, index) => (
                        <div
                          key={index}
                          onMouseDown={() => handleSuggestionClick(recent)}
                          className="px-3 sm:px-5 py-2.5 sm:py-3.5 hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-b-0 flex items-center gap-2 sm:gap-3 group"
                        >
                          <div className="p-1.5 sm:p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors shrink-0">
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span className="text-sm sm:text-base text-gray-700 group-hover:text-gray-900 font-medium truncate">{recent}</span>
                          <svg 
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Search Suggestions */}
                  {suggestions.length > 0 && (
                    <>
                      {searchQuery && (
                        <div className="px-3 sm:px-5 py-2 sm:py-2.5 bg-gray-50 border-b border-gray-200">
                          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-1.5 sm:gap-2">
                            <SearchIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            Suggestions
                          </span>
                        </div>
                      )}
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          onMouseDown={() => handleSuggestionClick(suggestion)}
                          className="px-3 sm:px-5 py-2.5 sm:py-3.5 hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-b-0 flex items-center gap-2 sm:gap-3 group"
                        >
                          <div className="p-1.5 sm:p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors shrink-0">
                            <SearchIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 group-hover:text-blue-600" />
                          </div>
                          <span className="text-sm sm:text-base text-gray-700 group-hover:text-gray-900 font-medium truncate">{suggestion}</span>
                          <svg 
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
            </form>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 shrink-0">
            {/* Wishlist - Hidden on mobile, visible on iPad+ */}
            <button className="text-white hover:text-yellow-300 transition-all duration-300 hidden md:flex items-center gap-1 lg:gap-2 group transform hover:scale-110">
              <div className="relative">
                <HeartIcon className="w-5 h-5 lg:w-6 lg:h-6 group-hover:fill-current transition-all" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-3 h-3 lg:w-4 lg:h-4 flex items-center justify-center text-[8px] lg:text-xs">
                  0
                </span>
              </div>
              <span className="text-xs lg:text-sm font-medium hidden lg:inline">Wishlist</span>
            </button>

            {/* Account - Visible on all devices */}
            <button className="text-white hover:text-yellow-300 transition-all duration-300 flex items-center gap-1 group transform hover:scale-110">
              <div className="relative">
                <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </div>
              <span className="text-xs lg:text-sm font-medium hidden lg:inline">Account</span>
            </button>

            {/* Cart - Visible on all devices */}
            <button 
              className="text-white hover:text-yellow-300 transition-all duration-300 relative flex items-center gap-1 group transform hover:scale-110" 
              onClick={() => setIsCartOpen(true)}
            >
              <div className="relative cart-icon-shake">
                <CartIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:animate-pulse" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 bg-yellow-400 text-blue-900 text-[10px] sm:text-xs font-bold rounded-full min-w-3.5 h-3.5 sm:min-w-4 sm:h-4 lg:min-w-5 lg:h-5 flex items-center justify-center px-0.5 sm:px-1 shadow-lg animate-bounce">
                    {getCartCount()}
                  </span>
                )}
              </div>
              <span className="text-xs lg:text-sm font-medium hidden lg:inline">Cart</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
