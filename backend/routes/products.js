import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

/**
 * GET /api/products
 * Returns all products from the database
 */
router.get('/products', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .sort({ id: 1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await Product.countDocuments();
    
    res.status(200).json({
      success: true,
      count: products.length,
      total,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
});

/**
 * GET /api/search?q=term
 * Search products by name or category
 * Returns up to 5 suggestions for autosuggest
 */
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.status(200).json({
        success: true,
        count: 0,
        data: []
      });
    }

    // Case-insensitive partial match search
    const searchRegex = new RegExp(q, 'i');
    
    const products = await Product.find({
      $or: [
        { name: { $regex: searchRegex } },
        { category: { $regex: searchRegex } }
      ]
    })
    .limit(5)
    .select('name category price image')
    .sort({ rating: -1 })
    .lean();

    // Extract unique product names for autosuggest
    const suggestions = products.map(product => product.name);

    res.status(200).json({
      success: true,
      count: suggestions.length,
      data: suggestions,
      products: products // Full product details for advanced usage
    });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching products',
      error: error.message
    });
  }
});

/**
 * GET /api/products/:id
 * Get a single product by ID
 */
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: parseInt(req.params.id) }).lean();
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
});

/**
 * GET /api/products/category/:category
 * Get products by category
 */
router.get('/products/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ 
      category: new RegExp(category, 'i') 
    }).sort({ rating: -1 }).lean();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products by category',
      error: error.message
    });
  }
});

export default router;
