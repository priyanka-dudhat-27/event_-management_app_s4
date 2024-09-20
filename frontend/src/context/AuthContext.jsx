/* eslint-disable no-unused-vars */
import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';

// Create Auth Context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      try {

        const res = await axios.get(''); // Adjust endpoint as necessary
        setUser(res.data.user || null); // Set user if found
      } catch (err) {
        setUser(null); // If error, ensure user is null
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      setUser(res.data.user);
      navigate('/'); // Redirect to home after login
    } catch (err) {
      console.error('Login failed:', err.message);
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, { name, email, password });
      setUser(res.data.user);
      navigate('/'); // Redirect to home after registration
    } catch (err) {
      console.error('Registration failed:', err.message);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/auth/logout');
      setUser(null); // Clear user state on logout
      navigate('/login'); // Redirect to login page after logout
    } catch (err) {
      console.error('Logout failed:', err.message);
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

// PropTypes validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
