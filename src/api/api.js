// src/api/api.js

// Helper: Fetch JSON data securely through Netlify function
const fetchData = async (endpoint) => {
  try {
    // Call your Netlify function instead of the Football API
    const response = await fetch(`/.netlify/functions/football?endpoint=${encodeURIComponent(endpoint)}`);

    if (!response.ok) {
      throw new Error(`Function Error: ${response.status}`);
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
 */
export const fetchLeagues = async () => {
  return fetchData('/leagues');
};

/**
 * Fetch fixtures by league and season
 */
export const fetchFixturesByLeague = async (leagueId, season = new Date().getFullYear()) => {
  return fetchData(`/fixtures?league=${leagueId}&season=${season}`);
};

/**
 * Fetch today's fixtures
 */
export const fetchTodayMatches = async () => {
  const today = new Date().toISOString().split('T')[0];
  return fetchData(`/fixtures?date=${today}`);
};
