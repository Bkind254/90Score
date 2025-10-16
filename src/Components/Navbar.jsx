import React from 'react';
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";
import logo from "../assets/Logo.png" // replace with your actual logo path

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="90Scores Logo" className="logo-img" />
          <span className="logo-text">90Score</span>
        </Link>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/leagues">Leagues</Link></li>
          <li><Link to="/live">Live</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
