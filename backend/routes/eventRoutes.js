import express from 'express';
import { createEvent, getEvents, getFilteredEvents, updateEvent, deleteEvent, getUserEvents, getUpcomingEvents, rsvpToEvent, cancelRsvp } from '../controllers/eventController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../utils/multer.js'; // Import multer configuration

const router = express.Router();

// Route to create a new event with an image
router.post('/createEvent', upload.single('image'), authMiddleware, createEvent);

// Route to get all events
router.get('/getEvents', getEvents);

// Route to get filtered events
router.get('/filteredEvents', getFilteredEvents);

// Route to get upcoming events
router.get('/upcomingEvents', getUpcomingEvents);

// Route to get events created by the logged-in user
router.get('/myEvents', authMiddleware, getUserEvents);

// Route to update an event
router.put('/updateEvent/:eventId', authMiddleware, updateEvent);

// Route to delete an event
router.delete('/deleteEvent/:eventId', authMiddleware, deleteEvent);

// Route to RSVP to an event
router.post('/rsvp/:eventId', authMiddleware, rsvpToEvent);

// Route to cancel RSVP
router.post('/cancelRsvp/:eventId', authMiddleware, cancelRsvp);

export default router;
