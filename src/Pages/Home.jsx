import React from 'react'
import { Link } from 'react-router-dom'
import MatchCard from '../Components/MatchCard'
import "../Styles/Home.css"

const Home = () => {
  // Dummy data - will be replaced with API-FOOTBALL data
  const featuredMatches = [
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
      homeTeam: 'Bayern Munich',
      awayTeam: 'Borussia Dortmund',
      homeScore: 3,
      awayScore: 0,
      status: 'FT',
      time: 'Full Time',
      league: 'Bundesliga'
    },
    {
      id: 4,
      homeTeam: 'PSG',
      awayTeam: 'Marseille',
      homeScore: 2,
      awayScore: 2,
      status: 'FT',
      time: 'Full Time',
      league: 'Ligue 1'
    }
  ];

  const featuredLeagues = [
    { id: 1, name: 'Premier League', country: 'England', matches: 38 },
    { id: 2, name: 'La Liga', country: 'Spain', matches: 42 },
    { id: 3, name: 'Serie A', country: 'Italy', matches: 35 },
    { id: 4, name: 'Bundesliga', country: 'Germany', matches: 31 }
  ];

  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>Welcome to 90Score</h1>
        <p>Your ultimate destination for live football scores and updates</p>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2>Live & Recent Matches</h2>
          <Link to="/live" className="view-all-link">View All Live →</Link>
        </div>
        <div className="matches-grid">
          {featuredMatches.map(match => (
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
      </section>

      <section className="leagues-section">
        <div className="section-header">
          <h2>Featured Leagues</h2>
          <Link to="/leagues" className="view-all-link">View All Leagues →</Link>
        </div>
        <div className="leagues-grid">
          {featuredLeagues.map(league => (
            <div key={league.id} className="league-card">
              <h3>{league.name}</h3>
              <p className="league-country">{league.country}</p>
              <p className="league-matches">{league.matches} matches played</p>
              <Link to="/leagues" className="league-button">View Scores</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;