import axios from "axios";

const API_URL = "http://localhost:3000/auth";

const apiRequest = async (callback) => {
  try {
    return await callback();
  } catch (error) {
    console.error("Erreur API :", error.response?.data || error.message);
    throw error;
  }
};

export const register = (userData) =>
  apiRequest(() => axios.post(`${API_URL}/register`, userData).then((res) => res.data));

export const login = (credentials) =>
  apiRequest(() => axios.post(`${API_URL}/login`, credentials).then((res) => res.data));

export const logout = () => {
  localStorage.removeItem("user");
};
