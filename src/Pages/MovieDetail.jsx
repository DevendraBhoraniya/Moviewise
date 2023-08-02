import React, { useEffect, useState } from 'react'
import "./CSS/MovieDetail.css"
import { useParams } from 'react-router-dom'
import { BiLinkAlt } from "react-icons/bi";

const MovieDetail = () => {

    const [MovieDetail, setMovieDetail] = useState()
    const [MovieVideo, setMovieVideo] = useState()
    const { id } = useParams()

    useEffect(() => {
        getData()
        window.scrollTo(0, 0)
    }, []);



    const getData = () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
            .then(response => response.json())
            .then(data => setMovieDetail(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        getVideo()
    }, [])

    const getVideo = () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2UzNWI2YWYwZDI5ZGIzNzkyNTVkMTI1MTExN2IxNSIsInN1YiI6IjY0YzJiMzk3MmYxYmUwMDE0ZWY2NmMxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Om1pvX6y-LD1RBgwalZweLx6hhFOTZJ4shnRsROs4SI'
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, options)
            .then(response => response.json())
            .then(video => setMovieVideo(video.results[0]))
            .catch(err => console.error(err));
    }

    return (
        <>
            <div className="movie">
                <div className="movie_intro">
                    <img className='movie_img rounded-md' src={`https://image.tmdb.org/t/p/original${MovieDetail ? MovieDetail.backdrop_path : ""}`} alt="" />
                    <div className="movie_detail">
                        <div className="movie_detail_left">
                            <div className="movie_posterbox">
                                <img src={`https://image.tmdb.org/t/p/original${MovieDetail ? MovieDetail.poster_path : ""}`} alt="" className="movie_poster hidden md:block" />
                            </div>
                        </div>
                        <div className="movie_detail_right">
                            <div className="movive_detail_right_top">
                                <div className="movie_name">
                                    {MovieDetail ? MovieDetail.title : ""}
                                </div>
                                <div className="movie_tagline">
                                    {MovieDetail ? MovieDetail.tagline : ""}
                                </div>
                                <div className="movie_rating">
                                    Vote :
                                    <span className="text-gray-500 pl-1">{MovieDetail ? MovieDetail.vote_average : ""}</span>
                                    <span className="movie_voteCount text-gray-500">
                                        {MovieDetail ? "(" + MovieDetail.vote_count + ") votes" : ""}
                                    </span>
                                </div>
                                <div className="movie_runtime">
                                    {MovieDetail ? MovieDetail.runtime + " mins" : ""}
                                </div>
                                <div className="movie_relaeseDate ">
                                    Release Date :<span className='pl-1 text-gray-500' >{MovieDetail ? MovieDetail.release_date : ""}</span>
                                </div>
                                <div className="movie_geners">
                                    Gener :
                                    {
                                        MovieDetail && MovieDetail.genres
                                            ?
                                            MovieDetail.genres.map((genre, index) => (
                                                <div div key={index}><span className="movie_genre p-1 text-gray-500" id={genre.id}>{genre.name}</span></div>
                                            )) : ""
                                    }
                                </div>
                                <div className="movie_detail_right_bottom">
                                    <div className="overview font-semibold ">
                                        Overview
                                    </div>
                                    <div className="overview italic text-gray-500">
                                        {MovieDetail ? MovieDetail.overview : ""}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="movie_heading text-center font-medium text-[20px] ">Usefull Links</div>
                    <div className="movie_links flex justify-evenly mb-20">
                        {
                            MovieDetail && MovieDetail.homepage && <a href={MovieDetail.homepage} target="_blnak" style={{ textDecoration: "none" }}>
                                <p><span className='movie_homeButton movie_button flex flex-row gap-1 items-center font-medium text-[20px] bg-blue-900 rounded-md'>Home<BiLinkAlt /></span></p>
                            </a>
                        }
                        {
                            MovieDetail && MovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + MovieDetail.imdb_id} target="_blnak" style={{ textDecoration: "none" }}>
                                <p><span className='movie_ImdbButton movie_button flex flex-row gap-1 items-center text-[20px] font-medium text-black bg-yellow-500 rounded-md'>IMDb<BiLinkAlt /> </span></p>
                            </a>
                        }
                    </div>
                </div>

            </div>


            {/* video player */}
            <div className='flex flex-col justify-center items-center'>
                <h1 className="title mb-2 text-xl">TRAILER</h1>
                {MovieVideo && (
                    <>
                        <h2 className='text-lg mb-3 text-gray-500'>{MovieVideo.name}</h2>
                        <div className="video flex justify-center mb-44 md:mb-24">
                            <iframe
                            title={MovieVideo.name}
                            src={`https://www.youtube.com/embed/${MovieVideo.key}`}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            />
                        </div>
                    </>
                )}
            </div>

        </>
    )
}

export default MovieDetail
