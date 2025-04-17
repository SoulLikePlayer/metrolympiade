import { createApiRequest } from "./apiRequest";

export const getActivities = () =>
  createApiRequest('get', '/activities');