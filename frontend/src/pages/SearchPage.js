// filepath: /home/salim/Desktop/ayman-project/frontend/src/pages/SearchPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchGames } from '../services/api';
import GameList from '../components/GameList';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const results = await searchGames(searchTerm);
      setSearchResults(results);
    } catch (err) {
      setError('Failed to search for games');
      console.error('Error searching games:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="display-4 mb-3">Search Games</h1>
      <Link to="/" className="btn btn-outline-primary mb-4">Back to Home</Link>
      
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a game..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">Search</button>
        </div>
      </form>

      {loading && <div className="alert alert-info">Searching...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      
      {!loading && !error && (
        <div>
          <h2 className="h3 mb-3">Search Results</h2>
          {searchResults.length > 0 ? (
            <GameList games={searchResults} />
          ) : (
            <div className="alert alert-warning">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchPage;