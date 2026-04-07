// Favorites management utility using localStorage

const TEAMS_KEY = "favorite_teams";
const FIXTURES_KEY = "favorite_fixtures";

/* =======================
   TEAMS
======================= */

export const getFavoriteTeams = () => {
  const stored = localStorage.getItem(TEAMS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addFavoriteTeam = (team) => {
  const teams = getFavoriteTeams();
  if (!teams.some(t => t.id === team.id)) {
    teams.push(team);
    localStorage.setItem(TEAMS_KEY, JSON.stringify(teams));
  }
};

export const removeFavoriteTeam = (teamId) => {
  const teams = getFavoriteTeams().filter(t => t.id !== teamId);
  localStorage.setItem(TEAMS_KEY, JSON.stringify(teams));
};

export const isTeamFavorite = (teamId) => {
  return getFavoriteTeams().some(t => t.id === teamId);
};

/* =======================
   FIXTURES
======================= */

export const getFavoriteFixtures = () => {
  const stored = localStorage.getItem(FIXTURES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addFavoriteFixture = (fixture) => {
  const fixtures = getFavoriteFixtures();
  const fixtureId = fixture?.fixture?.id;

  if (!fixtureId) return;

  if (!fixtures.some(f => f.fixture?.id === fixtureId)) {
    fixtures.push(fixture);
    localStorage.setItem(FIXTURES_KEY, JSON.stringify(fixtures));
  }
};

export const removeFavoriteFixture = (fixtureId) => {
  const fixtures = getFavoriteFixtures().filter(
    f => f.fixture?.id !== fixtureId
  );
  localStorage.setItem(FIXTURES_KEY, JSON.stringify(fixtures));
};

export const isFixtureFavorite = (fixtureId) => {
  return getFavoriteFixtures().some(
    f => f.fixture?.id === fixtureId
  );
};
