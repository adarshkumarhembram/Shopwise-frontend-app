// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAdd }) {
  const id = product._id ?? product.id;
  return (
    <div className="card-hover bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-sm">
      <Link to={`/product/${id}`} className="block">
        <div className="relative h-56 overflow-hidden">
          <img
            src={product.images?.[0] ?? product.thumbnail ?? "/placeholder.png"}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-3 left-3 text-xs bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-2 py-1 rounded-md">
            {product.category}
          </span>
        </div>

        <div className="p-4 flex flex-col justify-between h-[150px]">
          <div>
            <h3 className="text-lg font-semibold line-clamp-1 text-slate-100">{product.title}</h3>
            <p className="text-sm text-slate-400 line-clamp-2 mt-1">{product.description}</p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-lg font-bold text-indigo-400">₹{product.price}</span>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAdd && onAdd(product); }}
              className="btn-accent text-white text-sm px-4 py-2 rounded-lg font-medium shadow-md"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
