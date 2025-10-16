import "../Styles/MatchCard.css";

const MatchCard = ({ homeTeam, awayTeam, homeScore, awayScore, status, time, league }) => {
  const isLive = status === 'LIVE';
  
  return (
    <div className={`match-card ${isLive ? 'match-card-live' : ''}`}>
      {league && <div className="match-league">{league}</div>}
      <div className="match-teams">
        <div className="match-team">
          <span className="team-name">{homeTeam}</span>
          <span className="team-score">{homeScore}</span>
        </div>
        <div className="match-team">
          <span className="team-name">{awayTeam}</span>
          <span className="team-score">{awayScore}</span>
        </div>
      </div>
      <div className="match-info">
        <span className={`match-status ${isLive ? 'status-live' : ''}`}>
          {status}
        </span>
        <span className="match-time">{time}</span>
      </div>
    </div>
  );
};

export default MatchCard;
