// here we import our routing components
import { NavLink } from 'react-router-dom';

// this is our navigation component that handles site routing
export function Navigation() {
  // here we render our navigation links with active states
  return (
    <nav className="main-nav">
      <ul className="nav-list">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/books" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Bookshelf
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}