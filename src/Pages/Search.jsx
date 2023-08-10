import React, { useState } from 'react';
import Card from '../components/Card';
import './CSS/serach.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMovie, setSearchMovie] = useState([]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      getMovies(searchTerm);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e); // Pass the event object to the handleSubmit function
    }
  };

  const getMovies = (query) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };

    fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, options)
      .then((response) => response.json())
      .then((data) => setSearchMovie(data.results))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="w-full my-5 flex justify-center items-center text-black">
        <input
          type="text"
          placeholder="Search...."
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="p-2 text-black rounded-md"
        />
        <button
          className="btn rounded-md bg-transparent hover:bg-gray-600 text-white mx-2 col-md-1 col-sm-2 p-2"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>

      <div className="reault flex flex-wrap justify-center items-center mb-16 gap-4">
        {searchMovie.length === 0 ? (
          <p>Please Enter a Movie Name</p>
        ) : (
          searchMovie.map((movie, index) => (
            <div key={index}>
              <Card movie={movie} />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Search;
