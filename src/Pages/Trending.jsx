import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


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
      {/* sliders */}
      <div className='mb-16' >
        <Swiper
          modules={[Pagination, EffectFade ]}
          spaceBetween={25}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          effect='fade'
        >
          {popular.map((movie, index) => {
            const { id, backdrop_path, title, release_date, vote_average, tagline } = movie;
            return (

              <SwiperSlide key={index} >
                <div className='relative aspect-video h-[200px] md:h-[350px] w-full bg-gradient-to-r from-black to-transparent  '  >
                  <Link style={{ textDecoration: 'none', color: 'white', }} to={`/movie/${id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
                      alt=""
                      loading='lazy'
                      className=" object-cover absolute mix-blend-overlay h-[200px] md:h-[350px] w-full "
                    />
                    <div className="absolute pl-2 mt-[15%] md:p-20 p-8 bottom-0 h-[70%] flex flex-col w-[100%] justify-end items-start">
                      <div className=" md:font-black font-semibold text-[1rem] md:text-[2rem] mb-[0.4rem] text-left  ">
                        {title}
                      </div>
                      <span className=" md:text-[2rem] text-[1rem] mb-1 text-gray-400 ">{release_date}</span>
                      <span className="md:text-[1.5rem] text-[1rem] text-gray-400 ">Rating : {vote_average}</span>
                      <div className="italic text-[1rem]  text-left md:w-[50%] w-[100%] hidden md:block text-gray-400 ">
                        {movie ? movie.overview.slice(0, 190) + "......." : ""}
                      </div>
                      <div className="tagline">
                        {tagline}
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            )})}
        </Swiper>
      </div>

      {/* Trending */}
      <div className="px-2  w-full ">
        <div className="text-3xl mt-10 mb-10 flex justify-center items-start">TRENDING</div>
        <div className="tending_list flex flex-wrap gap-5 w-full justify-center mb-20">
          {trending.map((movie, index) => (
            <Card key={index} movie={movie} />
          ))}
        </div>
      </div>


    </>
  );
};

export default Home;