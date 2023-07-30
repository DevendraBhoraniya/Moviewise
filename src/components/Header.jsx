import React from 'react';
import "./CSS/Header.css"
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="header-left">
            <Link to="/"><img className='header-icon' src="/logo.png" alt="" /></Link>
            <Link to="/movies/popular">Popular</Link>
            <Link to="/movies/top_rated">Top Rated</Link>
            <Link to="/movies/upcoming">Upcoming</Link>
            <Link to="/search">Search</Link>
        </div>
      </div>
    </>
  )
}

export default Header
