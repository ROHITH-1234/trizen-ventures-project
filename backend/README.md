# Trizen Ventures Backend API

Backend server for Trizen Ventures Shopping Platform built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure MongoDB Atlas

1. Copy `.env.example` to `.env`:
```bash
copy .env.example .env
```

2. Update `.env` with your MongoDB Atlas connection string:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/trizen-ventures?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

### 3. Seed the Database
```bash
npm run seed
```

### 4. Start the Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

---

## 📡 API Endpoints

### 1. Get All Products
```http
GET /api/products
```

**Response:**
```json
{
  "success": true,
  "count": 20,
  "data": [
    {
      "id": 1,
      "name": "Smartphone Max 20 Pro",
      "category": "Electronics",
      "price": 45999,
      "originalPrice": 54999,
      "rating": 4.5,
      "reviews": 1250,
      "image": "https://...",
      "discount": 16,
      "isNew": true,
      "description": "Latest flagship smartphone..."
    }
    // ... more products
  ]
}
```

### 2. Search Products (Autosuggest)
```http
GET /api/search?q=phone
```

**Query Parameters:**
- `q` - Search term (case-insensitive, partial match)

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    "Smartphone Max 20 Pro",
    "Wireless Bluetooth Headphones"
  ],
  "products": [
    // Full product objects for matched items
  ]
}
```

**Features:**
- ✅ Case-insensitive search
- ✅ Partial matching (e.g., "phone" matches "Smartphone")
- ✅ Searches both name and category
- ✅ Returns maximum 5 suggestions
- ✅ Sorted by rating (highest first)

### 3. Get Product by ID
```http
GET /api/products/:id
```

**Example:** `GET /api/products/1`

### 4. Get Products by Category
```http
GET /api/products/category/:category
```

**Example:** `GET /api/products/category/Electronics`

---

## 📂 Project Structure

```
backend/
├── models/
│   └── Product.js          # Mongoose Product schema
├── routes/
│   └── products.js         # API route handlers
├── scripts/
│   └── seed.js            # Database seeding script
├── server.js              # Main server file
├── package.json           # Dependencies
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

---

## 🗄️ Database Schema

```javascript
{
  id: Number,              // Unique product ID
  name: String,            // Product name
  category: String,        // Category (Electronics, Fashion, etc.)
  price: Number,           // Current price
  originalPrice: Number,   // Original price (optional)
  rating: Number,          // Rating (0-5)
  reviews: Number,         // Number of reviews
  image: String,           // Image URL
  discount: Number,        // Discount percentage (optional)
  isNew: Boolean,          // New product flag
  description: String      // Product description
}
```

---

## 📦 Seeded Products

The seed script populates the database with **20 products** across categories:
- 📱 Electronics (7 items)
- 👕 Fashion (3 items)
- 🏠 Home & Furniture (3 items)
- 🍳 Home & Kitchen (4 items)
- ⚽ Sports (2 items)
- 🎒 Bags (1 item)

---

## 🛠️ Available Scripts

```bash
npm start       # Start production server
npm run dev     # Start development server with nodemon
npm run seed    # Seed database with sample products
```

---

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb://localhost:27017/trizen-ventures` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |

---

## 📝 Notes

- MongoDB Atlas is recommended for production
- CORS is enabled for all origins (configure for production)
- Text indexes are created for faster search queries
- All responses follow a consistent format with `success`, `count`, and `data` fields

---

## 🔗 Connect Frontend

Update your frontend API calls to use:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';

// Get all products
fetch(`${API_BASE_URL}/products`)

// Search products
fetch(`${API_BASE_URL}/search?q=${query}`)
```

---
