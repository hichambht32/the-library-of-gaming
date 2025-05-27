const sqlite3 = require('../backend/node_modules/sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Path to the database
const dbPath = path.resolve(__dirname, './games.db');

// Check if database exists and remove it
if (fs.existsSync(dbPath)) {
  console.log('Removing existing database...');
  fs.unlinkSync(dbPath);
}

// Create a new database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to create database:', err.message);
    process.exit(1);
  }
  console.log('Connected to the SQLite database.');
});

// Read and execute the SQL initialization script
const initSql = fs.readFileSync(path.resolve(__dirname, './init.sql'), 'utf8');

// Execute the SQL commands
db.exec(initSql, (err) => {
  if (err) {
    console.error('Failed to initialize database:', err.message);
    process.exit(1);
  }
  console.log('Database initialized successfully with the updated schema!');
  
  // Close the database connection
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
  });
});