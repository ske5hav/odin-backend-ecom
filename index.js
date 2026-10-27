
const express = require("express");
const app = express();
const path = require("path");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS setup
app.set("view engine", "ejs");

// Public folder se CSS, JavaScript aur images load karna
app.use(express.static(path.join(__dirname, "public")));

// Products ka data
const products = [
    {
        id: 1,
        name: "Nike Shoes",
        price: 2499,
        category: "Footwear",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
    },
    {
        id: 2,
        name: "Puma T-Shirt",
        price: 999,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"
    },
    {
        id: 3,
        name: "Samsung Mobile",
        price: 15999,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"
    },
    {
        id: 4,
        name: "Adidas Bag",
        price: 1499,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"
    },
    {
        id: 5,
        name: "Levi's Jeans",
        price: 1999,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400"
    },
    {
        id: 6,
        name: "Boat Headphones",
        price: 1299,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    },
    {
        id: 7,
        name: "Reebok Shoes",
        price: 2999,
        category: "Footwear",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
    },
    {
        id: 8,
        name: "Titan Watch",
        price: 3499,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400"
    },
    {
        id: 9,
        name: "HP Laptop",
        price: 45999,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"
    },
    {
        id: 10,
        name: "Woodland Wallet",
        price: 799,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400"
    }
];

// Main frontend page
app.get("/", (req, res) => {
    res.render("index");
});

// API: Frontend ko products ka data dena
app.get("/api/products", (req, res) => {
    res.json(products);
});

// Server start
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
