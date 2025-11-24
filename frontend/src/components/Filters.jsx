import { useState } from 'react';
import PriceTagIcon from './icons/PriceTagIcon';
import SlidersIcon from './icons/SlidersIcon';

const Filters = ({ onCategoryChange, onPriceRangeChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [tempPriceRange, setTempPriceRange] = useState([0, 200000]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = [
    'All',
    'Electronics',
    'Fashion',
    'Home & Furniture',
    'Home & Kitchen',
    'Sports',
    'Bags'
  ];

  const priceRanges = [
    { label: 'All Prices', value: [0, 200000] },
    { label: 'Under ₹10,000', value: [0, 10000] },
    { label: '₹10,000 - ₹30,000', value: [10000, 30000] },
    { label: '₹30,000 - ₹60,000', value: [30000, 60000] },
    { label: '₹60,000 - ₹100,000', value: [60000, 100000] },
    { label: 'Over ₹100,000', value: [100000, 200000] }
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
    setTempPriceRange(range);
    if (onPriceRangeChange) {
      onPriceRangeChange(range);
    }
  };

  const handleApplyCustomRange = () => {
    setPriceRange(tempPriceRange);
    if (onPriceRangeChange) {
      onPriceRangeChange(tempPriceRange);
    }
  };

  const FilterContent = () => (
    <div className="space-y-4 md:space-y-5 lg:space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Categories
        </h3>
        <div className="space-y-1.5 md:space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`w-full text-left px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition-colors text-sm md:text-base ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
          <PriceTagIcon className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
          Price Range
        </h3>
        <div className="space-y-1.5 md:space-y-2">
          {priceRanges.map((range, index) => (
            <button
              key={index}
              onClick={() => handlePriceRangeChange(range.value)}
              className={`w-full text-left px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition-colors text-sm md:text-base ${
                priceRange[0] === range.value[0] && priceRange[1] === range.value[1]
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Price Range Slider */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <SlidersIcon className="w-4 h-4 text-blue-600" />
          Custom Range
        </h4>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-600 flex items-center justify-between mb-1">
              <span>Minimum</span>
              <span className="text-blue-600 font-semibold">₹{tempPriceRange[0].toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="0"
              max="200000"
              step="1000"
              value={tempPriceRange[0]}
              onChange={(e) => {
                const newMin = parseInt(e.target.value);
                if (newMin < tempPriceRange[1]) {
                  setTempPriceRange([newMin, tempPriceRange[1]]);
                }
              }}
              className="w-full h-2.5 bg-linear-to-r from-blue-200 to-blue-400 rounded-lg appearance-none cursor-pointer slider-thumb"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(tempPriceRange[0] / 200000) * 100}%, #e5e7eb ${(tempPriceRange[0] / 200000) * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 flex items-center justify-between mb-1">
              <span>Maximum</span>
              <span className="text-blue-600 font-semibold">₹{tempPriceRange[1].toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="0"
              max="200000"
              step="1000"
              value={tempPriceRange[1]}
              onChange={(e) => {
                const newMax = parseInt(e.target.value);
                if (newMax > tempPriceRange[0]) {
                  setTempPriceRange([tempPriceRange[0], newMax]);
                }
              }}
              className="w-full h-2.5 bg-linear-to-r from-blue-200 to-blue-400 rounded-lg appearance-none cursor-pointer slider-thumb"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(tempPriceRange[1] / 200000) * 100}%, #e5e7eb ${(tempPriceRange[1] / 200000) * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Selected Range:</span>
              <span className="font-bold text-blue-700">₹{tempPriceRange[0].toLocaleString()} - ₹{tempPriceRange[1].toLocaleString()}</span>
            </div>
          </div>
          
          {/* Apply Button */}
          <button
            onClick={handleApplyCustomRange}
            className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Apply Custom Range
          </button>
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => {
          handleCategoryChange('All');
          handlePriceRangeChange([0, 200000]);
          setTempPriceRange([0, 200000]);
        }}
        className="w-full bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
      >
        🗑️ Clear All Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Tablet & Desktop Filters - Sidebar */}
      <div className="hidden md:block bg-white rounded-xl shadow-lg p-4 md:p-5 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto border border-gray-200">
        <div className="flex items-center justify-between mb-4 md:mb-5 pb-3 md:pb-4 border-b border-gray-200">
          <h2 className="text-base md:text-lg font-bold text-gray-800">Filters</h2>
          <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </div>
        <FilterContent />
      </div>

      {/* Mobile Filters Only - Button and Modal */}
      <div className="md:hidden">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-between gap-2 transition-all shadow-md hover:shadow-lg"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>Filters & Categories</span>
          </div>
          <svg 
            className={`w-5 h-5 transition-transform duration-300 ${showMobileFilters ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showMobileFilters && (
          <div className="mt-3 bg-white rounded-lg shadow-xl p-4 sm:p-6 animate-slideDown border-2 border-blue-100">
            <FilterContent />
          </div>
        )}
      </div>
    </>
  );
};

export default Filters;
