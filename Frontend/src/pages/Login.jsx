import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const nav = useNavigate();

  const handleLogin = async()=>{
    const res = await axios.post("http://localhost:5000/api/auth/login",{email,password});
    localStorage.setItem("token",res.data.token);
    localStorage.setItem("role",res.data.role);
    nav(res.data.role==="admin"?"/admin":"/student");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 flex items-center justify-center">
      <div className="bg-gray-900/80 p-10 rounded-3xl w-96 shadow-xl text-white">

        <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>

        <input placeholder="Email" className="input" onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="input mt-4" onChange={e=>setPassword(e.target.value)} />

        <button onClick={handleLogin}
          className="w-full mt-6 bg-cyan-400 text-black py-3 rounded-full font-semibold hover:scale-105 transition">
          Login
        </button>

        <p className="mt-4 text-center text-gray-400">
          New here? <a href="/register" className="text-cyan-400">Create account</a>
        </p>
      </div>
    </div>
  );
}
