import './App.css';
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';



function App() {
  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/signup" element={<Register />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

function MainApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default MainApp;
