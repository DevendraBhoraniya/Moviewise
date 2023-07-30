import React, { useEffect, useState } from 'react'
import './CSS/Home.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const Home = () => {

    const [popular, setPopular] = useState([])
    const [trending , setTrending ] = useState([])

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        };

        fetch('https://api.themoviedb.org/3/movie/popular', options)
            .then(res => res.json())
            .then(data => setPopular(data.results))
    }, []);

    useEffect(() => {
        getTrending()
    }, []);

    const getTrending =() => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
          };
          
          fetch('https://api.themoviedb.org/3/trending/movie/week', options)
            .then(response => response.json())
            .then(data => setTrending(data.results))
            .catch(err => console.error(err));
    }

    return (
        <>
            <div className="poster">
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transition={3}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {
                        popular.map((movie, index) => (
                            <Link key={index} style={{ textDecoration: "none", color: "white" }} to={`/movie/${movie.id}`}>
                                <div className="poster_img md:h-[600px] h-[500px] ">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt="" />
                                </div>
                                <div className="posterImg_overlay absolute md:p-20 p-8 bottom-0 h-[70%] flex flex-col w-[100%] justify-end items-start">
                                    <div className="posterImg_title md:font-black text-[2.5rem] md:text-[4rem] mb-[0.4rem] text-left">
                                        {movie ? movie.title : ""}
                                    </div>
                                    <div className="posterImg_relasedate md:text-[2rem] text-[1.5rem] mb-4">
                                        {movie ? movie.release_date : ""}
                                        <span className='posterImg_rating ml-12'>Rating : {movie ? movie.vote_average : ""}
                                        </span>
                                    </div>
                                    <div className="posterImg_Descripton italic font-[1rem] flex text-left md:w-[50%] w-[100%]">
                                        {movie ? movie.overview : ""}
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </Carousel>
            </div>

            {/* Trending */}
            <div className='mx-20 mb-5'>
            <div className="text-3xl mt-10 mb-10 flex justify-start items-start ">
                TRENDING
            </div>
            <div className="tending_list flex justify-center items-center flex-wrap gap-4 mb-16">
                {
                    trending.map((movie,index) => (
                        <Card key={index} movie={movie} />
                    ))
                }
            </div>
            </div>

        </>
    )
}

export default Home