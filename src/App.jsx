import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Leagues from "./Pages/Leagues";
import LiveScores from "./Pages/LiveScores";
import CalendarView from "./Components/CalendarView";
import NotFound from "./Pages/NotFound";
import Footer from "./Components/Footer";
import Favorites from "./Pages/Favorites";
import MatchDetails from "./Pages/MatchDetails";
import TeamDetails from "./Pages/TeamDetails"; 
import LeagueDetails from "./Pages/LeagueDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leagues" element={<Leagues />} />
          <Route path="/live" element={<LiveScores />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/match/:id" element={<MatchDetails />} />
          <Route path="/team/:id" element={<TeamDetails />} />
          <Route path="/league/:id" element={<LeagueDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
