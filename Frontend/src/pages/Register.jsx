import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [role,setRole]=useState("student");
  const nav = useNavigate();

  const handleRegister = async()=>{
    await axios.post("http://localhost:5000/api/auth/register",{name,email,password,role});
    nav("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 flex items-center justify-center">
      <div className="bg-gray-900/80 p-10 rounded-3xl w-96 shadow-xl text-white">

        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

        <input placeholder="Name" className="input" onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" className="input mt-4" onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="input mt-4" onChange={e=>setPassword(e.target.value)} />

        <select className="input mt-4" onChange={e=>setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={handleRegister}
          className="w-full mt-6 bg-cyan-400 text-black py-3 rounded-full font-semibold hover:scale-105 transition">
          Register
        </button>

        <p className="mt-4 text-center text-gray-400">
          Already have an account? <a href="/login" className="text-cyan-400">Login</a>
        </p>
      </div>
    </div>
  );
}
