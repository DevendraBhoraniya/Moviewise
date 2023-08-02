import React, { useEffect, useState } from 'react'
import './CSS/Home.css'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const Home = () => {

    const [popular, setPopular] = useState([])
    const [trending, setTrending] = useState([])
    const [isLoading, setIsLOading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLOading(false)
        }, 2000)
    }, []);


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

    const getTrending = () => {
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
            <div className="poster flex justify-center ">
                <Splide 
                    options={{
                        perPage: 1,
                        arrows: true,
                        gap: "5rem",
                        autoplay: 'play',
                        width: "90%",
                        hight : "90%",
                        type   : 'loop',
                    }}
                >
                    {popular.map((movie, index) => {
                        return (
                                <SplideSlide key={index}>
                                    <Link style={{ textDecoration: "none", color: "white", position: "relative" }} to={`/movie/${movie.id}`}>
                                        <div className="poster_img md:h-[550px] h-[300px] absolute z-[-1]">
                                            <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt="" />
                                        </div>
                                        <div className="posterImg_overlay pl-4 mt-[15%] md:p-20 p-8 bottom-0 h-[70%] flex flex-col w-[100%] justify-end items-start">
                                            <div className="posterImg_title md:font-black font-semibold  text-[2rem] md:text-[4rem] mb-[0.4rem] text-left ">
                                                {movie ? movie.title : ""}
                                            </div>
                                            <div className="posterImg_relasedate md:text-[2rem] text-[1.5rem] mb-4 ">
                                                {movie ? movie.release_date : ""}
                                                <span className='posterImg_rating ml-12 '>Rating : {movie ? movie.vote_average : ""}</span>
                                            </div>
                                            <div className="posterImg_Descripton italic font-[1rem] flex text-left md:w-[50%] w-[100%] ">
                                                {movie ? movie.overview : ""}
                                            </div>
                                        </div>
                                    </Link>
                                </SplideSlide>
                        );
                    })}
                </Splide>

            </div >

            {/* Trending */}
            { isLoading ?
                    (
                        <div className='animate-pulse  w-full flex justify-center mt-[15%]' >
                            <img src="logo.png" alt="Loading.." className='bg-gray-400 rounded-full p-4 h-[200px] w-[200px]' />
                        </div>
                    ) : (
                        <div className='mx-20 mb-5'>
                            <div className="text-3xl mt-10 mb-10 flex justify-start items-start ">
                                TRENDING
                            </div>
                            <div className="tending_list flex justify-center items-center flex-wrap gap-4 mb-20">
                                {
                                    trending.map((movie, index) => (
                                        <Card key={index} movie={movie} />
                                    ))
                                }
                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default Home