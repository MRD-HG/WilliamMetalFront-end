import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await api.post("/auth/login", { username, password });
      // Adjust according to backend response: token may be res.data.token
      const token = res.data?.token || res.data?.accessToken || res.data;
      if (!token) throw new Error("No token returned");
      localStorage.setItem("token", token);
      setLoading(false);
      nav("/dashboard");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Sign in</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <input className="w-full p-2 border rounded mb-3" placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} />
        <input className="w-full p-2 border rounded mb-3" placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full p-2 bg-black text-white rounded" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
