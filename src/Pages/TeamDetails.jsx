import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MatchCard from "../Components/MatchCard";
import {
  addFavoriteTeam,
  removeFavoriteTeam,
  isTeamFavorite,
} from "../Utils/favorites";
import { toast } from "sonner";
import axios from "axios";
import "../Styles/TeamDetails.css";

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
    setIsFavorite(isTeamFavorite(id || ""));

    const fetchTeamDetails = async () => {
      try {
        const teamRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/teams?id=${id}`,
          {
            headers: {
              "x-apisports-key": import.meta.env.API_KEY,
            },
          }
        );
        const teamData = teamRes.data.response[0];
        setTeam(teamData.team);

        // Fetch fixtures (upcoming)
        const matchesRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/fixtures?team=${id}&next=5`,
          {
            headers: {
              "x-apisports-key": import.meta.env.API_KEY,
            },
          }
        );
        setUpcomingMatches(matchesRes.data.response);

        // Fetch league standings
        if (matchesRes.data.response.length > 0) {
          const leagueId = matchesRes.data.response[0].league.id;
          const standingsRes = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/standings?league=${leagueId}&season=2024`,
            {
              headers: {
                "x-apisports-key": import.meta.env.API_KEY,
              },
            }
          );
          setLeagueTable(standingsRes.data.response[0].league.standings[0]);
        }

        // Fetch squad
        const squadRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/players/squads?team=${id}`,
          {
            headers: {
              "x-apisports-key": import.meta.env.API_KEY,
            },
          }
        );
        setSquad(squadRes.data.response[0].players);
      } catch (err) {
        console.error("Error fetching team details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamDetails();
  }, [id]);

  const toggleFavorite = () => {
    if (!team) return;
    if (isFavorite) {
      removeFavoriteTeam(id);
      setIsFavorite(false);
      toast.success("Removed from favorites");
    } else {
      addFavoriteTeam({ id, name: team.name });
      setIsFavorite(true);
      toast.success("Added to favorites");
    }
  };

  if (loading) return <div>Loading team details...</div>;
  if (!team) return <div>No team data available</div>;

  return (
    <div className="team-details-page">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>

      <div className="team-header">
        <div className="team-info">
          <h1>{team.name}</h1>
          <p>{team.country}</p>
        </div>
        <button
          onClick={toggleFavorite}
          className={`favorite-button ${isFavorite ? "active" : ""}`}
        >
          {isFavorite ? "★ Favorited" : "☆ Add to Favorites"}
        </button>
      </div>

      <section className="team-section">
        <h2>Upcoming Matches</h2>
        <div className="matches-list">
          {upcomingMatches.length > 0 ? (
            upcomingMatches.map((fixture) => (
              <MatchCard key={fixture.fixture.id} fixture={fixture} />
            ))
          ) : (
            <p>No upcoming matches</p>
          )}
        </div>
      </section>

      <section className="team-section">
        <h2>League Table</h2>
        <table className="league-table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Team</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {leagueTable.map((row) => (
              <tr key={row.team.id}>
                <td>{row.rank}</td>
                <td>{row.team.name}</td>
                <td>{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="team-section">
        <h2>Squad</h2>
        <div className="squad-grid">
          {squad.map((p) => (
            <div key={p.id} className="player-card">
              <h4>{p.name}</h4>
              <p>{p.position}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TeamDetails;
