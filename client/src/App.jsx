import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import CreateQuiz from './pages/CreateQuiz';
import JoinQuiz from './pages/JoinQuiz';
import QuizInterface from './pages/QuizInterface';
import Leaderboard from './pages/Leaderboard';
import MyQuizzes from './pages/MyQuizzes';
import About from './pages/About';
import Contact from './pages/Contact';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import GlobalClickEffect from './components/GlobalClickEffect';
import './index.css';

function App() {
  return (
    <Router>
      <GlobalClickEffect />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />

        {/* Protected Routes */}
        <Route path="/home" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/create-quiz" element={<ProtectedRoute><CreateQuiz /></ProtectedRoute>} />
        <Route path="/join-quiz" element={<ProtectedRoute><JoinQuiz /></ProtectedRoute>} />
        <Route path="/my-quizzes" element={<ProtectedRoute><MyQuizzes /></ProtectedRoute>} />
        <Route path="/quiz" element={<ProtectedRoute><QuizInterface /></ProtectedRoute>} />

        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
