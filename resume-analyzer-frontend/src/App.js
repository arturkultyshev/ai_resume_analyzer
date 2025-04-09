import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ResumeUpload from "./pages/ResumeUpload";
import MyResumes from "./pages/MyResumes";
import Login from "./auth/Login";
import { getToken } from "./utils/token";
import Navbar from "./components/Navbar"; // 👈 импортируем Navbar

function App() {
  const isAuthenticated = !!getToken();

  return (
    <Router>
      {isAuthenticated && <Navbar />} {/* 👈 показываем меню только если пользователь залогинен */}

      <Routes>
        {!isAuthenticated ? (
          <Route path="*" element={<Login onLogin={() => window.location.reload()} />} />
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
