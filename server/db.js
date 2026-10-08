import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RSVPS_FILE = path.join(__dirname, 'rsvps.json');
const WISHES_FILE = path.join(__dirname, 'wishes.json');

// Initialize local files if they don't exist (gracefully ignore in read-only environments)
function initFile(filePath, defaultValue) {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), 'utf8');
    }
  } catch {
    // Read-only filesystem (e.g. Vercel serverless environment)
  }
}

initFile(RSVPS_FILE, []);
initFile(WISHES_FILE, []);

// Queue to serialize local file writes
let rsvpsQueue = Promise.resolve();
let wishesQueue = Promise.resolve();

const readLocalFile = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeLocalFile = async (filePath, data) => {
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch {
    // Read-only in serverless
  }
};

// 1. Fetch RSVPs
export const getRsvps = async () => {
  const sheetUrl = process.env.GOOGLE_SHEET_URL;
  if (sheetUrl) {
    try {
      const url = new URL(sheetUrl);
      url.searchParams.set('action', 'rsvps');
      const response = await fetch(url.toString(), { redirect: 'follow' });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) return data;
      }
    } catch (err) {
      console.error('Error fetching RSVPs from Google Sheet, falling back to local:', err.message);
    }
  }
  return readLocalFile(RSVPS_FILE);
};

// 2. Add RSVP
export const addRsvp = async (rsvp) => {
  const newRsvp = {
    id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
    ...rsvp,
    created_at: new Date().toISOString()
  };

  const sheetUrl = process.env.GOOGLE_SHEET_URL;
  if (sheetUrl) {
    try {
      const response = await fetch(sheetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ type: 'rsvp', ...newRsvp }),
        redirect: 'follow'
      });
      if (response.ok) {
        try {
          const resData = await response.json();
          if (resData.rsvp) return resData.rsvp;
        } catch {
          // Response received ok
        }
      }
    } catch (err) {
      console.error('Error posting RSVP to Google Sheet:', err.message);
    }
  }

  // Also write to local storage
  return new Promise((resolve) => {
    rsvpsQueue = rsvpsQueue.then(async () => {
      try {
        const rsvps = await readLocalFile(RSVPS_FILE);
        rsvps.push(newRsvp);
        await writeLocalFile(RSVPS_FILE, rsvps);
      } catch (err) {
        console.error('Local RSVP write error:', err.message);
      }
      resolve(newRsvp);
    });
  });
};

// 3. Fetch Wishes
export const getWishes = async () => {
  const sheetUrl = process.env.GOOGLE_SHEET_URL;
  if (sheetUrl) {
    try {
      const url = new URL(sheetUrl);
      url.searchParams.set('action', 'wishes');
      const response = await fetch(url.toString(), { redirect: 'follow' });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) return data;
      }
    } catch (err) {
      console.error('Error fetching wishes from Google Sheet, falling back to local:', err.message);
    }
  }
  return readLocalFile(WISHES_FILE);
};

// 4. Add Wish
export const addWish = async (wish) => {
  const newWish = {
    id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
    ...wish,
    created_at: new Date().toISOString()
  };

  const sheetUrl = process.env.GOOGLE_SHEET_URL;
  if (sheetUrl) {
    try {
      const response = await fetch(sheetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ type: 'wish', ...newWish }),
        redirect: 'follow'
      });
      if (response.ok) {
        try {
          const resData = await response.json();
          if (resData.wish) return resData.wish;
        } catch {
          // Response received ok
        }
      }
    } catch (err) {
      console.error('Error posting wish to Google Sheet:', err.message);
    }
  }

  // Also write to local storage
  return new Promise((resolve) => {
    wishesQueue = wishesQueue.then(async () => {
      try {
        const wishes = await readLocalFile(WISHES_FILE);
        wishes.push(newWish);
        await writeLocalFile(WISHES_FILE, wishes);
      } catch (err) {
        console.error('Local wish write error:', err.message);
      }
      resolve(newWish);
    });
  });
};
