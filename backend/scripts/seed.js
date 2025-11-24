import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

// Sample product data (50 items with multiple smartphone variants)
const products = [
  // Smartphones - 20+ variants
  {
    id: 1,
    name: "Smartphone Max 20 Pro",
    category: "Electronics",
    price: 45999,
    originalPrice: 54999,
    rating: 4.5,
    reviews: 1250,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    discount: 16,
    isNew: true,
    description: "Latest flagship smartphone with advanced AI camera"
  },
  {
    id: 21,
    name: "Smartphone Galaxy Ultra 5G",
    category: "Electronics",
    price: 52999,
    originalPrice: 64999,
    rating: 4.7,
    reviews: 2340,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&auto=format",
    discount: 18,
    isNew: true,
    description: "Premium 5G smartphone with 108MP camera"
  },
  {
    id: 22,
    name: "Smartphone Pro 15 Plus",
    category: "Electronics",
    price: 38999,
    originalPrice: 45999,
    rating: 4.4,
    reviews: 1890,
    image: "https://images.unsplash.com/photo-1592286927505-b7afe6f1dfde?w=500&auto=format",
    discount: 15,
    description: "Mid-range smartphone with powerful performance"
  },
  {
    id: 23,
    name: "Smartphone Edge 12",
    category: "Electronics",
    price: 29999,
    originalPrice: 35999,
    rating: 4.3,
    reviews: 1450,
    image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500&auto=format",
    discount: 17,
    description: "Affordable smartphone with great features"
  },
  {
    id: 24,
    name: "Smartphone Pixel 8 Pro",
    category: "Electronics",
    price: 48999,
    originalPrice: 56999,
    rating: 4.8,
    reviews: 3200,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format",
    discount: 14,
    isNew: true,
    description: "Google flagship smartphone with advanced AI"
  },
  {
    id: 25,
    name: "Smartphone OnePlus 11 5G",
    category: "Electronics",
    price: 42999,
    originalPrice: 49999,
    rating: 4.6,
    reviews: 2780,
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&auto=format",
    discount: 14,
    description: "Fast charging smartphone with 120Hz display"
  },
  {
    id: 26,
    name: "Smartphone Vivo X90 Pro",
    category: "Electronics",
    price: 39999,
    originalPrice: 46999,
    rating: 4.5,
    reviews: 1670,
    image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500&auto=format",
    discount: 15,
    description: "Camera-focused smartphone with Zeiss optics"
  },
  {
    id: 27,
    name: "Smartphone Oppo Reno 10",
    category: "Electronics",
    price: 32999,
    originalPrice: 38999,
    rating: 4.4,
    reviews: 1230,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format",
    discount: 15,
    description: "Stylish smartphone with excellent selfie camera"
  },
  {
    id: 28,
    name: "Smartphone Redmi Note 13 Pro",
    category: "Electronics",
    price: 24999,
    originalPrice: 29999,
    rating: 4.2,
    reviews: 3450,
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&auto=format",
    discount: 17,
    description: "Budget smartphone with premium features"
  },
  {
    id: 29,
    name: "Smartphone Realme GT 5 Pro",
    category: "Electronics",
    price: 36999,
    originalPrice: 42999,
    rating: 4.5,
    reviews: 1980,
    image: "https://media.istockphoto.com/id/2203175368/photo/the-image-shows-a-hand-holding-a-smartphone-displaying-a-sunset-photo-being-taken-using-the.jpg?s=612x612&w=0&k=20&c=Npp1xcN40t4Rst1ITXiyzAJyySLx8xR1vKLURT_0n9M=",
    discount: 14,
    description: "Gaming smartphone with flagship processor"
  },
  {
    id: 30,
    name: "Smartphone iPhone 15 Pro Max",
    category: "Electronics",
    price: 134999,
    originalPrice: 149999,
    rating: 4.9,
    reviews: 5670,
    image: "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=500&auto=format",
    discount: 10,
    isNew: true,
    description: "Apple's latest flagship with A17 Pro chip"
  },
  {
    id: 31,
    name: "Smartphone Nothing Phone 2",
    category: "Electronics",
    price: 44999,
    originalPrice: 51999,
    rating: 4.6,
    reviews: 2340,
    image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=500&auto=format",
    discount: 13,
    isNew: true,
    description: "Unique design smartphone with Glyph interface"
  },
  {
    id: 32,
    name: "Smartphone Motorola Edge 40 Pro",
    category: "Electronics",
    price: 37999,
    originalPrice: 44999,
    rating: 4.4,
    reviews: 1560,
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500&auto=format",
    discount: 16,
    description: "Clean Android smartphone with powerful specs"
  },
  {
    id: 33,
    name: "Smartphone Poco X6 Pro 5G",
    category: "Electronics",
    price: 27999,
    originalPrice: 32999,
    rating: 4.3,
    reviews: 2890,
    image: "https://images.unsplash.com/photo-1599950755346-a3e58f84ca63?w=500&auto=format",
    discount: 15,
    description: "Value for money smartphone with flagship specs"
  },
  {
    id: 34,
    name: "Smartphone Asus ROG Phone 7",
    category: "Electronics",
    price: 59999,
    originalPrice: 69999,
    rating: 4.7,
    reviews: 1240,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format",
    discount: 14,
    isNew: true,
    description: "Ultimate gaming smartphone with cooling system"
  },
  {
    id: 35,
    name: "Smartphone Honor Magic 5 Pro",
    category: "Electronics",
    price: 41999,
    originalPrice: 48999,
    rating: 4.5,
    reviews: 1780,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format",
    discount: 14,
    description: "Premium smartphone with Magic OS"
  },
  {
    id: 36,
    name: "Smartphone Infinix Note 30 Pro",
    category: "Electronics",
    price: 18999,
    originalPrice: 22999,
    rating: 4.1,
    reviews: 2340,
    image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500&auto=format",
    discount: 17,
    description: "Affordable smartphone with 108MP camera"
  },
  {
    id: 37,
    name: "Smartphone Tecno Phantom X2 Pro",
    category: "Electronics",
    price: 35999,
    originalPrice: 41999,
    rating: 4.3,
    reviews: 980,
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&auto=format",
    discount: 14,
    description: "Feature-packed smartphone with MediaTek chip"
  },
  {
    id: 38,
    name: "Smartphone Lava Agni 2 5G",
    category: "Electronics",
    price: 21999,
    originalPrice: 25999,
    rating: 4.0,
    reviews: 670,
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&auto=format",
    discount: 15,
    description: "Made in India smartphone with 5G support"
  },
  {
    id: 39,
    name: "Smartphone Micromax In Note 2",
    category: "Electronics",
    price: 13999,
    originalPrice: 16999,
    rating: 3.9,
    reviews: 1230,
    image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500&auto=format",
    discount: 18,
    description: "Budget smartphone with large battery"
  },
  {
    id: 40,
    name: "Smartphone Sony Xperia 1 V",
    category: "Electronics",
    price: 84999,
    originalPrice: 99999,
    rating: 4.6,
    reviews: 890,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&auto=format",
    discount: 15,
    isNew: true,
    description: "Professional smartphone with 4K display"
  },
  {
    id: 2,
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 2499,
    originalPrice: 3999,
    rating: 4.2,
    reviews: 856,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    discount: 37,
    description: "Premium noise-cancelling wireless headphones"
  },
  {
    id: 3,
    name: "Professional DSLR Camera",
    category: "Electronics",
    price: 67999,
    originalPrice: 79999,
    rating: 4.8,
    reviews: 432,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
    discount: 15,
    description: "24MP DSLR with 4K video recording"
  },
  {
    id: 4,
    name: "Gaming Laptop RTX 4060",
    category: "Electronics",
    price: 89999,
    originalPrice: 109999,
    rating: 4.6,
    reviews: 678,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500",
    discount: 18,
    isNew: true,
    description: "High-performance gaming laptop with RTX graphics"
  },
  {
    id: 5,
    name: "Men's Leather Jacket",
    category: "Fashion",
    price: 3999,
    originalPrice: 6999,
    rating: 4.3,
    reviews: 543,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    discount: 43,
    description: "Genuine leather jacket for men"
  },
  {
    id: 6,
    name: "Women's Designer Handbag",
    category: "Fashion",
    price: 2799,
    originalPrice: 4999,
    rating: 4.4,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
    discount: 44,
    description: "Premium quality designer handbag"
  },
  {
    id: 7,
    name: "Running Shoes Pro",
    category: "Fashion",
    price: 4999,
    originalPrice: 7999,
    rating: 4.5,
    reviews: 1234,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    discount: 37,
    isNew: true,
    description: "Professional running shoes with air cushion"
  },
  {
    id: 8,
    name: "Smartwatch Series 8",
    category: "Electronics",
    price: 24999,
    originalPrice: 29999,
    rating: 4.7,
    reviews: 2341,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    discount: 17,
    isNew: true,
    description: "Advanced smartwatch with health tracking"
  },
  {
    id: 9,
    name: "Dining Table Set (6 Seater)",
    category: "Home & Furniture",
    price: 18999,
    originalPrice: 24999,
    rating: 4.1,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500",
    discount: 24,
    description: "Elegant wooden dining table set"
  },
  {
    id: 10,
    name: "Office Chair Ergonomic",
    category: "Home & Furniture",
    price: 8999,
    originalPrice: 12999,
    rating: 4.4,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500",
    discount: 31,
    description: "Comfortable ergonomic office chair"
  },
  {
    id: 11,
    name: "Sofa Set 3+2 Seater",
    category: "Home & Furniture",
    price: 34999,
    originalPrice: 49999,
    rating: 4.3,
    reviews: 345,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
    discount: 30,
    description: "Premium fabric sofa set for living room"
  },
  {
    id: 12,
    name: "Air Purifier HEPA Filter",
    category: "Home & Kitchen",
    price: 12999,
    originalPrice: 16999,
    rating: 4.6,
    reviews: 789,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500",
    discount: 24,
    isNew: true,
    description: "Advanced air purifier with HEPA filter"
  },
  {
    id: 13,
    name: "Microwave Oven 25L",
    category: "Home & Kitchen",
    price: 7999,
    originalPrice: 10999,
    rating: 4.2,
    reviews: 456,
    image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=500",
    discount: 27,
    description: "Digital microwave oven with auto cook"
  },
  {
    id: 14,
    name: "Refrigerator Double Door 350L",
    category: "Home & Kitchen",
    price: 32999,
    originalPrice: 39999,
    rating: 4.5,
    reviews: 623,
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500",
    discount: 18,
    description: "Energy efficient double door refrigerator"
  },
  {
    id: 15,
    name: "Tablet 10.5 inch 128GB",
    category: "Electronics",
    price: 28999,
    originalPrice: 34999,
    rating: 4.4,
    reviews: 934,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500",
    discount: 17,
    isNew: true,
    description: "High-resolution tablet for work and play"
  },
  {
    id: 16,
    name: "Yoga Mat Premium",
    category: "Sports",
    price: 1299,
    originalPrice: 1999,
    rating: 4.3,
    reviews: 678,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
    discount: 35,
    description: "Non-slip premium yoga mat"
  },
  {
    id: 17,
    name: "Dumbbell Set 20kg",
    category: "Sports",
    price: 3499,
    originalPrice: 4999,
    rating: 4.5,
    reviews: 432,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500",
    discount: 30,
    description: "Adjustable dumbbell set for home gym"
  },
  {
    id: 18,
    name: "Backpack Laptop 15.6 inch",
    category: "Bags",
    price: 1899,
    originalPrice: 2999,
    rating: 4.2,
    reviews: 823,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    discount: 37,
    description: "Water-resistant laptop backpack"
  },
  {
    id: 19,
    name: "Coffee Maker Automatic",
    category: "Home & Kitchen",
    price: 5999,
    originalPrice: 8999,
    rating: 4.4,
    reviews: 512,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500",
    discount: 33,
    description: "Automatic coffee maker with grinder"
  },
  {
    id: 20,
    name: "LED Smart TV 55 inch 4K",
    category: "Electronics",
    price: 42999,
    originalPrice: 54999,
    rating: 4.7,
    reviews: 1567,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500",
    discount: 22,
    isNew: true,
    description: "4K Ultra HD Smart LED TV with HDR"
  }
];

// Connect to MongoDB and seed data
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/trizen-ventures';
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log(`✅ Successfully seeded ${products.length} products`);

    // Display sample data
    console.log('\n📦 Sample Products:');
    products.slice(0, 3).forEach(product => {
      console.log(`  - ${product.name} (₹${product.price})`);
    });

    console.log('\n✨ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
