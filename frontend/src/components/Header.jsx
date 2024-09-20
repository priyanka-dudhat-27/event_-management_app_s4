/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EventForm from '../components/Event/EventForm';

const Header = () => {
  const { user, logout } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreateEvent = async (eventData) => {
    console.log('Event created:', eventData);
    setIsFormOpen(false);
  };

  
  const handleLogout = async () => {
    try {
      await logout();
      console.log('User logged out');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
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
                <button onClick={handleLogout} className="hover:text-gray-400">
                  Logout
                </button>
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Create Event
                </button>
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

      <EventForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateEvent}
      />
    </>
  );
};

export default Header;
