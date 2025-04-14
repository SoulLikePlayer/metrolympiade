import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getRanking = async () => {
  const response = await axios.get(`${API_URL}/ranking`);
  return response.data;
};