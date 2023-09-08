import React, { useEffect, useState } from 'react'
import "./CSS/Card.css"
import { Link } from 'react-router-dom'


const Card = ({ movie }) => {

    const [isLoading, setIsLoading] = useState(true)

    const handleImageLoad = () => {
        setIsLoading(false);
    };


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, []);

    return (
        <>
            {/* desktop Card */}
            <div className='hidden md:block' >
                {isLoading ?
                    (
                        <div className="md:card  bg-gray-600 animate-pulse" />
                    )
                    : (
                        <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
                            <div className="card">
                                <img className='card_img bg-gray-600 text-black text-center flex justify-center text-xl w-full h-[300px] font-medium' src={`https://image.tmdb.org/t/p/original${movie && movie.poster_path}`}
                                    alt="No Image found"
                                    onLoad={handleImageLoad}
                                />
                                <div className="card_overlay w-full">
                                    <div className="card_title">
                                        {movie ? movie.title : ""}
                                    </div>
                                    <div className="card_realesdate">
                                        {movie ? movie.release_date : ""}
                                        <span className='card_rating'>Vote : {movie ? movie.vote_average : ""}
                                        </span>
                                    </div>
                                    <div className="card_Descripton">
                                        {movie ? movie.overview.slice(0, 100) + "..." : ""}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )}
            </div>

            {/* mobile card */}
            <div className='block md:hidden' >
                <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
                    <div className='flex flex-row items-center gap-2' >
                        <img
                            src={`https://image.tmdb.org/t/p/original${movie && movie.poster_path}`}
                            alt="No Image found"
                            loading='lazy'
                            className='h-24 object-cover'
                        />

                        <div className='flex flex-col' >
                            <span className='w-[100%] font-mono font-semibold ' >{movie ? movie.title : ""}</span>
                            <div className='text-gray-400' >
                                <span>{movie ? movie.release_date : ""}</span>
                                <span className='pl-2' >Vote : {movie ? movie.vote_average : ""}</span>
                            </div>
                            <span className='text-gray-500' >{movie ? movie.overview.slice(0, 100) + "..." : ""}</span>
                        </div>
                    </div>
                </Link>
                <div className='w-[100%] border h-0 mt-2' />
            </div>

        </>
    )
}

export default Card
