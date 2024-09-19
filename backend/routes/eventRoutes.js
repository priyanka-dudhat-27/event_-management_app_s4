// routes/eventRoutes.js
import express from "express";
import { createEvent, getEvents } from '../controllers/eventController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, createEvent);
router.get('/', authMiddleware, getEvents);

module.exports = router;
