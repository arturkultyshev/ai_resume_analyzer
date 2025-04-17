import { Link, useNavigate } from "react-router-dom";
import { clearToken } from "../utils/token";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate("/"); // перенаправим на логин
  };

  return (
      <nav className="navbar">
          <div className="nav-links">
              <Link to="/" className="nav-link">Загрузка резюме</Link>
              <Link to="/my-resumes" className="nav-link">Мои резюме</Link>
          </div>
          <button onClick={handleLogout} className="logout-btn">
              Выйти
          </button>
      </nav>
  );
}
