const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
app.use(express.json());

// Initialize SQLite database
const dbPath = path.resolve(__dirname, '../../database/games.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Failed to connect to database:', err);
  else console.log('Connected to SQLite database');
});

// Make db available in controllers
app.use((req, res, next) => { req.db = db; next(); });

// Routes
const gameRoutes = require('./routes/gameRoutes');
app.use('/api/games', gameRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));