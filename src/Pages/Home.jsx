import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import "./CSS/Home.css"
import '@splidejs/splide/dist/css/splide.min.css';
import '@splidejs/react-splide/css';

const Home = () => {

  const [popular, setPopular] = useState([]);
  const [trending, setTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const fetchMovies = (url) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        if (url.includes('popular')) {
          setPopular(data.results);
        } else if (url.includes('trending')) {
          setTrending(data.results);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchMovies('https://api.themoviedb.org/3/movie/popular');
    fetchMovies('https://api.themoviedb.org/3/trending/movie/week');
  }, []);


  return (
    <>
      {/* Popular Movies */}
      <div className="poster flex justify-center mt-[2%]">
        <Splide
          options={{
            perPage: 1,
            arrows: false,
            autoplay: 'play',
            width: '90%',
            hight: '100%',
            type: 'loop',

          }}
        >
          {popular.map((movie, index) => {
            const { id, backdrop_path, title, release_date, vote_average, overview, tagline } = movie;
            return (
              <SplideSlide key={index}>
                <Link style={{ textDecoration: 'none', color: 'white', position: 'relative' }} to={`/movie/${id}`}>
                  {/* poster img  */}
                  <img
                    src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
                    alt=""
                    className="poster_img h-fit w-fit absolute z-[-1] "
                  />

                  <div className="posterImg_overlay pl-4 mt-[15%] md:p-20 p-8 bottom-0 h-[70%] flex flex-col w-[100%] justify-end items-start">
                    <div className="posterImg_title md:font-black font-semibold text-[1rem] md:text-[4rem] mb-[0.4rem] text-left">
                      {title}
                    </div>
                    <div className="posterImg_relasedate md:text-[2rem] text-[1rem] mb-4">
                      {release_date}
                      <span className="posterImg_rating md:ml-12 ml-5">Rating : {vote_average}</span>
                    </div>
                    <div className="posterImg_Descripton italic text-[1rem]  text-left md:w-[50%] w-[100%] hidden md:block">
                      {overview}
                    </div>
                    <div className="tagline">
                      {tagline}
                    </div>
                  </div>
                </Link>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>

      {/* Trending */}
      <div className="mx-20 mb-5">
        <div className="text-3xl mt-10 mb-10 flex justify-center items-start">TRENDING</div>
        <div className="tending_list flex flex-wrap gap-5 w-full justify-start mb-20">
          {trending.map((movie, index) => (
            <Card key={index} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;