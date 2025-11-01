import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import CategoryPill from "../components/CategoryPill";
import { apiFetch } from "../utils/api"; 

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await apiFetch("/products?limit=4");
        setProducts(data.products || []);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    }
    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Something New at ShopWise
            </h1>
            <p className="text-gray-600 mb-6">
              Quality products, great prices — built as a MERN project. Explore
              featured items and deals.
            </p>
            <div className="flex gap-3">
              <a
                href="/products"
                className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Shop Now
              </a>
              <a
                href="/products"
                className="px-5 py-2 border rounded hover:bg-gray-100"
              >
                Explore
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white border rounded-lg p-4 shadow">
              <img
                src="/banner-placeholder.png"
                alt="banner"
                className="w-full h-56 object-cover rounded"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["Clothing", "Shoes", "Electronics", "Bags", "Home"].map((cat) => (
            <CategoryPill key={cat} label={cat} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Featured Products</h2>
          <a href="/products" className="text-sm text-blue-600">
            View all
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((prod) => (
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
