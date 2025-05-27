const express = require('express');
const router = express.Router();

const getAllGames = (req, res) => {
  const db = req.db;
  const searchQuery = req.query.search;
  
  if (searchQuery) {
    // If search parameter is provided, search for games with matching title
    const searchTerm = `%${searchQuery}%`;
    db.all('SELECT * FROM games WHERE title LIKE ?', [searchTerm], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  } else {
    // Otherwise return all games
    db.all('SELECT * FROM games', [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  }
};

const getGameById = (req, res) => {
  const db = req.db;
  const { id } = req.params;
  db.get('SELECT * FROM games WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Game not found' });
    res.json(row);
  });
};

const createGame = (req, res) => {
  const db = req.db;
  const { title, platforms, link, coming_soon, free } = req.body;
  const stmt = db.prepare('INSERT INTO games (title, platforms, link, coming_soon, free) VALUES (?, ?, ?, ?, ?)');
  stmt.run(title, platforms, link, coming_soon ? 1 : 0, free ? 1 : 0, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ 
      id: this.lastID, 
      title, 
      platforms,
      link,
      coming_soon,
      free
    });
  });
  stmt.finalize();
};

module.exports = { getAllGames, getGameById, createGame };