import React from "react";
import "../Styles/MatchCard.css";

const MatchCard = ({ homeTeam, awayTeam, homeLogo, awayLogo, homeScore, awayScore, status, time, league, leagueLogo }) => {
  const isLive = status === "LIVE" || status === "1H" || status === "2H";

  return (
    <div className={`match-card ${isLive ? "match-card-live" : ""}`}>
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
