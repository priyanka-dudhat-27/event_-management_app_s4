/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/Event/EventCard'; // Adjust the import path as necessary

const HomePage = () => {
  const [events, setEvents] = useState([]); // Initialize events as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/events/getEvents`); // No token needed
        setEvents(response.data.events || []); // Set events, default to an empty array if undefined
      } catch (err) {
        console.error('Fetch error:', err); // Log any errors for debugging
        setError('Error fetching events');
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error} (Check console for details)</p>;

  return (
    <div>
      <h1>Upcoming Events</h1>
      {events.length === 0 ? (
        <p>No upcoming events</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
