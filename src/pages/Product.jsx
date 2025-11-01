// src/pages/Product.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addToCart } from "../features/cart/cartSlice";
import { fetchProducts } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";

export default function Product() {
  const { id: rawId } = useParams(); // e.g. "2" or "2-" or "2-some-slug"
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productsState = useSelector((s) => s.products || { items: [], status: "idle" });
  const { items, status } = productsState;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [qty, setQty] = useState(1);

  // sanitize id: extract leading number if url contains slug e.g. "2-" or "2-something"
  const sanitizeId = (raw) => {
    if (!raw) return raw;
    // find first continuous number group
    const m = String(raw).match(/^(\d+)/);
    return m ? m[1] : raw;
  };
  const id = sanitizeId(rawId);

  // helper to set product state from store item
  const setFromStore = (p) => {
    setProduct(p);
    setMainImage(p?.images?.[0] ?? p?.thumbnail ?? "/placeholder.png");
  };

  useEffect(() => {
    // if store has products loaded, try to find product
    if ((items?.length || 0) > 0) {
      const found = items.find((p) => String(p._id) === String(id) || String(p.id) === String(id));
      if (found) {
        setFromStore(found);
        return;
      }
    }

    // if store empty or not found, try to fetch single product from dummyjson
    const fetchSingle = async () => {
      try {
        setLoading(true);
        setError(null);

        // if store is idle, kick off full fetch in background (optional)
        if (status === "idle") dispatch(fetchProducts()).catch(() => { /* no-op */ });

        // try dummyjson single product endpoint if id is numeric
        if (!isNaN(Number(id))) {
          const res = await axios.get(`https://dummyjson.com/products/${id}`);
          const p = res.data;
          // normalize shape to match our app
          const normalized = {
            _id: p.id,
            id: p.id,
            title: p.title,
            description: p.description,
            price: p.price,
            images: p.images && p.images.length ? p.images : [p.thumbnail],
            thumbnail: p.thumbnail,
            category: p.category,
            brand: p.brand,
            rating: p.rating,
            stock: p.stock ?? 0,
          };
          setFromStore(normalized);
          setLoading(false);
          return;
        }

        // otherwise not numeric and not found -> show not found
        setError("Product not found");
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Failed to load product");
        setLoading(false);
      }
    };

    fetchSingle();
  }, [id, items, status, dispatch]);

  useEffect(() => {
    if (product) setMainImage(product.images?.[0] ?? product.thumbnail ?? "/placeholder.png");
  }, [product]);

  if (loading || status === "loading") {
    return <div className="p-8 text-slate-300">Loading product…</div>;
  }
  if (error && !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-2">Product not found</h2>
        <p className="text-slate-400 mb-4">{error}</p>
        <button onClick={() => navigate(-1)} className="px-4 py-2 rounded bg-indigo-600 text-white">Go back</button>
      </div>
    );
  }
  if (!product) {
    return <div className="p-8 text-slate-300">No product to display.</div>;
  }

  const inStock = (product.stock ?? 0) > 0;

  const handleAdd = () => {
    const qtyToAdd = Math.max(1, qty);
    dispatch(addToCart({
      id: product._id ?? product.id,
      title: product.title,
      price: product.price,
      image: product.images?.[0] ?? product.thumbnail ?? "/placeholder.png",
      qty: qtyToAdd,
    }));
    // feedback
    alert(`${product.title} (${qtyToAdd}) added to cart`);
  };

  const related = (items || []).filter((p) => p.category === product.category && String(p._id) !== String(product._id)).slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* left: images */}
        <div>
          <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
            <img src={mainImage} alt={product.title} className="w-full h-[520px] object-contain bg-white" />
          </div>

          {product.images && product.images.length > 1 && (
            <div className="mt-3 flex gap-3 overflow-x-auto">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setMainImage(img)} className="w-24 h-24 rounded overflow-hidden border border-slate-700">
                  <img src={img} alt={`${product.title}-${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* right: info */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-100">{product.title}</h1>
              <div className="mt-2 text-sm text-slate-400">
                <span>{product.brand}</span>
                <span className="mx-2">•</span>
                <span className="text-yellow-400">⭐ {product.rating ?? "—"}</span>
                <span className="mx-2">•</span>
                <span className={inStock ? "text-green-300" : "text-rose-400"}>
                  {inStock ? `In stock (${product.stock})` : "Out of stock"}
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-slate-400">Price</div>
              <div className="text-3xl font-bold text-indigo-300">₹{product.price}</div>
            </div>
          </div>

          <p className="mt-6 text-slate-300">{product.description}</p>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border border-slate-700 rounded">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2">-</button>
              <div className="px-4 text-slate-100">{qty}</div>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2">+</button>
            </div>

            <button
              onClick={handleAdd}
              disabled={!inStock}
              className={`px-4 py-2 rounded-md text-white btn-accent ${!inStock ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Add to Cart
            </button>

            <button className="px-4 py-2 rounded-md border border-slate-700 text-slate-200">Buy Now</button>
          </div>

          <div className="mt-8">
            <h4 className="font-semibold text-slate-100 mb-2">Product details</h4>
            <ul className="text-sm text-slate-300 list-disc ml-5">
              <li>Category: {product.category}</li>
              {product.brand && <li>Brand: {product.brand}</li>}
              <li>SKU: {product._id ?? product.id}</li>
              <li>Rating: {product.rating ?? "—"}</li>
              <li>Stock: {product.stock ?? "—"}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* related */}
      {related.length > 0 && (
        <section className="mt-12">
          <h3 className="text-xl font-semibold text-slate-100 mb-4">Related products</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p._id ?? p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
