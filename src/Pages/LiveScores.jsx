import MatchCard from '../Components/MatchCard';
import '../Styles/LiveScores.css';

const LiveScores = () => {
  // Dummy live match data - will be replaced with API-FOOTBALL data
  const liveMatches = [
    {
      id: 1,
      homeTeam: 'Manchester United',
      awayTeam: 'Liverpool',
      homeScore: 2,
      awayScore: 1,
      status: 'LIVE',
      time: "67'",
      league: 'Premier League'
    },
    {
      id: 2,
      homeTeam: 'Barcelona',
      awayTeam: 'Real Madrid',
      homeScore: 1,
      awayScore: 1,
      status: 'LIVE',
      time: "54'",
      league: 'La Liga'
    },
    {
      id: 3,
      homeTeam: 'Juventus',
      awayTeam: 'Inter Milan',
      homeScore: 0,
      awayScore: 0,
      status: 'LIVE',
      time: "23'",
      league: 'Serie A'
    },
    {
      id: 4,
      homeTeam: 'Bayern Munich',
      awayTeam: 'RB Leipzig',
      homeScore: 3,
      awayScore: 2,
      status: 'LIVE',
      time: "78'",
      league: 'Bundesliga'
    },
    {
      id: 5,
      homeTeam: 'PSG',
      awayTeam: 'Lyon',
      homeScore: 1,
      awayScore: 0,
      status: 'LIVE',
      time: "41'",
      league: 'Ligue 1'
    },
    {
      id: 6,
      homeTeam: 'Atletico Madrid',
      awayTeam: 'Sevilla',
      homeScore: 2,
      awayScore: 2,
      status: 'LIVE',
      time: "89'",
      league: 'La Liga'
    }
  ];

  return (
    <div className="live-scores-page">
      <div className="live-header">
        <h1>Live Matches</h1>
        <div className="live-indicator">
          <span className="live-dot"></span>
          <span>{liveMatches.length} matches in progress</span>
        </div>
      </div>

      <div className="live-matches-grid">
        {liveMatches.map(match => (
          <MatchCard
            key={match.id}
            homeTeam={match.homeTeam}
            awayTeam={match.awayTeam}
            homeScore={match.homeScore}
            awayScore={match.awayScore}
            status={match.status}
            time={match.time}
            league={match.league}
          />
        ))}
      </div>

      {liveMatches.length === 0 && (
        <div className="no-live-matches">
          <p>No live matches at the moment</p>
          <p className="subtitle">Check back soon for live updates</p>
        </div>
      )}
    </div>
  );
};

export default LiveScores;
