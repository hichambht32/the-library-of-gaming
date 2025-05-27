import axios from 'axios';

// Create an axios instance with a relative URL instead of absolute
const api = axios.create({
  // Use relative URL to work with the proxy
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchGames = async () => {
  try {
    const response = await api.get('/games');
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};

export const addGame = async (game) => {
  try {
    const response = await api.post('/games', game);
    return response.data;
  } catch (error) {
    console.error('Error adding game:', error);
    throw error;
  }
};

export const searchGames = async (query) => {
  try {
    const response = await api.get(`/games?search=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching games:', error);
    throw error;
  }
};

export default api;
