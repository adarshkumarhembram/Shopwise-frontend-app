import React from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  return (
    <div>
      <h2 className="text-2xl font-semibold">Product Details — {id}</h2>
      <p className="text-gray-600 mt-2">Product information will be fetched from API.</p>
    </div>
  );
}
