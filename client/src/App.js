import './App.css';
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard';
import Submitted from './pages/Submitted';
import Failed from './pages/Failed';
import LeaderBoard from './pages/LeaderBoard';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Upload from './pages/Upload';
import AssignmentSubmission from './pages/AssignmentSubmission';
import TeacherDashboard from './pages/TeacherDashboard';
import FailedStudents from './pages/FailedStudents';
import TeacherLeaderboard from './pages/TeacherLeaderboard';


function App() {
  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/submitted" element={<Submitted />} />
        <Route path="/failed" element={<Failed />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/assignmentsubmission" element={<AssignmentSubmission />} />
        <Route path="/teacherdashboard" element={<TeacherDashboard />} />
        <Route path="/failedStudents" element={<FailedStudents />} />
        <Route path='/teacherLeaderboard' element={<TeacherLeaderboard />} />
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
