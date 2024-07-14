
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="navbar bg-base-100">
      <Link to="/" className="btn btn-ghost normal-case text-xl">TodoApp</Link>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          {isLoggedIn && <li><Link to="/admin">Admin</Link></li>}
          {isLoggedIn && <li><Link to="/time-management">Time Management</Link></li>}
          {!isLoggedIn ? (
            <li><Link to="/login">Login</Link></li>
          ) : (
            <li><button onClick={handleLogout} className="btn btn-ghost">Logout</button></li>
          )}
        </ul>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Navbar;
