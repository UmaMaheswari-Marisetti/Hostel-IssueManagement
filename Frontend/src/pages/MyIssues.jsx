import { useEffect,useState } from "react";
import axios from "axios";

export default function MyIssues(){
  const [issues,setIssues]=useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/api/issues/myIssues",
      { headers:{ Authorization:`Bearer ${localStorage.getItem("token")}`}}
    ).then(res=>setIssues(res.data));
  },[]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">
      <h2 className="text-2xl font-bold mb-6">My Complaints</h2>

      <div className="space-y-4">
        {issues.map(i=>(
          <div key={i._id} className="bg-gray-900 p-5 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold">{i.title}</h3>
            <p className="text-gray-400 mt-1">{i.description}</p>
            <span className={`mt-2 inline-block px-4 py-1 rounded-full text-sm
              ${i.status==="resolved"?"bg-green-500":"bg-yellow-400"} text-black`}>
              {i.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
