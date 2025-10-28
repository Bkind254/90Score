import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MatchCard from "../Components/MatchCard";
import "../Styles/LeagueDetails.css";

const LeagueDetails = () => {
  const { id } = useParams();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/fixtures?league=${id}&season=2024&last=10`,
          { headers: { "x-apisports-key": import.meta.env.API_KEY } }
        );
        setMatches(res.data.response);
      } catch (err) {
        console.error("Error loading league matches:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [id]);

  if (loading) return <p>Loading league details...</p>;

  return (
    <div className="league-details-page">
      <h1>League Matches</h1>
      {matches.length > 0 ? (
        <div className="matches-grid">
          {matches.map((fixture) => (
            <MatchCard key={fixture.fixture.id} fixture={fixture} />
          ))}
        </div>
      ) : (
        <p>No matches available for this league</p>
      )}
    </div>
  );
};

export default LeagueDetails;
