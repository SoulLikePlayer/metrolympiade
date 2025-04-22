import { createApiRequest } from "./apiRequest";

export const createMatch = (matchData, token) =>
  createApiRequest('post', '/matches', matchData, token);

export const getMyMatches = (token) =>
  createApiRequest('get', '/matches/me', null, token);

export const deleteMatch = (matchId, token) =>
  createApiRequest('delete', `/matches/${matchId}`, null, token);

export const getMatchesByTeam = (teamId, token) =>
  createApiRequest('get', `/matches?teamId=${teamId}`, null, token);
