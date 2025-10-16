import React from 'react'
import {QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from './Components/Navbar';
import Home from "./Pages/Home"
import Leagues from "./Pages/Leagues"
import LiveScores from "./Pages/LiveScores"
import Contact from "./Pages/Contact"
import NotFound from "./Pages/NotFound"
import Footer from "./Components/Footer"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
<BrowserRouter>
<Navbar/>
<main>
  <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/leagues" element={<Leagues />} />
     <Route path="/live" element={<LiveScores />} />
     <Route path="/contact" element={<Contact />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
  </Routes>
</main>
<Footer/>
</BrowserRouter>
  </QueryClientProvider>
);

export default App