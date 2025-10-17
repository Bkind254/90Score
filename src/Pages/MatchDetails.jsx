import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addFavoriteFixture, removeFavoriteFixture, isFixtureFavorite } from "../Utils/favorites";
import { toast } from 'sonner';
import axios from 'axios';
import "../Styles/MatchDetails.css";

const MatchDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [match, setMatch] = useState(null);
  const [events, setEvents] = useState([]);
  const [lineups, setLineups] = useState({ home: [], away: [] });
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the match is a favorite
    setIsFavorite(isFixtureFavorite(Number(id)));

    // Fetch match data from API-FOOTBALL
    const fetchMatchDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/fixtures?id=${id}`,
          {
            headers: {
              'x-apisports-key': import.meta.env.VITE_API_KEY,
            },
          }
        );

        const matchData = response.data.response[0];
        setMatch({
          id: matchData.fixture.id,
          homeTeam: matchData.teams.home.name,
          awayTeam: matchData.teams.away.name,
          homeScore: matchData.goals.home,
          awayScore: matchData.goals.away,
          status: matchData.fixture.status.short,
          league: matchData.league.name,
          date: matchData.fixture.date,
          venue: matchData.fixture.venue.name,
        });

        setEvents(matchData.events);
        setLineups({
          home: matchData.lineups.home.map(player => player.player.name),
          away: matchData.lineups.away.map(player => player.player.name),
        });

        setStats([
          { label: 'Possession', home: matchData.statistics.home.possession, away: matchData.statistics.away.possession },
          { label: 'Shots', home: matchData.statistics.home.shots, away: matchData.statistics.away.shots },
          { label: 'Shots on Target', home: matchData.statistics.home.shots_on_target, away: matchData.statistics.away.shots_on_target },
          { label: 'Corners', home: matchData.statistics.home.corners, away: matchData.statistics.away.corners },
          { label: 'Fouls', home: matchData.statistics.home.fouls, away: matchData.statistics.away.fouls },
        ]);
      } catch (error) {
        console.error('Error fetching match details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [id]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteFixture(Number(id));
      setIsFavorite(false);
      toast.success('Match removed from favorites');
    } else {
      addFavoriteFixture({
        id: Number(id),
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        status: match.status,
        time: match.date,
        league: match.league,
      });
      setIsFavorite(true);
      toast.success('Match added to favorites');
    }
  };

  if (loading) {
    return <div>Loading match details...</div>;
  }

  return (
    <div className="match-details-page">
      <div className="top-actions">
        <button onClick={() => navigate(-1)} className="back-button">← Back</button>
        <button
          onClick={toggleFavorite}
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
        >
          {isFavorite ? '★' : '☆'} {isFavorite ? 'Favorited' : 'Add to Favorites'}
        </button>
      </div>

      <div className="match-header">
        <div className="match-info-header">
          <p className="league-name">{match.league}</p>
          <p className="match-date">{match.date} • {match.venue}</p>
        </div>
        <div className="score-display">
          <div className="team-display">
            <h2>{match.homeTeam}</h2>
            <span className="score-large">{match.homeScore}</span>
          </div>
          <div className="vs-divider">VS</div>
          <div className="team-display">
            <h2>{match.awayTeam}</h2>
            <span className="score-large">{match.awayScore}</span>
          </div>
        </div>
        <p className="match-status-large">{match.status}</p>
      </div>

      <div className="details-sections">
        <section className="detail-section">
          <h3>Match Events</h3>
          <div className="events-list">
            {events.map(event => (
              <div key={event.id} className="event-item">
                <span className="event-time">{event.time}</span>
                <span className={`event-type ${event.type}`}>
                  {event.type === 'goal' ? '⚽' : '🟨'}
                </span>
                <span className="event-player">{event.player}</span>
                <span className="event-team">({event.team === 'home' ? match.homeTeam : match.awayTeam})</span>
              </div>
            ))}
          </div>
        </section>

        <section className="detail-section">
          <h3>Lineups</h3>
          <div className="lineups-grid">
            <div className="lineup-column">
              <h4>{match.homeTeam}</h4>
              <ul>
                {lineups.home.map((player, idx) => (
                  <li key={idx}>{player}</li>
                ))}
              </ul>
            </div>
            <div className="lineup-column">
              <h4>{match.awayTeam}</h4>
              <ul>
                {lineups.away.map((player, idx) => (
                  <li key={idx}>{player}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="detail-section">
          <h3>Match Statistics</h3>
          <div className="stats-list">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-item">
                <div className="stat-values">
                  <span className="stat-home">{stat.home}</span>
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-away">{stat.away}</span>
                </div>
                <div className="stat-bar">
                  <div
                    className="stat-bar-home"
                    style={{ width: `${(stat.home / (stat.home + stat.away)) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MatchDetails;
