import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded ${isActive ? "bg-gray-200" : "hover:bg-gray-100"}`
    }
  >
    {children}
  </NavLink>
);

export default function Navbar() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">🛒 ShopWise</Link>
        <nav className="flex items-center gap-2">
          <NavItem to="/products">Products</NavItem>
          <NavItem to="/cart">Cart</NavItem>
          <NavItem to="/wishlist">Wishlist</NavItem>
          <NavItem to="/dashboard">Dashboard</NavItem>
          <Link to="/login" className="ml-4 px-3 py-1 border rounded">Login</Link>
        </nav>
      </div>
    </header>
  );
}
