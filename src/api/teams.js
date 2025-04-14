import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getMyTeam = async (token) => {
  const response = await axios.get(`${API_URL}/teams/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const createTeam = async (teamData, token) => {
  const response = await axios.post(`${API_URL}/teams`, teamData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const updateTeam = async (teamData, token) => {
  const response = await axios.put(`${API_URL}/teams/me`, teamData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};