import fs from 'node:fs/promises';
import path from 'node:path';

const DB_PATH = path.join(process.cwd(), 'db.json');
let memoryDb = null;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const hasSupabase = Boolean(supabaseUrl && supabaseServiceRoleKey);

const defaultDb = () => ({
  doctors: [],
  appointments: [],
});

const readDb = async () => {
  try {
    const raw = await fs.readFile(DB_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    memoryDb = parsed;
    return parsed;
  } catch (error) {
    if (!memoryDb) {
      memoryDb = defaultDb();
    }
    return memoryDb;
  }
};

const writeDb = async (db) => {
  memoryDb = db;

  try {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
    return true;
  } catch (error) {
    console.warn('Database write failed; using in-memory fallback.', error.message);
    return false;
  }
};

const sendJson = (res, statusCode, payload) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.end(JSON.stringify(payload));
};

const supabaseRequest = async (resource, options = {}) => {
  const response = await fetch(`${supabaseUrl}/rest/v1/${resource}`, {
    ...options,
    headers: {
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const responseText = await response.text();
  const data = responseText ? JSON.parse(responseText) : null;

  if (!response.ok) {
    const error = new Error(data?.message || data?.hint || 'Supabase request failed.');
    error.statusCode = response.status;
    throw error;
  }

  return data;
};

const toAppointmentRow = (appointment) => ({
  id: appointment.id || generateId(),
  doctor_id: appointment.doctorId,
  doctor_name: appointment.doctorName,
  specialty: appointment.specialty,
  status: appointment.status || 'upcoming',
  patient_name: appointment.patientName,
  phone: appointment.phone,
  date: appointment.date,
  time: appointment.time,
  notes: appointment.notes || '',
});

const fromAppointmentRow = (appointment) => ({
  id: appointment.id,
  doctorId: appointment.doctor_id,
  doctorName: appointment.doctor_name,
  specialty: appointment.specialty,
  status: appointment.status,
  patientName: appointment.patient_name,
  phone: appointment.phone,
  date: appointment.date,
  time: appointment.time,
  notes: appointment.notes || '',
});

const handleSupabaseAppointments = async (req, res, id) => {
  try {
    if (req.method === 'GET') {
      const query = new URLSearchParams({ select: '*', order: 'date.asc' });
      if (id) query.set('id', `eq.${id}`);
      const data = await supabaseRequest(`appointments?${query}`);

      if (id && data.length === 0) {
        sendJson(res, 404, { message: 'Item not found' });
        return;
      }

      sendJson(res, 200, id ? fromAppointmentRow(data[0]) : data.map(fromAppointmentRow));
      return;
    }

    if (req.method === 'POST') {
      const body = await readBody(req);
      const data = await supabaseRequest('appointments', {
        method: 'POST',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify(toAppointmentRow(body)),
      });
      sendJson(res, 201, fromAppointmentRow(data[0]));
      return;
    }

    if (req.method === 'PATCH') {
      const body = await readBody(req);
      const data = await supabaseRequest(`appointments?id=eq.${id}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify(toAppointmentRow({ ...body, id })),
      });
      sendJson(res, 200, fromAppointmentRow(data[0]));
      return;
    }

    if (req.method === 'DELETE') {
      await supabaseRequest(`appointments?id=eq.${id}`, { method: 'DELETE' });
      sendJson(res, 200, { id });
      return;
    }

    sendJson(res, 405, { message: 'Method not allowed' });
  } catch (error) {
    sendJson(res, error.statusCode || 500, { message: error.message || 'Database request failed.' });
  }
};

const sortCollection = (items, sortKey) => {
  if (!sortKey) return items;
  const key = sortKey.replace(/^_sort\s*[:=]/, '');
  return [...items].sort((a, b) => {
    const left = a[key];
    const right = b[key];
    if (left == null || right == null) return 0;
    return String(left).localeCompare(String(right));
  });
};

const applyFilters = (items, url) => {
  const query = Object.fromEntries(url.searchParams.entries());
  let filtered = [...items];

  if (query['name:contains']) {
    const search = query['name:contains'].toLowerCase();
    filtered = filtered.filter((item) => String(item.name || '').toLowerCase().includes(search));
  }

  if (query.specialty) {
    filtered = filtered.filter((item) => item.specialty === query.specialty);
  }

  if (query._sort) {
    filtered = sortCollection(filtered, query._sort);
  }

  return filtered;
};

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.end();
    return;
  }

  const url = new URL(req.url, 'https://example.com');
  const pathParts = url.pathname.replace(/^\/api/, '').split('/').filter(Boolean);

  if (pathParts.length === 0) {
    sendJson(res, 200, { ok: true, message: 'Medical booking API is running' });
    return;
  }

  const [resource, id] = pathParts;

  if (resource === 'appointments' && hasSupabase) {
    await handleSupabaseAppointments(req, res, id);
    return;
  }

  const db = await readDb();
  const collection = db[resource];

  if (!collection) {
    sendJson(res, 404, { message: 'Resource not found' });
    return;
  }

  if (req.method === 'GET') {
    if (!id) {
      sendJson(res, 200, applyFilters(collection, url));
      return;
    }

    const item = collection.find((entry) => String(entry.id) === String(id));
    if (!item) {
      sendJson(res, 404, { message: 'Item not found' });
      return;
    }

    sendJson(res, 200, item);
    return;
  }

  if (req.method === 'POST') {
    const body = await readBody(req);
    if (!body || typeof body !== 'object') {
      sendJson(res, 400, { message: 'Invalid payload' });
      return;
    }

    const newItem = { ...body, id: body.id || generateId() };
    db[resource].push(newItem);
    await writeDb(db);
    sendJson(res, 201, newItem);
    return;
  }

  if (req.method === 'PATCH') {
    const itemIndex = collection.findIndex((entry) => String(entry.id) === String(id));
    if (itemIndex < 0) {
      sendJson(res, 404, { message: 'Item not found' });
      return;
    }

    const body = await readBody(req);
    const updatedItem = { ...collection[itemIndex], ...body };
    db[resource][itemIndex] = updatedItem;
    await writeDb(db);
    sendJson(res, 200, updatedItem);
    return;
  }

  if (req.method === 'DELETE') {
    const itemIndex = collection.findIndex((entry) => String(entry.id) === String(id));
    if (itemIndex < 0) {
      sendJson(res, 404, { message: 'Item not found' });
      return;
    }

    db[resource].splice(itemIndex, 1);
    await writeDb(db);
    sendJson(res, 200, { id });
    return;
  }

  sendJson(res, 405, { message: 'Method not allowed' });
}

const readBody = (req) =>
  new Promise((resolve, reject) => {
    let raw = '';

    req.on('data', (chunk) => {
      raw += chunk;
    });

    req.on('end', () => {
      if (!raw) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(error);
      }
    });

    req.on('error', reject);
  });

const generateId = () =>
  `${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
