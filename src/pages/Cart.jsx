// src/pages/Cart.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, decreaseQty, increaseQty, clearCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart?.items ?? []);

  const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0);
  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/" className="mt-4 inline-block text-indigo-400">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map((it) => (
            <div key={it.id} className="flex items-center gap-4 p-4 bg-slate-800 rounded-lg border border-slate-700">
              <img src={it.image} alt={it.title} className="w-24 h-24 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-100">{it.title}</h3>
                <p className="text-sm text-slate-400">₹{it.price}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={() => dispatch(decreaseQty(it.id))} className="px-3 py-1 border rounded">-</button>
                  <span className="px-3">{it.qty}</span>
                  <button onClick={() => dispatch(increaseQty(it.id))} className="px-3 py-1 border rounded">+</button>
                  <button onClick={() => dispatch(removeFromCart(it.id))} className="ml-4 px-3 py-1 bg-rose-600 text-white rounded">Remove</button>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-indigo-300">₹{it.price * it.qty}</div>
              </div>
            </div>
          ))}
        </div>

        <aside className="p-4 bg-slate-900 border border-slate-700 rounded-lg">
          <h2 className="font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between text-slate-300 mb-2">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-slate-300 mb-4">
            <span>Shipping</span>
            <span>₹{shipping}</span>
          </div>
          <div className="flex justify-between font-bold text-slate-100 text-lg mb-4">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button className="w-full btn-accent text-white py-2 rounded mb-2">Proceed to Checkout</button>
          <button onClick={() => dispatch(clearCart())} className="w-full border border-slate-700 py-2 rounded text-slate-300">Clear Cart</button>
        </aside>
      </div>
    </div>
  );
}
