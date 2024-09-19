// AuthContext.js
/* eslint-disable no-unused-vars */
import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import axios from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';

// Create Auth Context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get('/auth/check');
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false); // Ensure this is set to false after checking
      }
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/auth/login', { email, password });
      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      console.error(err.message);
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post('/auth/register', { name, email, password });
      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/auth/logout');
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="loader">Loading...</div> {/* Custom loader or a spinner */}
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

// Add PropTypes validation here
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children prop is passed and it's a valid React node
};
