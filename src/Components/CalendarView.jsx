import { useState, useEffect } from "react";
import Calendar from "./ui/Calendar";
import { format } from "date-fns";
import MatchCard from "./MatchCard";
import "../Styles/CalenderView.css";

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch matches from API
  const fetchMatchesForDate = async (date) => {
    try {
      setLoading(true);
      setError(null);

      const formattedDate = format(date, "yyyy-MM-dd");
      const response = await fetch(
        `/.netlify/functions/football?endpoint=fixtures&date=${formattedDate}`
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();

      // ✅ Normalize API response
      const fetchedMatches = (data.response || []).map((item) => ({
        id: item.fixture?.id,
        homeTeam: item.teams?.home?.name,
        awayTeam: item.teams?.away?.name,
        homeScore: item.goals?.home,
        awayScore: item.goals?.away,
        status: item.fixture?.status?.short,
        league: item.league?.name,
        date: item.fixture?.date,
      }));

      setMatches(fetchedMatches);
    } catch (err) {
      console.error("Error fetching matches:", err);
      setError("Failed to load matches. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Fetch when date changes
  useEffect(() => {
    fetchMatchesForDate(selectedDate);
  }, [selectedDate]);

  // 🏆 Group matches by league
  const matchesByLeague = matches.reduce((acc, match) => {
    const league = match.league || "Other";
    if (!acc[league]) acc[league] = [];
    acc[league].push(match);
    return acc;
  }, {});

  return (
    <div className="calendar-view">
      <div className="calendar-container">
        <h2>Select a Date</h2>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
        />
      </div>

      <div className="matches-container">
        <h2>
          Matches on {selectedDate ? format(selectedDate, "MMMM dd, yyyy") : "No date selected"}
        </h2>

        {loading && <p>Loading matches...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && matches.length > 0 ? (
          <div className="leagues-matches">
            {Object.entries(matchesByLeague).map(([league, leagueMatches]) => (
              <div key={league} className="league-group">
                <h3 className="league-header">{league}</h3>
                <div className="matches-list">
                  {leagueMatches.map((match) => (
                    <MatchCard key={match.id} {...match} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading &&
          !error && (
            <div className="no-matches">
              <p>No matches found for this date</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CalendarView;
