import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RSVPS_FILE = path.join(__dirname, 'rsvps.json');
const WISHES_FILE = path.join(__dirname, 'wishes.json');

// Initialize files if they don't exist
function initFile(filePath, defaultValue) {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), 'utf8');
    }
  } catch (err) {
    console.error(`Error initializing file ${filePath}:`, err);
  }
}

initFile(RSVPS_FILE, []);
initFile(WISHES_FILE, []);

// Promise queue-based lock to prevent race conditions during concurrent write operations
let rsvpsQueue = Promise.resolve();
let wishesQueue = Promise.resolve();

export const getRsvps = async () => {
  try {
    const data = await fs.promises.readFile(RSVPS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading RSVPs:', err);
    return [];
  }
};

export const addRsvp = async (rsvp) => {
  return new Promise((resolve, reject) => {
    rsvpsQueue = rsvpsQueue.then(async () => {
      try {
        const rsvps = await getRsvps();
        const newRsvp = {
          id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
          ...rsvp,
          created_at: new Date().toISOString()
        };
        rsvps.push(newRsvp);
        await fs.promises.writeFile(RSVPS_FILE, JSON.stringify(rsvps, null, 2), 'utf8');
        resolve(newRsvp);
      } catch (err) {
        console.error('Error adding RSVP:', err);
        reject(err);
      }
    });
  });
};

export const getWishes = async () => {
  try {
    const data = await fs.promises.readFile(WISHES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading wishes:', err);
    return [];
  }
};

export const addWish = async (wish) => {
  return new Promise((resolve, reject) => {
    wishesQueue = wishesQueue.then(async () => {
      try {
        const wishes = await getWishes();
        const newWish = {
          id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
          ...wish,
          created_at: new Date().toISOString()
        };
        wishes.push(newWish);
        await fs.promises.writeFile(WISHES_FILE, JSON.stringify(wishes, null, 2), 'utf8');
        resolve(newWish);
      } catch (err) {
        console.error('Error adding wish:', err);
        reject(err);
      }
    });
  });
};
