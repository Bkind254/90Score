import React from "react";
import { useNavigate } from 'react-router-dom';
import "../Styles/MatchCard.css";

const MatchCard = ({ 
  id, 
  homeTeam, 
  awayTeam, 
  homeLogo, 
  awayLogo, 
  homeScore, 
  awayScore, 
  status, 
  time, 
  league, 
  leagueLogo 
}) => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const isLive = status === "LIVE" || status === "1H" || status === "2H"; // Check if the match is live

  // Handle card click to navigate
  const handleClick = () => {
    if (id) {
      navigate(`/match/${id}`); // Navigate to match detail page
    }
  };

  return (
    <div 
      className={`match-card ${isLive ? "match-card-live" : ""} ${id ? "clickable" : ""}`}
      onClick={handleClick} // Add click handler to navigate
    >
      {/* League name and logo */}
      <div className="match-league">
        {leagueLogo && <img src={leagueLogo} alt={league} className="league-logo" />}
        <span>{league}</span>
      </div>

      {/* Teams */}
      <div className="match-teams">
        <div className="match-team">
          {homeLogo && <img src={homeLogo} alt={homeTeam} className="team-logo" />}
          <span className="team-name">{homeTeam}</span>
          <span className="team-score">{homeScore !== null ? homeScore : "-"}</span>
        </div>
        <div className="match-team">
          {awayLogo && <img src={awayLogo} alt={awayTeam} className="team-logo" />}
          <span className="team-name">{awayTeam}</span>
          <span className="team-score">{awayScore !== null ? awayScore : "-"}</span>
        </div>
      </div>

      {/* Match info */}
      <div className="match-info">
        <span className={`match-status ${isLive ? "status-live" : ""}`}>
          {isLive ? "LIVE" : status}
        </span>
        <span className="match-time">{time}</span>
      </div>
    </div>
  );
};

export default MatchCard;
