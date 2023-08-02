import React, { useEffect, useState } from 'react'
import "./CSS/Card.css"
import { Link } from 'react-router-dom'

const Card = ({ movie }) => {

    const [isLoading, setIsLOading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLOading(false)
        }, 2000)
    }, []);

    return (
        <>
            {isLoading ?
                <div className="card">
                        
                </div>
                :
                <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
                    <div className="card">
                        <img className='card_img bg-gray-600 text-black text-center text-xl w-full font-medium' src={`https://image.tmdb.org/t/p/original${movie && movie.poster_path}`} alt="No Image found" />
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
            }
        </>
    )
}

export default Card
