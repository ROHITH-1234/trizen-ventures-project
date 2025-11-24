# Trizen Ventures E-Commerce Platform

Full-stack e-commerce application with React frontend and Node.js backend.

## 📁 Project Structure

```
Landing Page/
├── frontend/          # React + Vite + Tailwind CSS
└── backend/           # Node.js + Express + MongoDB
```

---

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
```

Seed database:
```bash
npm run seed
```

Start backend:
```bash
npm run dev
```

Backend runs on: **http://localhost:5000**

---

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: **http://localhost:5173**

---

## ✨ Features

- 🔍 Real-time product search with autosuggest
- 🛍️ 20 products catalog
- 🎛️ Category & price filters
- 🛒 Shopping cart with persistence
- 📱 Fully responsive design
- 🎨 Professional UI/UX

---

## 🛠️ Technologies

### Frontend
- React 18
- Vite
- Tailwind CSS v4
- Context API

### Backend
- Node.js
- Express
- MongoDB Atlas
- Mongoose

---

## 📡 API Endpoints

```
GET  /api/products              # Get all products
GET  /api/search?q=term         # Search products
GET  /api/products/:id          # Get single product
GET  /api/products/category/:category  # Filter by category
