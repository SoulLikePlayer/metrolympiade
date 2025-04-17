import { createApiRequest } from "./apiRequest";

export const getRanking = () =>
  createApiRequest('get', '/ranking');