import { NavLink } from 'react-router-dom';
import { FaFilm } from 'react-icons/fa';

export const Header = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg mb-3">
      <div className="container">
        <NavLink className="navbar-brand" to="">
          <FaFilm className="d-inline-block align-text-top mt-1 mr-1" />
          <span> Movies Finder</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="movies">
                Movies
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
