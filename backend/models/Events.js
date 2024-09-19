import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    maxAttendees: { type: Number, required: true },
    eventType: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Track attendees
    image: { type: String }, // Optional field for image URL
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", EventSchema);
export default Event;
