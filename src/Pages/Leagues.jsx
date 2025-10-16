import { useState } from 'react';
import MatchCard from '../Components/MatchCard';
import '../Styles/Leagues.css';

const Leagues = () => {
  // Dummy data - will be replaced with API-FOOTBALL data
  const leagues = [
    { id: 1, name: 'Premier League', country: 'England' },
    { id: 2, name: 'La Liga', country: 'Spain' },
    { id: 3, name: 'Serie A', country: 'Italy' },
    { id: 4, name: 'Bundesliga', country: 'Germany' },
    { id: 5, name: 'Ligue 1', country: 'France' },
    { id: 6, name: 'Champions League', country: 'Europe' }
  ];

  const leagueMatches = {
    1: [
      { id: 1, homeTeam: 'Arsenal', awayTeam: 'Chelsea', homeScore: 2, awayScore: 0, status: 'FT', time: 'Full Time' },
      { id: 2, homeTeam: 'Manchester City', awayTeam: 'Tottenham', homeScore: 3, awayScore: 1, status: 'FT', time: 'Full Time' }
    ],
    2: [
      { id: 3, homeTeam: 'Atletico Madrid', awayTeam: 'Sevilla', homeScore: 1, awayScore: 1, status: 'FT', time: 'Full Time' },
      { id: 4, homeTeam: 'Valencia', awayTeam: 'Villarreal', homeScore: 0, awayScore: 2, status: 'FT', time: 'Full Time' }
    ],
    3: [
      { id: 5, homeTeam: 'Juventus', awayTeam: 'AC Milan', homeScore: 2, awayScore: 2, status: 'FT', time: 'Full Time' },
      { id: 6, homeTeam: 'Inter Milan', awayTeam: 'Napoli', homeScore: 1, awayScore: 0, status: 'FT', time: 'Full Time' }
    ]
  };

  const [selectedLeague, setSelectedLeague] = useState(null);

  return (
    <div className="leagues-page">
      <h1>Football Leagues</h1>
      <p className="page-subtitle">Select a league to view recent match results</p>

      <div className="leagues-container">
        <div className="leagues-list">
          {leagues.map(league => (
            <div
              key={league.id}
              className={`league-item ${selectedLeague === league.id ? 'league-item-active' : ''}`}
              onClick={() => setSelectedLeague(league.id)}
            >
              <h3>{league.name}</h3>
              <p>{league.country}</p>
            </div>
          ))}
        </div>

        <div className="league-matches">
          {selectedLeague ? (
            <>
              <h2>{leagues.find(l => l.id === selectedLeague)?.name} - Recent Matches</h2>
              <div className="matches-list">
                {leagueMatches[selectedLeague]?.map(match => (
                  <MatchCard
                    key={match.id}
                    homeTeam={match.homeTeam}
                    awayTeam={match.awayTeam}
                    homeScore={match.homeScore}
                    awayScore={match.awayScore}
                    status={match.status}
                    time={match.time}
                  />
                )) || <p className="no-matches">No matches available for this league</p>}
              </div>
            </>
          ) : (
            <div className="no-selection">
              <p>Select a league from the list to view matches</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leagues;
