import { useEffect,useState } from "react";
import axios from "axios";

export default function AdminDashboard(){
  const [issues,setIssues] = useState([]);
  const [tab,setTab] = useState("all");
  const token = localStorage.getItem("token");


  useEffect(()=>{
    (tab==="all")?
    axios.get("http://localhost:5000/api/issues",{headers:{Authorization:`Bearer ${token}`}})
      .then(res=>setIssues(res.data)):
    axios.get(`http://localhost:5000/api/issues/status/${tab}`,{headers:{Authorization:`Bearer ${token}`}})
      .then(res=>setIssues(res.data))
  },[tab]);

  const updateStatus = (id,status)=>{
    axios.put(`http://localhost:5000/api/issues/${id}`,{status},
      {headers:{Authorization:`Bearer ${token}` }});
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black p-10 text-white">
      <h2 className="text-3xl font-bold mb-8 text-center">🏢 Hostel Issue Control Panel</h2>

      <div className="flex justify-center gap-4 mb-10">
        {["all","pending","progress","resolved"].map(t=>(
          <button key={t}
            onClick={()=>setTab(t)}
            className={`px-6 py-2 rounded-full border border-gray-600 transition
            ${tab===t?"bg-cyan-400 text-black":"hover:bg-gray-700"}`}>
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {issues.map(i=>(
          <div key={i._id} className="bg-gray-900/80 rounded-2xl p-6 shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold">{i.title}</h3>
            <p className="text-gray-300 text-sm mt-2">{i.description}</p>

            <div className="mt-3 text-sm">
              <p><span className="text-gray-400">Student:</span> {i.user?.name}</p>
              <p className="mt-1">
                Status:
                <span className={`ml-2 font-bold
                  ${i.status==="pending" && "text-orange-400"}
                  ${i.status==="progress" && "text-cyan-400"}
                  ${i.status==="resolved" && "text-green-400"}`}>
                  {i.status}
                </span>
              </p>
            </div>

            <select
              value={i.status}
              onChange={e=>updateStatus(i._id,e.target.value)}
              className="mt-4 w-full bg-black border border-gray-600 rounded-lg p-2 text-white focus:ring-2 focus:ring-cyan-400">
              <option value="pending">Pending</option>
              <option value="progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}