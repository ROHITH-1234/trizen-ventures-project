# Trizen Ventures - Frontend

Modern e-commerce landing page built with React, Vite, and Tailwind CSS.

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

The app will run on **http://localhost:5173**

### Build for Production
```bash
npm run build
```

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation & Search
│   │   ├── Hero.jsx            # Banner Section
│   │   ├── ProductCard.jsx     # Product Display
│   │   ├── ProductsGrid.jsx    # Products Listing
│   │   ├── Filters.jsx         # Category & Price Filters
│   │   └── Cart.jsx            # Shopping Cart
│   ├── context/
│   │   └── CartContext.jsx     # Global Cart State
│   ├── App.jsx                 # Main App Component
│   ├── main.jsx                # Entry Point
│   └── index.css               # Global Styles
├── public/                     # Static Assets
├── index.html                  # HTML Template
└── package.json                # Dependencies
```

---

## ✨ Features

### 🔍 Search & Autosuggest
- Real-time search with backend API
- Up to 5 product suggestions
- Case-insensitive partial matching

### 🛍️ Product Catalog
- 20 products from backend
- Product images, prices, ratings
- Discount & "NEW" badges
- Hover animations

### 🎛️ Filters
- Category filter (7 categories)
- Price range filter (₹0 - ₹1,00,000)
- Real-time filtering

### 🛒 Shopping Cart
- Add/remove products
- Quantity management
- LocalStorage persistence
- Slide-in cart UI

### 📱 Responsive Design
- Mobile-first approach
- Tablet & desktop layouts
- Smooth transitions

---

## 🔧 Technologies

- **React 18** - UI Library
- **Vite** - Build Tool
- **Tailwind CSS v4** - Styling
- **React Context API** - State Management

---

## 🌐 API Integration

Backend URL: `http://localhost:5000/api`

### Endpoints Used:
```javascript
GET /api/products          // Fetch all products
GET /api/search?q=term     // Search with autosuggest
```

---

## 🎨 Key Components

### Header
- Search bar with autosuggest
- Cart icon with badge count
- Trizen Ventures branding

### Hero
- Background image with animations
- Call-to-action buttons
- Floating particle effects

### ProductsGrid
- Fetches products from backend
- Applies filters (search, category, price)
- Loading & error states

### Cart
- Global state with Context API
- Persistent cart with localStorage
- Quantity controls & checkout

---

## 📦 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

---

## 🚀 Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist/` folder to your hosting service

---
