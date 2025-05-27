import React from 'react';

function GameList({ games = [] }) {
  const comingSoonGames = games.filter(game => game.coming_soon);
  const freeGames = games.filter(game => game.free && !game.coming_soon);
  const availableGames = games.filter(game => !game.coming_soon && !game.free);

  const renderGameItem = (game) => (
    <li key={game.id || game._id} className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <strong>{game.title}</strong>
        <span className="badge bg-secondary ms-2">{game.platforms}</span>
      </div>
      {game.link && (
        <a href={game.link} className="btn btn-sm btn-outline-primary" target="_blank" rel="noopener noreferrer">
          Visit Website
        </a>
      )}
    </li>
  );

  return (
    <div className="row">
      {availableGames.length > 0 && (
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-header bg-danger text-white">
              <h3 className="h5 mb-0">Available Games</h3>
            </div>
            <ul className="list-group list-group-flush">
              {availableGames.map(renderGameItem)}
            </ul>
          </div>
        </div>
      )}

      {freeGames.length > 0 && (
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h3 className="h5 mb-0">Free Games</h3>
            </div>
            <ul className="list-group list-group-flush">
              {freeGames.map(renderGameItem)}
            </ul>
          </div>
        </div>
      )}

      {comingSoonGames.length > 0 && (
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-header bg-danger text-white">
              <h3 className="h5 mb-0">Coming Soon</h3>
            </div>
            <ul className="list-group list-group-flush">
              {comingSoonGames.map(renderGameItem)}
            </ul>
          </div>
        </div>
      )}
      
      {games.length === 0 && (
        <div className="col-12">
          <div className="alert alert-dark">No games found</div>
        </div>
      )}
    </div>
  );
}

export default GameList;