import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ResumeUpload from "./pages/ResumeUpload";
import MyResumes from "./pages/MyResumes";
import Login from "./auth/Login";
import { getToken, clearToken } from "./utils/token";
import Navbar from "./components/Navbar";
import "./App.css";
import AllJobs from "./pages/AllJobs";

function App() {
  const [token, setToken] = useState(getToken());

  const handleLogin = () => {
    setToken(getToken());
  };

  const handleLogout = () => {
    clearToken();         // удаляем токен
    setToken(null);       // вручную обнуляем состояние
  };

  return (
    <Router>
      {token && <Navbar onLogout={handleLogout} />}

      <Routes>
        {!token ? (
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        ) : (
          <>
            <Route path="/" element={<ResumeUpload />} />
            <Route path="/my-resumes" element={<MyResumes />} />
            <Route path="*" element={<Navigate to="/" />} />
              <Route path="/jobs" element={<AllJobs />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
