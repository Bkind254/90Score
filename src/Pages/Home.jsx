import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MatchCard from "../Components/MatchCard";
import "../Styles/Home.css";

const Home = () => {
  const [featuredMatches, setFeaturedMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch live or recent matches from API-FOOTBALL
  const fetchMatches = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/fixtures?live=all`,
        {
          headers: {
            "x-apisports-key": import.meta.env.VITE_API_KEY,
            "x-rapidapi-host": import.meta.env.VITE_API_HOST,
          },
        }
      );

      // Extract and format data
      const matches = response.data.response.map((match) => ({
        id: match.fixture.id,
        homeTeam: match.teams.home.name,
        awayTeam: match.teams.away.name,
        homeLogo: match.teams.home.logo,
        awayLogo: match.teams.away.logo,
        homeScore: match.goals.home,
        awayScore: match.goals.away,
        status: match.fixture.status.short,
        time: match.fixture.status.elapsed
          ? `${match.fixture.status.elapsed}'`
          : "FT",
        league: match.league.name,
        leagueLogo: match.league.logo,
      }));

      setFeaturedMatches(matches.slice(0, 6)); // show top 6
      setLoading(false);
    } catch (error) {
      console.error("Error fetching matches:", error);
      setLoading(false);
    }
  };

  // Run once on mount + refresh every 30s
  useEffect(() => {
    fetchMatches();
    const interval = setInterval(fetchMatches, 30000);
    return () => clearInterval(interval);
  }, []);

  const featuredLeagues = [
    { id: 1, name: "Premier League", country: "England", matches: 38 },
    { id: 2, name: "La Liga", country: "Spain", matches: 42 },
    { id: 3, name: "Serie A", country: "Italy", matches: 35 },
    { id: 4, name: "Bundesliga", country: "Germany", matches: 31 },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome to 90Score</h1>
        <p>Your ultimate destination for live football scores and updates</p>
      </section>

      {/* Live Matches Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Live & Recent Matches</h2>
          <Link to="/live" className="view-all-link">
            View All Live →
          </Link>
        </div>

        {loading ? (
          <p>Loading matches...</p>
        ) : featuredMatches.length > 0 ? (
          <div className="matches-grid">
            {featuredMatches.map((match) => (
              <MatchCard
                key={match.id}
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
                homeLogo={match.homeLogo}
                awayLogo={match.awayLogo}
                homeScore={match.homeScore}
                awayScore={match.awayScore}
                status={match.status}
                time={match.time}
                league={match.league}
                leagueLogo={match.leagueLogo}
              />
            ))}
          </div>
        ) : (
          <p>No live matches at the moment.</p>
        )}
      </section>

      {/* Leagues Section */}
      <section className="leagues-section">
        <div className="section-header">
          <h2>Featured Leagues</h2>
          <Link to="/leagues" className="view-all-link">
            View All Leagues →
          </Link>
        </div>
        <div className="leagues-grid">
          {featuredLeagues.map((league) => (
            <div key={league.id} className="league-card">
              <h3>{league.name}</h3>
              <p className="league-country">{league.country}</p>
              <p className="league-matches">{league.matches} matches played</p>
              <Link to="/leagues" className="league-button">
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
