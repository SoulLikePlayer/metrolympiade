import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const apiRequest = async (callback) => {
  try {
    return await callback();
  } catch (error) {
    console.error("Erreur API :", error.response?.data || error.message);
    throw error;
  }
};

export const createApiRequest = (method, endpoint, data = null, token = null) => {
  const config = {
    method,
    url: `${API_URL}${endpoint}`,
    data,
    headers: {}
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return apiRequest(() => axios(config).then(res => res.data));
};