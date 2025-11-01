import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import CategoryPill from "../components/CategoryPill"; // optional

// Temporary static data (replace with API call later)
const sampleProducts = [
  { _id: "1", name: "Classic Tee", images: [], price: 499, originalPrice: 699, rating: 4.3, shortDesc: "Comfortable cotton tee" },
  { _id: "2", name: "Sneaker X", images: [], price: 2499, originalPrice: 2999, rating: 4.6, shortDesc: "Stylish everyday sneakers" },
  { _id: "3", name: "Backpack Pro", images: [], price: 1299, originalPrice: 1499, rating: 4.4, shortDesc: "Durable travel backpack" },
  { _id: "4", name: "Wireless Earbuds", images: [], price: 1599, originalPrice: 1999, rating: 4.2, shortDesc: "Clear sound and battery" },
];

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // For now use sample data. Later replace with API call:
    // fetch(`${import.meta.env.VITE_API_BASE_URL}/products?limit=8`)
    //   .then(r => r.json()).then(data => setProducts(data.products))
    setProducts(sampleProducts);
  }, []);

  const handleAddToCart = (product) => {
    // quick UI feedback or call API
    alert(`${product.name} added to cart (demo)`);
  };

  const handleAddToWishlist = (product) => {
    alert(`${product.name} added to wishlist (demo)`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-white to-gray-50 rounded-lg p-8 mb-8">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Something New at ShopWise</h1>
            <p className="text-gray-600 mb-6">Quality products, great prices — built as a MERN project. Explore featured items and deals.</p>
            <div className="flex gap-3">
              <a href="/products" className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Shop Now</a>
              <a href="/products" className="px-5 py-2 border rounded hover:bg-gray-100">Explore</a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white border rounded-lg p-4 shadow">
              <img src="/banner-placeholder.png" alt="banner" className="w-full h-56 object-cover rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["Clothing","Shoes","Electronics","Bags","Home"].map(cat => (
            <CategoryPill key={cat} label={cat} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Featured Products</h2>
          <a href="/products" className="text-sm text-blue-600">View all</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(prod => (
            <ProductCard
              key={prod._id}
              product={prod}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
