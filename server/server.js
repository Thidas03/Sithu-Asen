import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { getRsvps, addRsvp, getWishes, addWish } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Resolve paths for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '../dist');

// Diagnostic logging
console.log('[DEBUG] __dirname:', __dirname);
console.log('[DEBUG] distPath:', distPath);
console.log('[DEBUG] distPath exists:', fs.existsSync(distPath));
if (fs.existsSync(distPath)) {
  console.log('[DEBUG] dist folder contents:', fs.readdirSync(distPath));
} else {
  console.log('[DEBUG] Parent folder contents:', fs.readdirSync(path.join(__dirname, '..')));
}

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Serve static frontend files from Vite build folder
app.use(express.static(distPath));

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

  // Simple passcode check for security
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

// Wildcard route to serve index.html for any frontend URL routes
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
