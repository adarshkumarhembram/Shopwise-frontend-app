// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const authState = useSelector((s) => s.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.user) navigate("/"); // redirect on login
  }, [authState.user, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      // success — onAuthStateChanged already sets user
    } catch (err) {
      alert("Login failed: " + err);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-6 bg-slate-800 rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 mb-2 border rounded bg-slate-900" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 mb-4 border rounded bg-slate-900" />
      <button className="w-full py-2 btn-accent text-white rounded">{authState.status === "loading" ? "Signing..." : "Login"}</button>
      <p className="mt-3 text-sm text-slate-400">Don't have an account? <Link to="/signup" className="text-indigo-300">Signup</Link></p>
    </form>
  );
}
