import React from "react";

export default function Login(){
  return (
    <div className="max-w-md mx-auto mt-24">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <input className="w-full p-2 border rounded mb-3" placeholder="username" />
        <input className="w-full p-2 border rounded mb-3" placeholder="password" type="password" />
        <button className="w-full p-2 bg-black text-white rounded">Sign in</button>
      </div>
    </div>
  );
}
