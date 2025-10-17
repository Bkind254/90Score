import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MatchCard from "../Components/MatchCard";
import { addFavoriteTeam, removeFavoriteTeam, isTeamFavorite } from "../Utils/favorites";
import { toast } from 'sonner';
import axios from 'axios';
import '../styles/TeamDetails.css';

const TeamDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [team, setTeam] = useState(null);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [leagueTable, setLeagueTable] = useState([]);
  const [squad, setSquad] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the team is a favorite
    setIsFavorite(isTeamFavorite(id || ''));

    const fetchTeamDetails = async () => {
      try {
        // Fetch team details from API
        const teamResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/teams?id=${id}`,
          {
            headers: {
              'x-apisports-key': import.meta.env.VITE_API_KEY,
            },
          }
        );

        const teamData = teamResponse.data.response[0];
        setTeam({
          id: teamData.team.id,
          name: teamData.team.name,
          league: teamData.team.league.name,
          position: teamData.team.position,
          points: teamData.team.points,
          played: teamData.team.played,
          won: teamData.team.won,
          drawn: teamData.team.drawn,
          lost: teamData.team.lost,
        });

        // Fetch upcoming matches
        const matchesResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/fixtures?team=${id}&status=NS`,
          {
            headers: {
              'x-apisports-key': import.meta.env.VITE_API_KEY,
            },
          }
        );
        setUpcomingMatches(matchesResponse.data.response);

        // Fetch league table
        const leagueResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/standings?league=${teamData.team.league.id}`,
          {
            headers: {
              'x-apisports-key': import.meta.env.VITE_API_KEY,
            },
          }
        );
        setLeagueTable(leagueResponse.data.response[0].league.standings[0]);

        // Fetch squad data
        const squadResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/players/squad?team=${id}`,
          {
            headers: {
              'x-apisports-key': import.meta.env.VITE_API_KEY,
            },
          }
        );
        setSquad(squadResponse.data.response);
      } catch (error) {
        console.error('Error fetching team details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamDetails();
  }, [id]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteTeam(id || '');
      setIsFavorite(false);
      toast.success('Team removed from favorites');
    } else {
      addFavoriteTeam({
        id: id || '',
        name: team.name,
        league: team.league,
        position: team.position,
        points: team.points,
      });
      setIsFavorite(true);
      toast.success('Team added to favorites');
    }
  };

  if (loading) {
    return <div>Loading team details...</div>;
  }

  return (
    <div className="team-details-page">
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>

      <div className="team-header">
        <div className="team-info">
          <h1>{team.name}</h1>
          <p className="team-league">{team.league}</p>
        </div>
        <button 
          onClick={toggleFavorite} 
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
        >
          {isFavorite ? '★' : '☆'} {isFavorite ? 'Favorited' : 'Add to Favorites'}
        </button>
      </div>

      <div className="team-stats-overview">
        <div className="stat-card">
          <span className="stat-value">{team.position}</span>
          <span className="stat-label">Position</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{team.points}</span>
          <span className="stat-label">Points</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{team.won}</span>
          <span className="stat-label">Wins</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{team.drawn}</span>
          <span className="stat-label">Draws</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{team.lost}</span>
          <span className="stat-label">Losses</span>
        </div>
      </div>

      <section className="team-section">
        <h2>Upcoming Matches</h2>
        <div className="matches-list">
          {upcomingMatches.map(match => (
            <MatchCard key={match.fixture.id} {...match} />
          ))}
        </div>
      </section>

      <section className="team-section">
        <h2>League Table - {team.league}</h2>
        <div className="league-table">
          <table>
            <thead>
              <tr>
                <th>Pos</th>
                <th>Team</th>
                <th>P</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              {leagueTable.map(row => (
                <tr key={row.position} className={row.team === team.name ? 'highlighted' : ''}>
                  <td>{row.position}</td>
                  <td className="team-name-cell">{row.team}</td>
                  <td>{row.played}</td>
                  <td>{row.won}</td>
                  <td>{row.drawn}</td>
                  <td>{row.lost}</td>
                  <td className="points-cell">{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="team-section">
        <h2>Squad</h2>
        <div className="squad-grid">
          {squad.map(player => (
            <div key={player.player.id} className="player-card">
              <span className="player-number">{player.player.number}</span>
              <div className="player-info">
                <h4>{player.player.name}</h4>
                <p>{player.statistics[0].games.position}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TeamDetails;
