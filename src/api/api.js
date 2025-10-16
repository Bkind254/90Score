// src/api/api.js

const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  apiKey: import.meta.env.VITE_API_KEY,
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_API_KEY,
    'x-rapidapi-host': import.meta.env.VITE_API_HOST,
  }
};

/**
 * Fetch live matches
 * Example API endpoint: /fixtures?live=all
 */
export const fetchLiveMatches = async () => {
  try {
    // Uncomment when ready to use actual API call
    // const response = await fetch(`${API_CONFIG.baseURL}/fixtures?live=all`, {
    //   headers: API_CONFIG.headers
    // });
    // const data = await response.json();
    // return data.response;

    // Dummy data for now
    return [
      {
        fixture: { id: 1, status: { long: 'Match Finished', elapsed: 90 } },
        teams: { home: { name: 'Manchester United' }, away: { name: 'Liverpool' } },
        goals: { home: 2, away: 1 },
        league: { name: 'Premier League' }
      }
    ];
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
    // Uncomment when ready to use actual API call
    // const response = await fetch(`${API_CONFIG.baseURL}/leagues`, {
    //   headers: API_CONFIG.headers
    // });
    // const data = await response.json();
    // return data.response;

    // Dummy data for now
    return [
      { league: { id: 39, name: 'Premier League' }, country: { name: 'England' } },
      { league: { id: 140, name: 'La Liga' }, country: { name: 'Spain' } }
    ];
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
    // Uncomment when ready to use actual API call
    // const response = await fetch(
    //   `${API_CONFIG.baseURL}/fixtures?league=${leagueId}&season=${season}`,
    //   { headers: API_CONFIG.headers }
    // );
    // const data = await response.json();
    // return data.response;

    // Dummy data for now
    return [];
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

    // Uncomment when ready to use actual API call
    // const response = await fetch(
    //   `${API_CONFIG.baseURL}/fixtures?date=${today}`,
    //   { headers: API_CONFIG.headers }
    // );
    // const data = await response.json();
    // return data.response;

    // Dummy data for now
    return [];
  } catch (error) {
    console.error('Error fetching today matches:', error);
    return [];
  }
};
