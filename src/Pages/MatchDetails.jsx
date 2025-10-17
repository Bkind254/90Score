import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  addFavoriteFixture,
  removeFavoriteFixture,
  isFixtureFavorite,
} from "../Utils/favorites";
import { toast } from "sonner";
import axios from "axios";
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
    setIsFavorite(isFixtureFavorite(Number(id)));

    const fetchMatchData = async () => {
      try {
        // 1️⃣ Fixture Info
        const fixRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/fixtures?id=${id}`,
          { headers: { "x-apisports-key": import.meta.env.VITE_API_KEY } }
        );
        const matchData = fixRes.data.response[0];
        if (!matchData) return setLoading(false);

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

        // 2️⃣ Events
        const eventsRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/fixtures/events?fixture=${id}`,
          { headers: { "x-apisports-key": import.meta.env.VITE_API_KEY } }
        );
        setEvents(eventsRes.data.response);

        // 3️⃣ Lineups
        const lineupsRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/fixtures/lineups?fixture=${id}`,
          { headers: { "x-apisports-key": import.meta.env.VITE_API_KEY } }
        );
        setLineups({
          home: lineupsRes.data.response[0]?.startXI || [],
          away: lineupsRes.data.response[1]?.startXI || [],
        });

        // 4️⃣ Stats
        const statsRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/fixtures/statistics?fixture=${id}`,
          { headers: { "x-apisports-key": import.meta.env.VITE_API_KEY } }
        );
        setStats(statsRes.data.response);
      } catch (err) {
        console.error("Error fetching match details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchData();
  }, [id]);

  const toggleFavorite = () => {
    if (!match) return;
    if (isFavorite) {
      removeFavoriteFixture(Number(id));
      setIsFavorite(false);
      toast.success("Removed from favorites");
    } else {
      addFavoriteFixture(match);
      setIsFavorite(true);
      toast.success("Added to favorites");
    }
  };

  if (loading) return <div>Loading match details...</div>;
  if (!match) return <div>No match data found</div>;

  return (
    <div className="match-details-page">
      <div className="top-actions">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        <button
          onClick={toggleFavorite}
          className={`favorite-button ${isFavorite ? "active" : ""}`}
        >
          {isFavorite ? "★ Favorited" : "☆ Add to Favorites"}
        </button>
      </div>

      <div className="match-header">
        <p className="league-name">{match.league}</p>
        <p className="match-date">
          {new Date(match.date).toLocaleString()} • {match.venue}
        </p>

        <div className="score-display">
          <div>
            <h2>{match.homeTeam}</h2>
            <span>{match.homeScore}</span>
          </div>
          <div className="vs-divider">VS</div>
          <div>
            <h2>{match.awayTeam}</h2>
            <span>{match.awayScore}</span>
          </div>
        </div>

        <p className="match-status-large">{match.status}</p>
      </div>

      <section className="detail-section">
        <h3>Match Events</h3>
        {events.length ? (
          events.map((e, i) => (
            <p key={i}>
              {e.time.elapsed}' {e.type} – {e.player.name} ({e.team.name})
            </p>
          ))
        ) : (
          <p>No events</p>
        )}
      </section>

      <section className="detail-section">
        <h3>Lineups</h3>
        <div className="lineups">
          <div>
            <h4>{match.homeTeam}</h4>
            <ul>
              {lineups.home.map((p, i) => (
                <li key={i}>{p.player.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{match.awayTeam}</h4>
            <ul>
              {lineups.away.map((p, i) => (
                <li key={i}>{p.player.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="detail-section">
        <h3>Statistics</h3>
        {stats.length ? (
          stats[0].statistics.map((s, i) => (
            <div key={i} className="stat-row">
              <span>{s.value}</span>
              <span>{s.type}</span>
              <span>{stats[1]?.statistics[i]?.value}</span>
            </div>
          ))
        ) : (
          <p>No stats available</p>
        )}
      </section>
    </div>
  );
};

export default MatchDetails;
