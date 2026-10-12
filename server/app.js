import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getRsvps, addRsvp, getWishes, addWish, deleteWish } from './db.js';

dotenv.config();

const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Routes
// 1. Submit RSVP
app.post('/api/rsvp', async (req, res) => {
  const { name, email, attendance, guests, dietary } = req.body;

  if (!name || !name.trim() || !email || !email.trim() || !attendance) {
    return res.status(400).json({ error: 'Name, email, and attendance fields are required.' });
  }

  const guestCount = attendance === 'attending' ? parseInt(guests) || 1 : 0;

  try {
    const newRsvp = await addRsvp({
      name: name.trim(),
      email: email.trim(),
      attendance,
      guests: guestCount,
      dietary: dietary ? dietary.trim() : ''
    });
    res.status(201).json({
      message: 'RSVP submitted successfully!',
      rsvp: newRsvp
    });
  } catch (err) {
    console.error('Error inserting RSVP:', err.message);
    res.status(500).json({ error: 'Failed to save RSVP. Please try again.' });
  }
});

// 2. Fetch RSVPs (passcode protected)
app.get('/api/rsvps', async (req, res) => {
  const { passcode } = req.query;

  // Passcode check
  if (passcode !== '2026') {
    return res.status(401).json({ error: 'Unauthorized. Invalid passcode.' });
  }

  try {
    const rsvps = await getRsvps();
    // Sort by created_at descending (newest first)
    const sorted = [...rsvps].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    res.json(sorted);
  } catch (err) {
    console.error('Error fetching RSVPs:', err.message);
    res.status(500).json({ error: 'Failed to retrieve RSVPs.' });
  }
});

// 3. Post a Wish
app.post('/api/wishes', async (req, res) => {
  const { name, message } = req.body;

  if (!name || !name.trim() || !message || !message.trim()) {
    return res.status(400).json({ error: 'Name and message are required.' });
  }

  try {
    const newWish = await addWish({
      name: name.trim(),
      message: message.trim()
    });
    res.status(201).json({
      message: 'Wish posted successfully!',
      wish: newWish
    });
  } catch (err) {
    console.error('Error inserting wish:', err.message);
    res.status(500).json({ error: 'Failed to save wish.' });
  }
});

// 4. Fetch Wishes
app.get('/api/wishes', async (req, res) => {
  try {
    const wishes = await getWishes();
    // Sort by created_at descending (newest first)
    const sorted = [...wishes].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    res.json(sorted);
  } catch (err) {
    console.error('Error fetching wishes:', err.message);
    res.status(500).json({ error: 'Failed to retrieve wishes.' });
  }
});

// 5. Delete a Wish (passcode protected)
app.delete('/api/wishes/:id', async (req, res) => {
  const passcode = req.query.passcode || req.headers['x-passcode'] || req.body?.passcode;
  if (passcode !== '2026') {
    return res.status(401).json({ error: 'Unauthorized. Invalid passcode.' });
  }

  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'Wish ID is required.' });
  }

  try {
    await deleteWish(id);
    res.json({ message: 'Wish deleted successfully', id });
  } catch (err) {
    console.error('Error deleting wish:', err.message);
    res.status(500).json({ error: 'Failed to delete wish.' });
  }
});

// POST fallback for wish deletion
app.post('/api/wishes/delete', async (req, res) => {
  const { id, passcode } = req.body;
  if (passcode !== '2026') {
    return res.status(401).json({ error: 'Unauthorized. Invalid passcode.' });
  }

  if (!id) {
    return res.status(400).json({ error: 'Wish ID is required.' });
  }

  try {
    await deleteWish(id);
    res.json({ message: 'Wish deleted successfully', id });
  } catch (err) {
    console.error('Error deleting wish:', err.message);
    res.status(500).json({ error: 'Failed to delete wish.' });
  }
});

export default app;
