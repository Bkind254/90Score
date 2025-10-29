// src/Pages/Leagues.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFootball } from '../api/useFootball';
import MatchCard from '../Components/MatchCard';
import SearchBar from "../Components/SearchBar";
import '../Styles/Leagues.css';

const Leagues = () => {
  const navigate = useNavigate();
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all leagues
  const { data: rawLeagues = [], isLoading: loadingLeagues } = useFootball("/leagues");

  // Transform leagues
  const leagues = rawLeagues.map(item => ({
    id: item.league.id,
    name: item.league.name,
    country: item.country.name,
    logo: item.league.logo,
  })).slice(0, 20);

  // Fetch matches for selected league
  const { data: rawMatches = [], isFetching: loadingMatches } = useFootball(
    selectedLeague ? `/fixtures?league=${selectedLeague}&season=2024&last=10` : null,
    { enabled: !!selectedLeague }
  );

  const matches = rawMatches.map(match => ({
    id: match.fixture.id,
    homeTeam: match.teams.home.name,
    awayTeam: match.teams.away.name,
    homeLogo: match.teams.home.logo,
    awayLogo: match.teams.away.logo,
    homeScore: match.goals.home,
    awayScore: match.goals.away,
    status: match.fixture.status.short,
    time: match.fixture.status.elapsed ? `${match.fixture.status.elapsed}'` : 'FT',
    league: match.league.name,
    leagueLogo: match.league.logo,
  }));

  const filteredLeagues = leagues.filter(league =>
    league.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    league.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLeagueClick = (leagueId) => {
    setSelectedLeague(leagueId);
    // Optional: navigate(`/league/${leagueId}`);
  };

  return (
    <div className="leagues-page">
      <h1>Football Leagues</h1>
      <p className="page-subtitle">Select a league to view recent match results</p>

      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <SearchBar onSearch={setSearchQuery} placeholder="Search leagues..." />
      </div>

      <div className="leagues-container">
        {/* Leagues List */}
        <div className="leagues-list">
          {loadingLeagues ? (
            <p>Loading leagues...</p>
          ) : filteredLeagues.length > 0 ? (
            filteredLeagues.map(league => (
              <div
                key={league.id}
                className={`league-item ${selectedLeague === league.id ? 'league-item-active' : ''}`}
                onClick={() => handleLeagueClick(league.id)}
              >
                <img src={league.logo} alt={league.name} className="league-logo" />
                <div>
                  <h3>{league.name}</h3>
                  <p>{league.country}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No leagues found</p>
          )}
        </div>

        {/* Matches */}
        <div className="league-matches">
          {selectedLeague ? (
            <>
              <h2>
                {leagues.find(l => l.id === selectedLeague)?.name} - Recent Matches
              </h2>
              {loadingMatches ? (
                <p>Loading matches...</p>
              ) : matches.length > 0 ? (
                <div className="matches-list">
                  {matches.map(match => (
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
                <p className="no-matches">No matches available</p>
              )}
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