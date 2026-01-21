import { Routes, Route} from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import RaiseIssue from "./pages/RaiseIssue";
import MyIssues from "./pages/MyIssues";

function App() {
  return(
    
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/raise-issue" element={<RaiseIssue />} />
        <Route path="/my-issues" element={<MyIssues />} />
        <Route path="/admin" element={<AdminDashboard />} /> 
        
      </Routes>
  );
}

export default App;


