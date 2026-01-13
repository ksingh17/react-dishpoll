import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ handleLogout }) => {
  const location = useLocation();

  return (
    <div className="navbar">
      <div className="nav-left">
        <span className="logo">🍽 Dish Poll</span>
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
        >
          Vote
        </Link>
        <Link
          to="/results"
          className={location.pathname === "/results" ? "active" : ""}
        >
          Results
        </Link>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
