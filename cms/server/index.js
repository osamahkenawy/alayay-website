const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.CMS_PORT || 3014;
const JWT_SECRET = process.env.JWT_SECRET || 'alayay-cms-secret-2026';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || bcrypt.hashSync('alayay2026', 10);

const CONTENT_DIR = path.join(__dirname, '../content');
const UPLOADS_DIR = path.join(__dirname, '../public/uploads');
const AUTH_FILE = path.join(CONTENT_DIR, '_auth.json');

[CONTENT_DIR, UPLOADS_DIR].forEach(d => fs.mkdirSync(d, { recursive: true }));

// Password hash can be changed at runtime and persists to disk.
function getPasswordHash() {
  if (fs.existsSync(AUTH_FILE)) {
    try { return JSON.parse(fs.readFileSync(AUTH_FILE, 'utf8')).hash; } catch { /* fall through */ }
  }
  return ADMIN_PASSWORD_HASH;
}

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(UPLOADS_DIR));
app.use(express.static(path.join(__dirname, '../dist')));

// ── Multer ──────────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, UPLOADS_DIR),
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// ── Auth middleware ──────────────────────────────────────────────────────────
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// ── Content helpers ──────────────────────────────────────────────────────────
function readContent(name) {
  const file = path.join(CONTENT_DIR, `${name}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeContent(name, data) {
  fs.writeFileSync(path.join(CONTENT_DIR, `${name}.json`), JSON.stringify(data, null, 2));
}

// ── Leads (contact form submissions) ─────────────────────────────────────────
const LEADS_FILE = path.join(CONTENT_DIR, 'leads.json');

function readLeads() {
  if (!fs.existsSync(LEADS_FILE)) return [];
  try { return JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8')); } catch { return []; }
}

function writeLeads(leads) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
}

// ── Routes ───────────────────────────────────────────────────────────────────

// Login
app.post('/api/login', async (req, res) => {
  const { password } = req.body;
  if (!password || !bcrypt.compareSync(password, getPasswordHash())) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

// Change password
app.post('/api/account/password', auth, (req, res) => {
  const { current, next } = req.body || {};
  if (!bcrypt.compareSync(current || '', getPasswordHash())) {
    return res.status(400).json({ error: 'Current password is incorrect' });
  }
  if (!next || next.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters' });
  }
  fs.writeFileSync(AUTH_FILE, JSON.stringify({ hash: bcrypt.hashSync(next, 10) }, null, 2));
  res.json({ ok: true });
});

// Image upload
app.post('/api/upload', auth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

// ── Media library ────────────────────────────────────────────────────────────
app.get('/api/media', auth, (req, res) => {
  const files = fs.existsSync(UPLOADS_DIR) ? fs.readdirSync(UPLOADS_DIR).filter(f => !f.startsWith('.')) : [];
  const items = files.map(f => {
    const st = fs.statSync(path.join(UPLOADS_DIR, f));
    return { url: `/uploads/${f}`, name: f, size: st.size, mtime: st.mtimeMs };
  }).sort((a, b) => b.mtime - a.mtime);
  res.json(items);
});

app.delete('/api/media/:file', auth, (req, res) => {
  const f = path.basename(req.params.file);
  const p = path.join(UPLOADS_DIR, f);
  if (fs.existsSync(p)) fs.unlinkSync(p);
  res.json({ ok: true });
});

// Public: contact form on the website posts here, no auth (visitors aren't logged in).
app.post('/api/leads', (req, res) => {
  const { name, phone, service, message, locale } = req.body || {};
  if (!name || !phone) return res.status(400).json({ error: 'Name and phone are required' });
  // Honeypot: a hidden field real visitors never fill in; bots that autofill every field do.
  if (req.body.website) return res.json({ ok: true });

  const lead = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: String(name).slice(0, 200),
    phone: String(phone).slice(0, 50),
    service: service ? String(service).slice(0, 200) : '',
    message: message ? String(message).slice(0, 2000) : '',
    locale: locale === 'ar' ? 'ar' : 'en',
    read: false,
    createdAt: Date.now(),
  };
  const leads = readLeads();
  leads.unshift(lead);
  writeLeads(leads.slice(0, 1000)); // keep the file bounded
  res.json({ ok: true });
});

// Admin: list / update / delete leads
app.get('/api/leads', auth, (req, res) => {
  res.json(readLeads());
});

app.patch('/api/leads/:id', auth, (req, res) => {
  const leads = readLeads();
  const lead = leads.find(l => l.id === req.params.id);
  if (!lead) return res.status(404).json({ error: 'Not found' });
  if (typeof req.body.read === 'boolean') lead.read = req.body.read;
  writeLeads(leads);
  res.json({ ok: true });
});

app.delete('/api/leads/:id', auth, (req, res) => {
  writeLeads(readLeads().filter(l => l.id !== req.params.id));
  res.json({ ok: true });
});

// ── Dashboard meta (counts + last-updated) ─────────────────────────────────────
app.get('/api/meta', auth, (req, res) => {
  const content = {};
  ['settings', 'hero', 'services', 'projects', 'testimonials'].forEach(t => {
    const file = path.join(CONTENT_DIR, `${t}.json`);
    content[t] = fs.existsSync(file)
      ? { exists: true, updatedAt: fs.statSync(file).mtimeMs }
      : { exists: false, updatedAt: null };
  });
  const mediaCount = fs.existsSync(UPLOADS_DIR)
    ? fs.readdirSync(UPLOADS_DIR).filter(f => !f.startsWith('.')).length : 0;
  const leads = readLeads();
  const leadCount = leads.length;
  const unreadLeadCount = leads.filter(l => !l.read).length;
  res.json({ content, mediaCount, leadCount, unreadLeadCount });
});

// Generic CRUD for each content type
const CONTENT_TYPES = ['settings', 'hero', 'services', 'projects', 'testimonials'];

CONTENT_TYPES.forEach(type => {
  app.get(`/api/content/${type}`, auth, (req, res) => {
    res.json(readContent(type) || {});
  });
  app.put(`/api/content/${type}`, auth, (req, res) => {
    writeContent(type, req.body);
    res.json({ ok: true });
  });
});

// Public content endpoint (used by Next.js)
app.get('/api/public/:type', (req, res) => {
  const { type } = req.params;
  if (!CONTENT_TYPES.includes(type)) return res.status(404).json({ error: 'Not found' });
  res.json(readContent(type) || {});
});

// SPA fallback
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => console.log(`Alayay CMS running on http://localhost:${PORT}`));
