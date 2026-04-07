// src/Pages/Search.jsx  — ADD this new file
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../Components/SearchBar";
import MatchCard from "../Components/MatchCard";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (q) => {
    if (!q || q.trim().length < 3) return;
    setLoading(true);
    setSearched(true);
    try {
      // Search fixtures by team name
      const res = await fetch(
        `/.netlify/functions/football?endpoint=${encodeURIComponent(`/fixtures?team=${encodeURIComponent(q)}&season=2024&last=10`)}`
      );
      const data = await res.json();

      // Also search teams
      const teamRes = await fetch(
        `/.netlify/functions/football?endpoint=${encodeURIComponent(`/teams?search=${encodeURIComponent(q)}`)}`
      );
      const teamData = await teamRes.json();

      setResults({
        fixtures: Array.isArray(data.response) ? data.response : [],
        teams: Array.isArray(teamData.response) ? teamData.response : [],
      });
    } catch (err) {
      console.error(err);
      setResults({ fixtures: [], teams: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1>Search</h1>
      <SearchBar onSearch={handleSearch} placeholder="Search teams or matches..." />

      {loading && <p>Searching...</p>}

      {!loading && searched && (
        <>
          {/* Teams */}
          {results.teams?.length > 0 && (
            <section style={{ marginTop: "2rem" }}>
              <h2>Teams</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {results.teams.map(({ team }) => (
                  <div
                    key={team.id}
                    onClick={() => navigate(`/team/${team.id}`)}
                    style={{
                      cursor: "pointer", padding: "1rem", border: "1px solid #ddd",
                      borderRadius: "8px", display: "flex", alignItems: "center", gap: "0.75rem"
                    }}
                  >
                    <img src={team.logo} alt={team.name} style={{ width: 36, height: 36 }} />
                    <div>
                      <strong>{team.name}</strong>
                      <p style={{ margin: 0, fontSize: "0.85rem", color: "#666" }}>{team.country}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Fixtures */}
          {results.fixtures?.length > 0 && (
            <section style={{ marginTop: "2rem" }}>
              <h2>Matches</h2>
              <div className="matches-grid">
                {results.fixtures.map((fixture) => (
                  <MatchCard key={fixture.fixture.id} fixture={fixture} />
                ))}
              </div>
            </section>
          )}

          {results.teams?.length === 0 && results.fixtures?.length === 0 && (
            <p style={{ marginTop: "2rem" }}>No results found for "{query}"</p>
          )}
        </>
      )}
    </div>
  );
};

export default Search;