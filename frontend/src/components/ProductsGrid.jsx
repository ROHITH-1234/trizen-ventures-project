import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductsGrid = ({ searchQuery, selectedCategory, priceRange, sortBy }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all products from backend
      const response = await fetch(`${API_BASE_URL}/products`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch products');
      }

      let filteredProducts = result.data;

      // Filter by search query
      if (searchQuery) {
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Filter by category
      if (selectedCategory && selectedCategory !== 'All') {
        filteredProducts = filteredProducts.filter(
          product => product.category === selectedCategory
        );
      }

      // Filter by price range
      if (priceRange) {
        const [min, max] = priceRange;
        filteredProducts = filteredProducts.filter(
          product => product.price >= min && product.price <= max
        );
      }

      // Sort products
      if (sortBy) {
        switch (sortBy) {
          case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
          case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
          case 'newest':
            filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
            break;
          case 'featured':
          default:
            // Default sorting by id or rating
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        }
      }

      setProducts(filteredProducts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12 sm:py-16 md:py-20">
        <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 sm:py-16 md:py-20 px-4">
        <div className="text-4xl sm:text-5xl md:text-6xl mb-4">⚠️</div>
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">Error Loading Products</h3>
        <p className="text-sm sm:text-base text-gray-500 mb-4">{error}</p>
        <button 
          onClick={fetchProducts}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 md:py-20 px-4">
        <div className="text-4xl sm:text-5xl md:text-6xl mb-4">🔍</div>
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">No products found</h3>
        <p className="text-sm sm:text-base text-gray-500">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsGrid;
