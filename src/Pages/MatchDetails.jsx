// src/Pages/MatchDetails.jsx
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
  const [fixture, setFixture] = useState(null);
  const [events, setEvents] = useState([]);
  const [lineups, setLineups] = useState({ home: [], away: [] });
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsFavorite(isFixtureFavorite(Number(id)));

    const fetchMatchData = async () => {
      try {
        // ✅ 1. Fixture Info
        const fixRes = await axios.get(
          `/.Netlify/functions/football?endpoint=${encodeURIComponent(`/fixtures?id=${id}`)}`
        );
        const matchData = fixRes.data.response[0];
        if (!matchData) return setLoading(false);

        setFixture(matchData);

        // ✅ 2. Events
        const eventsRes = await axios.get(
          `/.Netlify/functions/football?endpoint=${encodeURIComponent(`/fixtures/events?fixture=${id}`)}`
        );
        setEvents(eventsRes.data.response);

        // ✅ 3. Lineups
        const lineupsRes = await axios.get(
          `/.Netlify/functions/football?endpoint=${encodeURIComponent(`/fixtures/lineups?fixture=${id}`)}`
        );
        setLineups({
          home: lineupsRes.data.response[0]?.startXI || [],
          away: lineupsRes.data.response[1]?.startXI || [],
        });

        // ✅ 4. Stats
        const statsRes = await axios.get(
          `/.Netlify/functions/football?endpoint=${encodeURIComponent(`/fixtures/statistics?fixture=${id}`)}`
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
    if (!fixture) return;
    if (isFavorite) {
      removeFavoriteFixture(Number(id));
      setIsFavorite(false);
      toast.success("Removed from favorites");
    } else {
      addFavoriteFixture(fixture);
      setIsFavorite(true);
      toast.success("Added to favorites");
    }
  };

  if (loading) return <div>Loading match details...</div>;
  if (!fixture) return <div>No match data found</div>;

  const match = fixture;

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
        <p className="league-name">{match.league.name}</p>
        <p className="match-date">
          {new Date(match.fixture.date).toLocaleString()} • {match.fixture.venue.name}
        </p>

        <div className="score-display">
          <div>
            <h2>{match.teams.home.name}</h2>
            <span>{match.goals.home}</span>
          </div>
          <div className="vs-divider">VS</div>
          <div>
            <h2>{match.teams.away.name}</h2>
            <span>{match.goals.away}</span>
          </div>
        </div>

        <p className="match-status-large">{match.fixture.status.short}</p>
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
            <h4>{match.teams.home.name}</h4>
            <ul>
              {lineups.home.map((p, i) => (
                <li key={i}>{p.player.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{match.teams.away.name}</h4>
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
