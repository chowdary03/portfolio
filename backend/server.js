const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const { loadAll } = require('./lib/content');
const { registerRoutes } = require('./routes');

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

let content;
try {
  content = loadAll();
} catch (err) {
  console.error('Failed to load portfolio data:', err.message);
  process.exit(1);
}

registerRoutes(app, content);

app.listen(PORT, () => {
  console.log(`Portfolio API running at http://localhost:${PORT}`);
});
