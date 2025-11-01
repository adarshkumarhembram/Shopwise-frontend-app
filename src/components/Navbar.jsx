// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  const user = useSelector((s) => s.auth?.user);
  const cartItems = useSelector((s) => s.cart?.items ?? []);
  const totalQty = cartItems.reduce((acc, i) => acc + (i.qty || 0), 0);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap();
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-700">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-white tracking-wide">ShopWise</Link>
        <div className="flex items-center gap-6 text-slate-300">
          <Link to="/cart" className="hover:text-indigo-400 relative">
            Cart
            {totalQty > 0 && (
              <span className="absolute -top-2 -right-3 bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full">
                {totalQty}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <span className="text-slate-200 hidden sm:inline">{user.name ?? user.email}</span>
              <button onClick={handleLogout} className="text-slate-200 hover:text-indigo-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-400">Login</Link>
              <Link to="/signup" className="hover:text-indigo-400">Signup</Link>
            </>
          )}

          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
}
