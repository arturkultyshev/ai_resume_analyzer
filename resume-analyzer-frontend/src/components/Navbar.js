import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex gap-4">
      <Link to="/" className="hover:underline">Загрузить резюме</Link>
      <Link to="/my-resumes" className="hover:underline">Мои резюме</Link>
    </nav>
  );
}
