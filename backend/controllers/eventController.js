// controllers/eventController.js
import Event from "../models/Events.js"

exports.createEvent = async (req, res) => {
  const { title, description, date, location } = req.body;

  try {
    const newEvent = new Event({
      title,
      description,
      date,
      location,
      creator: req.user.id,
    });

    const event = await newEvent.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('creator', 'name');
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
