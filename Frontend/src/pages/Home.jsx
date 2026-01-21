import { Link } from "react-router-dom";

export default function Home(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 text-white">

      {/* Hero Section */}
      <div className="h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Smart Hostel <span className="text-cyan-400">Monitoring System</span>
        </h1>
        <p className="mt-6 text-gray-400 max-w-xl">
          Manage hostel issues, complaints, and services digitally.  
          Fast, transparent, and paperless hostel management.
        </p>

        <div className="mt-8 flex gap-5">
          <Link to="/login"
            className="px-8 py-3 rounded-full bg-cyan-400 text-black font-semibold hover:scale-105 transition">
            Login
          </Link>
          <Link to="/register"
            className="px-8 py-3 rounded-full border border-gray-500 hover:bg-gray-800 rounded-full transition">
            Register
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            ["📩 Digital Complaints","Students can raise issues instantly"],
            ["📊 Admin Control Panel","Admins track & resolve issues"],
            ["⚡ Fast Resolution","Status updates in real-time"]
          ].map((f,i)=>(
            <div key={i} className="bg-gray-900/70 p-6 rounded-2xl shadow hover:scale-105 transition">
              <h3 className="text-xl font-semibold mb-2">{f[0]}</h3>
              <p className="text-gray-400">{f[1]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-gray-800 text-gray-500">
        © 2025 Smart Hostel Monitoring System
      </footer>
    </div>
  );
}
