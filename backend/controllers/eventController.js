import Event from "../models/Events.js";
import User from "../models/User.js"; // Ensure User model is imported
import Notification from "../models/Notification.js";
import cloudinary from "../utils/cloudinary.js";
import { sendEmail } from '../utils/notificationService.js';
import upload from "../utils/multer.js";
import fs from "fs";
import path from "path";

// Helper function to send notifications
const sendNotification = async (userId, message) => {
  try {
    // Fetch user email from the User model
    const user = await User.findById(userId).select('email');
    if (user) {
      await sendEmail(user.email, 'Event Notification', message);
    }
  } catch (err) {
    console.error('Error sending notification:', err.message);
  }
};

// Controller for creating a new event with an image
const createEvent = async (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Request File:", req.file);

  const { title, description, date, location, maxAttendees, eventType } = req.body;

  try {
    let imageUrl = null;

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      imageUrl = result.secure_url;

      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("Error deleting local file:", err);
        }
      });
    }

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      maxAttendees,
      eventType,
      creator: req.user.id,
      image: imageUrl,
    });

    const event = await newEvent.save();
    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Controller for getting all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("creator", "name");
    const eventCount = await Event.countDocuments();

    res.status(200).json({
      total_events: eventCount,
      events,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Controller for updating an event
const updateEvent = async (req, res) => {
  const { eventId } = req.params;
  const { title, description, date, location, maxAttendees, eventType } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.creator.toString() !== req.user.id) return res.status(403).json({ message: "Not authorized" });

    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;
    event.maxAttendees = maxAttendees || event.maxAttendees;
    event.eventType = eventType || event.eventType;

    const updatedEvent = await event.save();

    // Notify attendees of the update
    for (const attendee of event.attendees) {
      await sendNotification(attendee, `The event ${event.title} has been updated.`);
    }

    res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Controller for deleting an event
const deleteEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.creator.toString() !== req.user.id) return res.status(403).json({ message: "Not authorized" });

    await event.remove();
    res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Controller for getting the user's events
const getUserEvents = async (req, res) => {
  try {
    const events = await Event.find({ creator: req.user.id }).populate("creator", "name");
    res.status(200).json({
      count: events.length,
      events,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Controller for getting upcoming events
const getUpcomingEvents = async (req, res) => {
  try {
    const upcomingEvents = await Event.find({ date: { $gte: new Date() } })
      .populate("creator", "name")
      .sort({ date: 1 });

    res.status(200).json({
      count: upcomingEvents.length,
      events: upcomingEvents,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Controller for getting filtered events
const getFilteredEvents = async (req, res) => {
  const { date, location, eventType } = req.query;

  try {
    const query = {};
    if (date) {
      query.date = { $gte: new Date(date) };
    }
    if (location) {
      query.location = { $regex: new RegExp(location, "i") };
    }
    if (eventType) {
      query.eventType = eventType;
    }

    const events = await Event.find(query)
      .populate("creator", "name")
      .sort({ date: 1 });

    res.status(200).json({
      count: events.length,
      events,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

//get event
const getEvent= async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ event });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Controller for RSVPing to an event
const rsvpToEvent = async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.attendees.includes(userId)) {
      return res.status(400).json({ message: "You have already RSVPed to this event" });
    }

    if (event.attendees.length >= event.maxAttendees) {
      return res.status(400).json({ message: "Event is fully booked" });
    }

    event.attendees.push(userId);
    await event.save();

    await sendNotification(userId, `You have successfully RSVPed to the event: ${event.title}`);

    res.status(200).json({ message: "RSVP successful", event });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Controller for canceling RSVP
const cancelRsvp = async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (!event.attendees.includes(userId)) {
      return res.status(400).json({ message: "You have not RSVPed to this event" });
    }

    event.attendees = event.attendees.filter(id => id.toString() !== userId.toString());
    await event.save();

    res.status(200).json({ message: "RSVP canceled", event });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Controller for sending reminders for upcoming events
const sendEventReminders = async () => {
  const now = new Date();
  const upcomingEvents = await Event.find({
    date: { $gt: now, $lt: new Date(now.getTime() + 24 * 60 * 60 * 1000) },
  });

  for (const event of upcomingEvents) {
    for (const attendee of event.attendees) {
      await sendNotification(
        attendee,
        `Reminder: The event ${event.title} is happening soon on ${new Date(event.date).toLocaleString()}.`
      );
    }
  }
};

export {
  createEvent,
  getEvents,
  getFilteredEvents,
  updateEvent,
  deleteEvent,
  getEvent,
  getUserEvents,
  getUpcomingEvents,
  rsvpToEvent,
  cancelRsvp,
  sendEventReminders,
};
