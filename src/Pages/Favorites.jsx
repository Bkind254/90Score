import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MatchCard from "../Components/MatchCard";
import { getFavoriteFixtures, getFavoriteTeams } from "../Utils/favorites";
import '../Styles/Favorites.css';

const Favorites = () => {
  const [activeTab, setActiveTab] = useState('fixtures');
  const navigate = useNavigate();
  const [favoriteFixtures, setFavoriteFixtures] = useState([]);
  const [favoriteTeams, setFavoriteTeams] = useState([]);

  useEffect(() => {
    try {
      const fixtures = getFavoriteFixtures() || [];
      const teams = getFavoriteTeams() || [];
      setFavoriteFixtures(fixtures);
      setFavoriteTeams(teams);
    } catch (err) {
      console.error("Error loading favorites:", err);
      setFavoriteFixtures([]);
      setFavoriteTeams([]);
    }
  }, [activeTab]);

  return (
    <div className="favorites-page">
      <h1>My Favorites</h1>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'fixtures' ? 'active' : ''}`}
          onClick={() => setActiveTab('fixtures')}
        >
          Favorite Fixtures
        </button>
        <button
          className={`tab ${activeTab === 'teams' ? 'active' : ''}`}
          onClick={() => setActiveTab('teams')}
        >
          Favorite Teams
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'fixtures' && (
          <div className="fixtures-tab">
            {favoriteFixtures.length > 0 ? (
              <div className="favorites-list">
                {favoriteFixtures.map((fixture, i) => {
                  // ✅ Safeguard in case of legacy or broken data
                  if (!fixture || !fixture.fixture || !fixture.fixture.id) return null;
                  return <MatchCard key={fixture.fixture.id || i} fixture={fixture} />;
                })}
              </div>
            ) : (
              <div className="empty-state">
                <p>No favorite fixtures yet</p>
                <p className="subtitle">
                  Add fixtures from match details to see them here
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'teams' && (
          <div className="teams-tab">
            {favoriteTeams.length > 0 ? (
              <div className="teams-grid">
                {favoriteTeams.map((team) => (
                  <div key={team.id} className="favorite-team-card">
                    <h3>{team.name}</h3>
                    <p className="team-league">{team.league}</p>
                    <div className="team-stats-mini">
                      <span>Position: {team.position ?? 'N/A'}</span>
                      <span>Points: {team.points ?? 'N/A'}</span>
                    </div>
                    <button
                      className="view-team-button"
                      onClick={() => navigate(`/team/${team.id}`)}
                    >
                      View Team
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No favorite teams yet</p>
                <p className="subtitle">
                  Add teams from team details to see them here
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
