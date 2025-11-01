// src/pages/Home.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((s) => s.products);

  // UI controls
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");

  // pagination-like "load more"
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [dispatch, status]);

  // categories list
  const categories = useMemo(() => {
    const set = new Set((items || []).map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [items]);

  // filter + search + sort
  const filtered = useMemo(() => {
    let arr = items || [];
    if (query) {
      const q = query.toLowerCase();
      arr = arr.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q) ||
          (p.brand || "").toLowerCase().includes(q)
      );
    }
    if (category !== "All") arr = arr.filter((p) => p.category === category);
    if (sortBy === "low") arr = arr.slice().sort((a, b) => a.price - b.price);
    if (sortBy === "high") arr = arr.slice().sort((a, b) => b.price - a.price);
    if (sortBy === "rating") arr = arr.slice().sort((a, b) => b.rating - a.rating);
    return arr;
  }, [items, query, category, sortBy]);

  const visible = filtered.slice(0, limit);
  const canLoadMore = visible.length < filtered.length;

  const handleAdd = (product) => {
    // replace this with dispatch(addToCart(...)) when cart slice is ready
    alert(`${product.title} added (demo)`);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-slate-100">Products</h1>

        <div className="flex flex-wrap gap-3">
          <input
            className="px-3 py-2 rounded-md border border-slate-600 bg-slate-900 text-slate-200"
            placeholder="Search title, description or brand..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="px-3 py-2 rounded-md border border-slate-600 bg-slate-900 text-slate-200"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            className="px-3 py-2 rounded-md border border-slate-600 bg-slate-900 text-slate-200"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popular">Popular</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {status === "loading" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="animate-pulse bg-slate-800 rounded-lg h-80" />
          ))}
        </div>
      )}

      {status === "succeeded" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {visible.map((p) => (
              <div key={p._id} className="relative">
                <div className="absolute right-3 top-3 bg-slate-900 text-slate-200 px-2 py-1 rounded-md text-xs shadow">
                  <strong className="text-indigo-300">{p.brand}</strong>
                </div>

                <ProductCard product={p} onAdd={handleAdd} />

                <div className="absolute left-3 bottom-36 bg-gradient-to-r from-yellow-400 to-orange-400 px-2 py-1 rounded-md text-xs text-slate-900 shadow">
                  ⭐ {p.rating}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center mt-8">
            {canLoadMore ? (
              <button
                onClick={() => setLimit((l) => l + 12)}
                className="px-5 py-2 rounded-md btn-accent text-white"
              >
                Load more
              </button>
            ) : (
              <div className="text-slate-400">No more products</div>
            )}
          </div>
        </>
      )}

      {status === "failed" && <p className="text-red-400">Failed to load products.</p>}
    </main>
  );
}
