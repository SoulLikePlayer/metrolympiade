import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const createMatch = async (matchData, token) => {
  const response = await axios.post(`${API_URL}/matches`, matchData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getMyMatches = async (token) => {
  const response = await axios.get(`${API_URL}/matches/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const deleteMatch = async (matchId, token) => {
  const response = await axios.delete(`${API_URL}/matches/${matchId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};