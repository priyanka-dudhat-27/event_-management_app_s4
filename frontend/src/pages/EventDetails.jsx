/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const { id } = useParams(); // Get the event ID from the URL parameters
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/events/getEvent/${id}`); // No token needed
        setEvent(response.data.event);
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Error fetching event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>{error} (Check console for details)</p>;

  if (!event) return <p>No event found</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <img src={event.image || "default-image-url.jpg"} alt={event.title} className="mt-4" />
      <p className="mt-2">{event.description}</p>
      <p className="mt-2"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p className="mt-2"><strong>Location:</strong> {event.location}</p>
      <p className="mt-2"><strong>Max Attendees:</strong> {event.maxAttendees}</p>
    </div>
  );
};

export default EventDetails;
