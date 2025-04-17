import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ResumeUpload from "./pages/ResumeUpload";
import MyResumes from "./pages/MyResumes";
import Login from "./auth/Login";
import { getToken } from "./utils/token";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [token, setToken] = useState(getToken());

  const handleLogin = () => {
    setToken(getToken());
  };

  return (
    <Router>
      {token && <Navbar />}

      <Routes>
        {!token ? (
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        ) : (
          <>
            <Route path="/" element={<ResumeUpload />} />
            <Route path="/my-resumes" element={<MyResumes />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
