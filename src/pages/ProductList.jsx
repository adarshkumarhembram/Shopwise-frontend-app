import React from "react";
import { Link } from "react-router-dom";

export default function ProductList() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* temporary static cards */}
        {[1,2,3].map((id) => (
          <div key={id} className="border rounded p-4">
            <h3 className="font-medium">Product {id}</h3>
            <p className="text-sm text-gray-500">Short description</p>
            <Link to={`/products/${id}`} className="mt-2 inline-block text-blue-600">View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
