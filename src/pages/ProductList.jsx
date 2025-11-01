import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { apiFetch } from "../utils/api";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await apiFetch(`/products?search=${search}&page=${page}&limit=8`);
        // backend returns { products, totalPages }
        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, search]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">All Products</h2>

      {/* Search bar */}
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded-l px-3 py-2 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setPage(1)}
          className="bg-blue-600 text-white px-4 py-2 rounded-r"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.map((p) => <ProductCard key={p._id} product={p} />)
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1 border rounded"
          disabled={page === 1}
        >
          Prev
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
