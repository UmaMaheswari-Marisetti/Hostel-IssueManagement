import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function StudentDashboard(){
  const[stats,setStats]= useState({
    total:0,
    pending:0,
    progress:0,
    resolved:0,
  });

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/issues/myIssues",
              { headers:{ Authorization:`Bearer ${localStorage.getItem("token")}`}}
            );

        const issues = res.data;
        const progress = issues.filter(i => i.status === "progress").length;
        const pending = issues.filter(i => i.status === "pending").length;
        const resolved = issues.filter(i => i.status === "resolved").length;

        setStats({
          total: issues.length,
          pending,
          progress,
          resolved,
        });
      } catch (err) {
        console.error("Failed to load issues", err);
      }
    };

    fetchIssues();
  }, []);
  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">
      
      <h1 className="text-3xl font-bold mb-8">Student Dashboard</h1>

      <div className="grid grid-cols-4 gap-6">
        <Card title="My Issues" value={stats.total}/>
        <Card title="Pending Issues" value={stats.pending} />
        <Card title="Issues in progress" value={stats.progress}/>
        <Card title="Resolved Issues" value={stats.resolved} />
      </div>

      <div className="mt-12 grid grid-cols-2 gap-8">
        <QuickAction title="Raise New Issue" link="/raise-issue" />
        <QuickAction title="My Complaints" link="/my-issues" />
      </div>
    </div>
  );
}

const Card = ({title,value})=>(
  <div className="bg-gray-900 p-6 rounded-2xl shadow">
    <h3 className="text-gray-400">{title}</h3>
    <p className="text-4xl font-bold text-cyan-400 mt-2">{value}</p>
  </div>
);

const QuickAction = ({title,link})=>(
  <Link to={link} className="bg-gradient-to-r from-cyan-400 to-blue-500 p-10 rounded-3xl text-black font-bold text-xl text-center hover:scale-105 transition">
    {title}
  </Link>
);
