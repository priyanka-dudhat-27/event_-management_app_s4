/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import EventCard from '../components/Event/EventCard';
import EventForm from '../components/Event/EventForm';
import { Button } from '@mui/material';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/events');
        setEvents(response.data.events);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      }
    };

    fetchEvents();
  }, []);

  const handleCreateEvent = async (eventData) => {
    try {
      const response = await axios.post('/events', eventData);
      setEvents([...events, response.data.event]);
    } catch (err) {
      console.error('Failed to create event:', err);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Upcoming Events</h1>
        <Button variant="contained" color="primary" onClick={() => setIsFormOpen(true)}>
          Create Event
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
      <EventForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateEvent}
      />
    </div>
  );
};

export default Home;
