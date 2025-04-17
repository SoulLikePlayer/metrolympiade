import { createApiRequest } from "./apiRequest";

export const getMyTeam = (token) =>
  createApiRequest('get', '/teams/me', null, token);

export const createTeam = (teamData, token) =>
  createApiRequest('post', '/teams', teamData, token);

export const updateTeam = (teamData, token) =>
  createApiRequest('put', '/teams/me', teamData, token);

export const getAllTeams = (token) =>
  createApiRequest('get', '/teams', null, token);