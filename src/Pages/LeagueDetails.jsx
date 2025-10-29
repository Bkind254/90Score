// src/Pages/LeagueDetails.jsx
import { useParams } from "react-router-dom";
import { useFootball } from "../api/useFootball";
import MatchCard from "../Components/MatchCard";
import "../Styles/LeagueDetails.css";

const LeagueDetails = () => {
  const { id } = useParams();
  const { data: fixtures = [], isLoading } = useFootball(
    `/fixtures?league=${id}&season=2024&last=10`
  );

  if (isLoading) return <p>Loading league details...</p>;

  return (
    <div className="league-details-page">
      <h1>League Matches</h1>
      {fixtures.length > 0 ? (
        <div className="matches-grid">
          {fixtures.map(fixture => (
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