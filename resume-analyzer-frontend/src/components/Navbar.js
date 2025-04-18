import { Link, useNavigate } from "react-router-dom";
import { clearToken } from "../utils/token";

export default function Navbar({ onLogout }) {
  const navigate = useNavigate();

  return (
      <nav className="navbar">
          <div className="nav-links">
              <Link to="/" className="nav-link">Загрузка резюме</Link>
              <Link to="/my-resumes" className="nav-link">Мои резюме</Link>
              <Link to="/jobs" className="nav-link">Все вакансии</Link>
          </div>
          <button onClick={onLogout} className="logout-btn">
              Выйти
          </button>
      </nav>
  );
}
