import { createApiRequest } from "./apiRequest";

export const getActivities = () =>
  createApiRequest('get', '/activities');

export const createActivites = (activitesData) =>
  createApiRequest('post', '/activities', activitesData)