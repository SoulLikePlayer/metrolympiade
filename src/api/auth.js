import { createApiRequest } from "./apiRequest";

export const register = (userData) =>
  createApiRequest('post', '/auth/register', userData);

export const login = (credentials) =>
  createApiRequest('post', '/auth/login', credentials);

export const logout = () => {
  localStorage.removeItem("user");
};