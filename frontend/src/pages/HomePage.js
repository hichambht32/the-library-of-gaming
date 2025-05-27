import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GameList from '../components/GameList';
import GameForm from '../components/GameForm';
import { fetchGames, addGame } from '../services/api';

function HomePage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        const data = await fetchGames();
        setGames(data);
        setError(null);
      } catch (err) {
        setError('Failed to load games');
        console.error('Error loading games:', err);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  const handleAddGame = async (game) => {
    try {
      const newGame = await addGame(game);
      setGames(prev => [...prev, newGame]);
    } catch (err) {
      setError('Failed to add game');
      console.error('Error adding game:', err);
    }
  };

  if (loading) return <div className="container py-4"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="container py-4"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-4 mb-0">Game Library</h1>
        <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
      </div>
      <div className="mb-4">
        <Link to="/search" className="btn btn-primary">Search Games by Console</Link>
      </div>
      <div className="card mb-4">
        <div className="card-body">
          <GameForm onAdd={handleAddGame} />
        </div>
      </div>
      <h2 className="h3 mb-3">Games</h2>
      <GameList games={games} />
    </div>
  );
}

export default HomePage;