// src/Pages/Home.jsx
//import React from "react";
import { Link } from "react-router-dom";
import { useFootball } from "../api/useFootball";
import MatchCard from "../Components/MatchCard";
import "../Styles/Home.css";

const Home = () => {
  const { data: liveFixtures = [], isLoading } = useFootball("/fixtures?live=all", {
    refetchInterval: 30000,
  });

  const featuredMatches = liveFixtures.slice(0, 6);

  const featuredLeagues = [
    { id: 39, name: "Premier League", country: "England" },
    { id: 140, name: "La Liga", country: "Spain" },
    { id: 135, name: "Serie A", country: "Italy" },
    { id: 78, name: "Bundesliga", country: "Germany" },
  ];

  return (
    <div className="home-page">
      <section className="featured-section">
        <div className="section-header">
          <h2>Live & Recent Matches</h2>
          <Link to="/live" className="view-all-link">View All Live</Link>
        </div>

        {isLoading ? (
          <p>Loading matches...</p>
        ) : featuredMatches.length > 0 ? (
          <div className="matches-grid">
            {featuredMatches.map(fixture => (
              <MatchCard key={fixture.fixture.id} fixture={fixture} />
            ))}
          </div>
        ) : (
          <p>No live matches at the moment.</p>
        )}
      </section>

      <section className="leagues-section">
        <div className="section-header">
          <h2>Featured Leagues</h2>
          <Link to="/leagues" className="view-all-link">View All Leagues</Link>
        </div>
        <div className="leagues-grid">
          {featuredLeagues.map(league => (
            <div key={league.id} className="league-card">
              <h3>{league.name}</h3>
              <p className="league-country">{league.country}</p>
              <Link to={`/league/${league.id}`} className="league-button">
                View Scores
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
