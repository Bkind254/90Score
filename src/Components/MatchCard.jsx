import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/MatchCard.css";

const MatchCard = ({ fixture }) => {
  const navigate = useNavigate();

  if (!fixture) return null;

  const id = fixture.fixture.id;
  const home = fixture.teams.home;
  const away = fixture.teams.away;
  const league = fixture.league;

  const isLive =
    fixture.fixture.status.short === "LIVE" ||
    fixture.fixture.status.short === "1H" ||
    fixture.fixture.status.short === "2H";

  return (
    <div
      className={`match-card ${isLive ? "match-card-live" : ""}`}
      onClick={() => navigate(`/match/${id}`)}
    >
      <div className="match-league">
        {league.logo && <img src={league.logo} alt={league.name} className="league-logo" />}
        <span>{league.name}</span>
      </div>

      <div className="match-teams">
        <div className="match-team">
          <img src={home.logo} alt={home.name} className="team-logo" />
          <span className="team-name">{home.name}</span>
          <span className="team-score">{fixture.goals.home ?? "-"}</span>
        </div>
        <div className="match-team">
          <img src={away.logo} alt={away.name} className="team-logo" />
          <span className="team-name">{away.name}</span>
          <span className="team-score">{fixture.goals.away ?? "-"}</span>
        </div>
      </div>

      <div className="match-info">
        <span className={`match-status ${isLive ? "status-live" : ""}`}>
          {isLive ? "LIVE" : fixture.fixture.status.short}
        </span>
        <span className="match-time">
          {new Date(fixture.fixture.date).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default MatchCard;
