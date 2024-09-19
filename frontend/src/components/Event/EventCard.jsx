/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type checking
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, CardMedia } from '@mui/material';
import { motion } from 'framer-motion';

const EventCard = ({ event }) => {
  if (!event) {
    return null; // Handle case where event might be null or undefined
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={event.image || "default-image-url.jpg"}
          alt={event.title || "Event Image"} // Add a fallback alt text
        />
        <CardContent>
          <Typography variant="h5" component="div" className="text-gray-900 font-semibold">
            {event.title || "Untitled Event"} 
          </Typography>
          <Typography variant="body2" color="text.secondary" className="my-2">
            {event.description ? (event.description.length > 100 ? event.description.slice(0, 100) + '...' : event.description) : "No description available"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Date: {event.date ? new Date(event.date).toLocaleDateString() : "Date not available"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Location: {event.location || "Location not specified"}
          </Typography>
          <Link to={`/events/${event._id}`} className="block mt-4">
            <Button variant="contained" color="primary" fullWidth>
              View Details
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Adding PropTypes for type checking
EventCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    location: PropTypes.string,
    image: PropTypes.string,
  }).isRequired, // Ensure event is an object with the specified shape
};

export default EventCard;
