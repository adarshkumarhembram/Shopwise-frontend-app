// src/pages/Signup.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const authState = useSelector((s) => s.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.user) navigate("/"); // redirect on signup
  }, [authState.user, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signupUser({ email, password, displayName: name })).unwrap();
    } catch (err) {
      alert("Signup failed: " + err);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-6 bg-slate-800 rounded">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full p-2 mb-2 border rounded bg-slate-900" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 mb-2 border rounded bg-slate-900" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 mb-4 border rounded bg-slate-900" />
      <button className="w-full py-2 btn-accent text-white rounded">{authState.status === "loading" ? "Creating..." : "Signup"}</button>
    </form>
  );
}
