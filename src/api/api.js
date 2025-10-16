// src/api/api.js

// Configuration
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL, // https://v3.football.api-sports.io
  headers: {
    // Use direct API-Football key header (not RapidAPI)
    'x-apisports-key': import.meta.env.VITE_API_KEY,
    'Accept': 'application/json'
  }
};

// Helper: Fetch JSON data
const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, {
      headers: API_CONFIG.headers
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.response || [];
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
};

/**
 * Fetch live matches
 * Endpoint: /fixtures?live=all
 */
export const fetchLiveMatches = async () => {
  return fetchData('/fixtures?live=all');
};

/**
 * Fetch all leagues
 * Endpoint: /leagues
 */
export const fetchLeagues = async () => {
  return fetchData('/leagues');
};

/**
 * Fetch fixtures by league and season
 * Endpoint: /fixtures?league={leagueId}&season={year}
 */
export const fetchFixturesByLeague = async (leagueId, season = new Date().getFullYear()) => {
  return fetchData(`/fixtures?league=${leagueId}&season=${season}`);
};

/**
 * Fetch today's fixtures
 * Endpoint: /fixtures?date={YYYY-MM-DD}
 */
export const fetchTodayMatches = async () => {
  const today = new Date().toISOString().split('T')[0];
  return fetchData(`/fixtures?date=${today}`);
};
