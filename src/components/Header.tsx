// Shared site header for the static portfolio.
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="topHeader">
      <div className="header-main">
        {/* Logo Section */}
        <div className="logo">
          <Link to="/">GLEWORKS</Link>
        </div>

        {/* Navigation Links */}
        <nav className="navigation">
          <Link to="/service">Service</Link>
          <Link to="/archive">Archive</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
