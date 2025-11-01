import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAddToCart, onAddToWishlist }) {
  // product: { _id, name, images, price, originalPrice, rating, shortDesc }
  const img = product?.images?.[0] || "/placeholder.png";
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition">
      <Link to={`/products/${product?._id || ""}`} className="block">
        <img src={img} alt={product?.name} className="w-full h-44 object-cover" />
        <div className="p-3">
          <h3 className="font-medium text-lg">{product?.name || "Product Name"}</h3>
          <p className="text-sm text-gray-500 truncate">{product?.shortDesc || "Short description of the product."}</p>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <span className="font-semibold text-lg">₹{product?.price ?? "0"}</span>
              {product?.originalPrice && (
                <span className="text-sm line-through ml-2 text-gray-400">₹{product.originalPrice}</span>
              )}
            </div>
            <div className="text-sm text-yellow-600">{product?.rating ?? "4.5"}</div>
          </div>
        </div>
      </Link>
      <div className="border-t px-3 py-2 flex gap-2">
        <button
          onClick={() => onAddToCart && onAddToCart(product)}
          className="flex-1 text-sm py-1 rounded border hover:bg-gray-100"
        >
          Add to Cart
        </button>
        <button
          onClick={() => onAddToWishlist && onAddToWishlist(product)}
          className="px-3 py-1 rounded border hover:bg-gray-100"
        >
          ♡
        </button>
      </div>
    </div>
  );
}
