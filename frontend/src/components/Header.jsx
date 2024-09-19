import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">Event Management</Link>
        </h1>
        <nav className="flex space-x-4">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          {user ? (
            <>
              <Link to="/events" className="hover:text-gray-400">My Events</Link>
              <button onClick={logout} className="hover:text-gray-400">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-400">Login</Link>
              <Link to="/register" className="hover:text-gray-400">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
 