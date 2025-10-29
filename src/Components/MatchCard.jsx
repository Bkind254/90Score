// src/Components/MatchCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/MatchCard.css";

const MatchCard = ({ fixture, homeTeam, awayTeam, homeLogo, awayLogo, homeScore, awayScore, status, time, league, leagueLogo }) => {
  const navigate = useNavigate();

  // Support both prop styles: full fixture or individual props
  const f = fixture || {
    fixture: { id: null, status: { short: status }, date: new Date().toISOString() },
    teams: { home: { id: null, name: homeTeam, logo: homeLogo }, away: { id: null, name: awayTeam, logo: awayLogo } },
    goals: { home: homeScore, away: awayScore },
    league: { name: league, logo: leagueLogo },
  };

  if (!f) return null;

  const isLive = ["LIVE", "1H", "2H", "HT", "FT"].includes(f.fixture.status.short) && f.fixture.status.short !== "FT";

  const goToMatch = () => navigate(`/match/${f.fixture.id}`);
  const goToTeam = (teamId) => (e) => {
    e.stopPropagation();
    navigate(`/team/${teamId}`);
  };

  return (
    <div
      className={`match-card ${isLive ? "match-card-live" : ""}`}
      onClick={goToMatch}
    >
      <div className="match-league">
        {f.league.logo && <img src={f.league.logo} alt={f.league.name} className="league-logo" />}
        <span>{f.league.name}</span>
      </div>

      <div className="match-teams">
        {["home", "away"].map(side => {
          const team = f.teams[side];
          return (
            <div key={team.id} className="match-team">
              <img
                src={team.logo}
                alt={team.name}
                className="team-logo"
                onClick={goToTeam(team.id)}
              />
              <span
                className="team-name"
                onClick={goToTeam(team.id)}
                style={{ cursor: "pointer" }}
              >
                {team.name}
              </span>
              <span className="team-score">
                {side === "home" ? f.goals.home ?? "-" : f.goals.away ?? "-"}
              </span>
            </div>
          );
        })}
      </div>

      <div className="match-info">
        <span className={`match-status ${isLive ? "status-live" : ""}`}>
          {isLive ? "LIVE" : f.fixture.status.short}
        </span>
        <span className="match-time">
          {time || new Date(f.fixture.date).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default MatchCard;