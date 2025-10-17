import { useEffect, useState } from 'react';
import axios from 'axios';
import MatchCard from '../Components/MatchCard';
import SearchBar from '../Components/SearchBar';
import '../Styles/LiveScores.css';

const LiveScores = () => {
  const [liveMatches, setLiveMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch live matches from API-FOOTBALL
  useEffect(() => {
    const fetchLiveMatches = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/fixtures?live=all`,
          {
            headers: {
              'x-apisports-key': import.meta.env.VITE_API_KEY,
            },
          }
        );

        // Format API response into clean objects
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
            : match.fixture.status.long,
          league: match.league.name,
          leagueLogo: match.league.logo,
        }));

        setLiveMatches(matches);
      } catch (error) {
        console.error('Error fetching live matches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveMatches();
  }, []);

  // Filter matches based on search query
  const filteredMatches = liveMatches.filter((match) =>
    match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
    match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
    match.league.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="live-scores-page">
      <div className="live-header">
        <h1>Live Matches</h1>
        <div className="live-indicator">
          <span className="live-dot"></span>
          <span>
            {filteredMatches.length > 0
              ? `${filteredMatches.length} matches in progress`
              : 'No live matches'}
          </span>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <SearchBar onSearch={setSearchQuery} placeholder="Search teams or leagues..." />
      </div>

      {loading ? (
        <p>Loading live matches...</p>
      ) : filteredMatches.length > 0 ? (
        <div className="live-matches-grid">
          {filteredMatches.map((match) => (
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
        <div className="no-live-matches">
          <p>No live matches at the moment</p>
          <p className="subtitle">Check back soon for live updates</p>
        </div>
      )}
    </div>
  );
};

export default LiveScores;
