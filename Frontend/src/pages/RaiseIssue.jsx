import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RaiseIssue(){
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const nav = useNavigate();

  const submitIssue = async()=>{
    await axios.post("http://localhost:5000/api/issues",
      {title,description},
      { headers:{ Authorization:`Bearer ${localStorage.getItem("token")}`}}
    );
    nav("/student");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="bg-gray-900 p-10 rounded-3xl w-[500px]">

        <h2 className="text-2xl font-bold mb-6">Raise New Issue</h2>

        <input placeholder="Issue Title" className="input" onChange={e=>setTitle(e.target.value)} />
        <textarea placeholder="Describe your problem" className="input mt-4 h-32"
          onChange={e=>setDescription(e.target.value)}></textarea>

        <button onClick={submitIssue}
          className="w-full mt-6 bg-cyan-400 text-black py-3 rounded-full font-semibold hover:scale-105 transition">
          Submit Issue
        </button>
      </div>
    </div>
  );
}
