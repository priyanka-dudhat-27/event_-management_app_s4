/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axiosConfig';
import { Typography, Button, Grid, Paper, Container } from '@mui/material';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await axios.get(`/events/${id}`);
        setEvent(res.data.event);
      } catch (err) {
        console.error('Failed to fetch event details:', err);
      }
    };
    fetchEventDetails();
  }, [id]);

  if (!event) return <Typography variant="h4" align="center">Loading...</Typography>;

  return (
    <Container maxWidth="lg" className="py-10">
      <Paper elevation={3} className="p-6">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img
              src={event.image || 'default-image-url.jpg'}
              alt={event.title}
              className="w-full h-96 object-cover rounded-md"
            />
          </Grid>
          <Grid item xs={12} md={6} className="flex flex-col justify-between">
            <div>
              <Typography variant="h4" className="font-bold mb-4">
                {event.title}
              </Typography>
              <Typography variant="body1" className="mb-4">
                {event.description}
              </Typography>
              <Typography variant="body2" color="textSecondary" className="mb-2">
                Date: {new Date(event.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="textSecondary" className="mb-2">
                Time: {event.time}
              </Typography>
              <Typography variant="body2" color="textSecondary" className="mb-2">
                Location: {event.location}
              </Typography>
            </div>
            <Button
              variant="contained"
              color="primary"
              className="mt-4"
              fullWidth
              onClick={() => alert('Ticket booked successfully!')}
            >
              Book Tickets
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default EventDetails;
