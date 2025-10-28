import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MatchCard from '../Components/MatchCard';
import SearchBar from "../Components/SearchBar";
import '../Styles/Leagues.css';

const Leagues = () => {
  const navigate = useNavigate();
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loadingLeagues, setLoadingLeagues] = useState(true);
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ Fetch all leagues
  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/leagues`,
          {
            headers: {
              'x-apisports-key': import.meta.env.API_KEY,
            },
          }
        );

        const leaguesData = response.data.response.map((item) => ({
          id: item.league.id,
          name: item.league.name,
          country: item.country.name,
          logo: item.league.logo,
        }));

        setLeagues(leaguesData.slice(0, 20)); // show top 20 leagues
        setLoadingLeagues(false);
      } catch (err) {
        console.error('Error fetching leagues:', err);
        setError('Failed to load leagues');
        setLoadingLeagues(false);
      }
    };

    fetchLeagues();
  }, []);

  // ✅ Fetch recent matches for selected league
  const fetchLeagueMatches = async (leagueId) => {
    setLoadingMatches(true);
    setMatches([]);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/fixtures?league=${leagueId}&season=2024&last=10`,
        {
          headers: {
            'x-apisports-key': import.meta.env.VITE_API_KEY,
          },
        }
      );

      const matchesData = response.data.response.map((match) => ({
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
          : 'FT',
        league: match.league.name,
        leagueLogo: match.league.logo,
      }));

      setMatches(matchesData);
      setLoadingMatches(false);
    } catch (err) {
      console.error('Error fetching league matches:', err);
      setError('Failed to load matches');
      setLoadingMatches(false);
    }
  };

  // ✅ Handle league click
  const handleLeagueClick = (leagueId) => {
    setSelectedLeague(leagueId);
    fetchLeagueMatches(leagueId);
    //navigate(`/league/${leagueId}`);  Navigate to league details page
  };

  const filteredLeagues = leagues.filter(
    (league) =>
      league.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      league.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="leagues-page">
      <h1>Football Leagues</h1>
      <p className="page-subtitle">Select a league to view recent match results</p>

      {error && <p className="error-message">{error}</p>}

      {/* Search bar */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <SearchBar onSearch={setSearchQuery} placeholder="Search leagues..." />
      </div>

      <div className="leagues-container">
        {/* Left side — Leagues list */}
        <div className="leagues-list">
          {loadingLeagues ? (
            <p>Loading leagues...</p>
          ) : (
            filteredLeagues.map((league) => (
              <div
                key={league.id}
                className={`league-item ${
                  selectedLeague === league.id ? 'league-item-active' : ''
                }`}
                onClick={() => handleLeagueClick(league.id)}
              >
                <img
                  src={league.logo}
                  alt={league.name}
                  className="league-logo"
                />
                <div>
                  <h3>{league.name}</h3>
                  <p>{league.country}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right side — Matches */}
        <div className="league-matches">
          {selectedLeague ? (
            <>
              <h2>
                {leagues.find((l) => l.id === selectedLeague)?.name} - Recent Matches
              </h2>

              {loadingMatches ? (
                <p>Loading matches...</p>
              ) : matches.length > 0 ? (
                <div className="matches-list">
                  {matches.map((match) => (
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
                <p className="no-matches">No matches available for this league</p>
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
