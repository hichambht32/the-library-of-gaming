import React, { useState } from 'react';

function GameForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [platforms, setPlatforms] = useState('');
  const [link, setLink] = useState('');
  const [comingSoon, setComingSoon] = useState(false);
  const [free, setFree] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !platforms) return;
    
    const platformsArray = platforms.split(',').map(platform => platform.trim()).join(",");
    
    try {
      await onAdd({ 
        title, 
        platforms: platformsArray, 
        link, 
        coming_soon: comingSoon,
        free: free
      });
      setTitle('');
      setPlatforms('');
      setLink('');
      setComingSoon(false);
      setFree(false);
    } catch (error) {
      console.error('Failed to add game:', error);
      // Optional: Add user-friendly error handling here
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          placeholder="Game title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          placeholder="Platforms (comma separated)"
          value={platforms}
          onChange={e => setPlatforms(e.target.value)}
        />
      </div>
      <div className="col-12">
        <input
          type="text"
          className="form-control"
          placeholder="Link to game website"
          value={link}
          onChange={e => setLink(e.target.value)}
        />
      </div>
      <div className="col-12">
        <div className="form-check mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="comingSoon"
            checked={comingSoon}
            onChange={e => setComingSoon(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="comingSoon">Coming Soon</label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="free"
            checked={free}
            onChange={e => setFree(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="free">Free Game</label>
        </div>
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-danger">Add Game</button>
      </div>
    </form>
  );
}

export default GameForm;