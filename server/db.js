import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RSVPS_FILE = path.join(__dirname, 'rsvps.json');
const WISHES_FILE = path.join(__dirname, 'wishes.json');
const DELETED_WISHES_FILE = path.join(__dirname, 'deleted_wishes.json');

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
initFile(DELETED_WISHES_FILE, []);

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
  let list = [];
  const sheetUrl = process.env.GOOGLE_SHEET_URL;
  if (sheetUrl) {
    try {
      const url = new URL(sheetUrl);
      url.searchParams.set('action', 'rsvps');
      const response = await fetch(url.toString(), { redirect: 'follow' });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) list = data;
      }
    } catch (err) {
      console.error('Error fetching RSVPs from Google Sheet, falling back to local:', err.message);
      list = await readLocalFile(RSVPS_FILE);
    }
  } else {
    list = await readLocalFile(RSVPS_FILE);
  }

  // Filter out dummy/test RSVPs
  const dummyEmails = ['test@wedding.com', 'test@example.com', 'john@example.com'];
  const dummyNames = ['connection test guest', 'test guest', 'john doe'];
  return list.filter(r => 
    r.name && r.name.trim() && 
    !dummyNames.includes(r.name.trim().toLowerCase()) && 
    (!r.email || !dummyEmails.includes(r.email.trim().toLowerCase()))
  );
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
  let list = [];
  const sheetUrl = process.env.GOOGLE_SHEET_URL;
  if (sheetUrl) {
    try {
      const url = new URL(sheetUrl);
      url.searchParams.set('action', 'wishes');
      const response = await fetch(url.toString(), { redirect: 'follow' });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) list = data;
      }
    } catch (err) {
      console.error('Error fetching wishes from Google Sheet, falling back to local:', err.message);
      list = await readLocalFile(WISHES_FILE);
    }
  } else {
    list = await readLocalFile(WISHES_FILE);
  }

  // Filter out deleted wishes (from local file + Google Sheet persistent markers)
  const deletedWishes = await readLocalFile(DELETED_WISHES_FILE);
  const deletedSet = new Set((deletedWishes || []).map(id => String(id)));

  // Extract all deleted IDs recorded in Google Sheet deletion markers
  for (const w of list) {
    if (w.name === '__DELETED_WISH__' && w.message) {
      deletedSet.add(String(w.message).trim());
    }
  }

  // Filter out deleted wishes and any exact mock template entries
  const exactDummyNames = ['jim & pam', 'jim and pam', 'test welcomer'];
  const filtered = list.filter(w => {
    if (!w.id) return false;
    if (w.name === '__DELETED_WISH__') return false;
    if (deletedSet.has(String(w.id))) return false;
    if (!w.name || !w.name.trim()) return false;
    const n = w.name.trim().toLowerCase();
    const m = (w.message || '').trim().toLowerCase();
    if (exactDummyNames.includes(n)) return false;
    if (m === 'so happy for you both! enjoy every moment of this magical journey.') return false;
    return true;
  });

  // Deduplicate identical submissions (same person + same message)
  const normalize = (str) => (str || '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim().toLowerCase();
  const seen = new Set();
  const deduplicated = [];
  for (const w of filtered) {
    const key = `${normalize(w.name)}:::${normalize(w.message)}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduplicated.push(w);
    }
  }

  return deduplicated;
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

// 5. Delete Wish
export const deleteWish = async (id) => {
  const strId = String(id);
  const sheetUrl = process.env.GOOGLE_SHEET_URL;

  // Collect IDs to delete (target ID + any identical duplicate copies)
  const idsToDelete = new Set([strId]);

  if (sheetUrl) {
    try {
      const url = new URL(sheetUrl);
      url.searchParams.set('action', 'wishes');
      const response = await fetch(url.toString(), { redirect: 'follow' });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          const target = data.find(w => String(w.id) === strId);
          if (target && target.name && target.message) {
            const normalize = (str) => (str || '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim().toLowerCase();
            const targetKey = `${normalize(target.name)}:::${normalize(target.message)}`;
            for (const item of data) {
              if (item.id && `${normalize(item.name)}:::${normalize(item.message)}` === targetKey) {
                idsToDelete.add(String(item.id));
              }
            }
          }
        }
      }
    } catch (err) {
      console.error('Error fetching wishes to find duplicates for deletion:', err.message);
    }

    // Post persistent deletion markers to Google Sheet for all matching IDs
    for (const deleteId of idsToDelete) {
      try {
        await fetch(sheetUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            type: 'wish',
            id: `del_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            name: '__DELETED_WISH__',
            message: deleteId,
            created_at: new Date().toISOString()
          }),
          redirect: 'follow'
        });
      } catch (err) {
        console.error('Error posting wish deletion marker to Google Sheet:', err.message);
      }
    }
  }

  // Persist deletion locally and remove from active wishes
  return new Promise((resolve) => {
    wishesQueue = wishesQueue.then(async () => {
      try {
        const deleted = await readLocalFile(DELETED_WISHES_FILE);
        for (const deleteId of idsToDelete) {
          if (!deleted.includes(deleteId)) {
            deleted.push(deleteId);
          }
        }
        await writeLocalFile(DELETED_WISHES_FILE, deleted);

        const wishes = await readLocalFile(WISHES_FILE);
        const filtered = wishes.filter(w => !idsToDelete.has(String(w.id)));
        await writeLocalFile(WISHES_FILE, filtered);
      } catch (err) {
        console.error('Local wish deletion error:', err.message);
      }
      resolve({ success: true, id: strId, deletedIds: Array.from(idsToDelete) });
    });
  });
};
