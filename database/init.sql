CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  platforms TEXT NOT NULL,
  link TEXT,
  coming_soon BOOLEAN DEFAULT 0,
  free BOOLEAN DEFAULT 0
);

INSERT INTO games (title, platforms, link, coming_soon, free) VALUES ('The Legend of Zelda', 'Switch', 'https://zelda.nintendo.com', 0, 0);
INSERT INTO games (title, platforms, link, coming_soon, free) VALUES ('God of War', 'PlayStation', 'https://godofwar.playstation.com', 0, 0);
INSERT INTO games (title, platforms, link, coming_soon, free) VALUES ('Halo', 'Xbox', 'https://halowaypoint.com', 0, 0);
INSERT INTO games (title, platforms, link, coming_soon, free) VALUES ('Blade', 'Xbox', '', 1, 0);
INSERT INTO games (title, platforms, link, coming_soon, free) VALUES ('Fortnite', 'PC, PlayStation, Xbox, Switch', 'https://www.epicgames.com/fortnite', 0, 1);
INSERT INTO games (title, platforms, link, coming_soon, free) VALUES ('Apex Legends', 'PC, PlayStation, Xbox', 'https://www.ea.com/games/apex-legends', 0, 1);