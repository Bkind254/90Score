// src/Components/CalendarView.jsx
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

  const fetchMatchesForDate = async (date) => {
    try {
      setLoading(true);
      setError(null);
      const formattedDate = format(date, "yyyy-MM-dd");
      const response = await fetch(
        `/.netlify/functions/football?endpoint=${encodeURIComponent(`/fixtures?date=${formattedDate}`)}`
      );
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      // ✅ Keep raw fixture objects so MatchCard works fully
      setMatches(Array.isArray(data.response) ? data.response : []);
    } catch (err) {
      console.error("Error fetching matches:", err);
      setError("Failed to load matches. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatchesForDate(selectedDate);
  }, [selectedDate]);

  // Group raw fixtures by league name
  const matchesByLeague = matches.reduce((acc, fixture) => {
    const league = fixture.league?.name || "Other";
    if (!acc[league]) acc[league] = [];
    acc[league].push(fixture);
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
            {Object.entries(matchesByLeague).map(([league, leagueFixtures]) => (
              <div key={league} className="league-group">
                <h3 className="league-header">{league}</h3>
                <div className="matches-list">
                  {/* ✅ Pass full fixture object — enables team navigation & all features */}
                  {leagueFixtures.map((fixture) => (
                    <MatchCard key={fixture.fixture.id} fixture={fixture} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && !error && (
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