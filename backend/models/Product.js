import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    min: 0,
    max: 100
  },
  isNew: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  suppressReservedKeysWarning: true
});

// Index for faster search queries
productSchema.index({ name: 'text', category: 'text' });

const Product = mongoose.model('Product', productSchema);

export default Product;
