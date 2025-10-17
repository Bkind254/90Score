import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MatchCard from "../Components/MatchCard";
import { getFavoriteFixtures, getFavoriteTeams } from "../Utils/favorites";
import '../Styles/Favorites.css';

const Favorites = () => {
  const [activeTab, setActiveTab] = useState('fixtures');
  const navigate = useNavigate();
  const [favoriteFixtures, setFavoriteFixtures] = useState(getFavoriteFixtures());
  const [favoriteTeams, setFavoriteTeams] = useState(getFavoriteTeams());

  useEffect(() => {
    // Refresh favorites when tab changes
    setFavoriteFixtures(getFavoriteFixtures());
    setFavoriteTeams(getFavoriteTeams());
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
                {favoriteFixtures.map(match => (
                  <MatchCard key={match.id} {...match} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No favorite fixtures yet</p>
                <p className="subtitle">Add fixtures from match details to see them here</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'teams' && (
          <div className="teams-tab">
            {favoriteTeams.length > 0 ? (
              <div className="teams-grid">
                {favoriteTeams.map(team => (
                  <div key={team.id} className="favorite-team-card">
                    <h3>{team.name}</h3>
                    <p className="team-league">{team.league}</p>
                    <div className="team-stats-mini">
                      <span>Position: {team.position}</span>
                      <span>Points: {team.points}</span>
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
                <p className="subtitle">Add teams from team details to see them here</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
