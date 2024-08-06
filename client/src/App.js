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
import FailedAssignments from './pages/FailedStudents';
import TeacherLeaderboard from './pages/TeacherLeaderboard';


function App() {
  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/dashboard/:studentId" element={<Dashboard />} />
        <Route path="/upload/:teacherId" element={<Upload />} />
        <Route path="/submitted/:studentId" element={<Submitted />} />
        <Route path="/failed/:studentId" element={<Failed />} />
        <Route path="/leaderboard/:studentId" element={<LeaderBoard />} />
        <Route path="/assignmentsubmission/:studentId/:assignmentId" element={<AssignmentSubmission />} />
        <Route path="/teacherdashboard/:teacherId" element={<TeacherDashboard />} />
        <Route path="/failedStudents/:teacherId" element={<FailedAssignments />} />
        <Route path='/teacherLeaderboard/:teacherId' element={<TeacherLeaderboard />} />
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
