import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MatchCard from "../Components/MatchCard";
import "../Styles/Home.css";

const Home = () => {
  const [featuredMatches, setFeaturedMatches] = useState([]);
  const [loading, setLoading] = useState(true);

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

      const matches = response.data.response;
      setFeaturedMatches(matches.slice(0, 6)); // ✅ keep full fixture object
      setLoading(false);
    } catch (error) {
      console.error("Error fetching matches:", error);
      setLoading(false);
    }
  };

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
            {featuredMatches.map((fixture) => (
              <MatchCard key={fixture.fixture.id} fixture={fixture} /> // ✅ correct
            ))}
          </div>
        ) : (
          <p>No live matches at the moment.</p>
        )}
      </section>

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
