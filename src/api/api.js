// src/api/api.js

/**
 * Helper: Fetch JSON data securely through Netlify function
 * Instead of calling the external API directly from frontend,
 * we call our Netlify serverless function which uses your secret keys safely.
 */
const fetchData = async (endpoint) => {
  try {
    // Calls the serverless function we’ll create at: /netlify/functions/football.js
    const response = await fetch(`/.netlify/functions/football?endpoint=${encodeURIComponent(endpoint)}`);

    if (!response.ok) {
      throw new Error(`Function Error: ${response.status}`);
    }

    const data = await response.json();
    return data.response || data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

/**
 * Fetch live matches
 * Example API endpoint: /fixtures?live=all
 */
export const fetchLiveMatches = async () => {
  try {
    return await fetchData('/fixtures?live=all');
  } catch (error) {
    console.error('Error fetching live matches:', error);
    return [];
  }
};

/**
 * Fetch leagues
 * Example API endpoint: /leagues
 */
export const fetchLeagues = async () => {
  try {
    return await fetchData('/leagues');
  } catch (error) {
    console.error('Error fetching leagues:', error);
    return [];
  }
};

/**
 * Fetch fixtures by league
 * Example API endpoint: /fixtures?league={leagueId}&season={year}
 */
export const fetchFixturesByLeague = async (leagueId, season = 2024) => {
  try {
    return await fetchData(`/fixtures?league=${leagueId}&season=${season}`);
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    return [];
  }
};

/**
 * Fetch today's fixtures
 * Example API endpoint: /fixtures?date={YYYY-MM-DD}
 */
export const fetchTodayMatches = async () => {
  try {
    const today = new Date().toISOString().split('T')[0];
    return await fetchData(`/fixtures?date=${today}`);
  } catch (error) {
    console.error('Error fetching today matches:', error);
    return [];
  }
};
