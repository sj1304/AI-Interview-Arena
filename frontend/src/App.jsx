import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Navigation from "./Components/Navigation";
import InterviewArena from "./Components/InterviewArena";
import ProtectedRoute from "./Components/ProtectedRoute";
import History from "./Components/History";
import Profile from "./Components/Profile";
import BattleArea from "./Components/BattleArea";
import Evaluation from "./Components/Evaluation";
function App() {
  return (
    <BrowserRouter>
      

     <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Navigation />
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interviewarena"
          element={
            <ProtectedRoute>
              <Navigation />
              <InterviewArena />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <Navigation />
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Navigation />
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/battleArena"
          element={
            <ProtectedRoute>
              <BattleArea />
            </ProtectedRoute>
          }
        />
      
      <Route
          path="/evaluation"
          element={
            <ProtectedRoute>
              <Evaluation />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;