import React, { useEffect, useState } from 'react'
import "./CSS/MovieDetail.css"
import { useParams } from 'react-router-dom'
import { BiLinkAlt } from "react-icons/bi";
import YouTube from 'react-youtube';

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

    // useEffect(() => {
    //     getVideo()
    // }, [])

    // const getVideo = () => {
    //     const options = {
    //         method: 'GET',
    //         headers: {
    //             accept: 'application/json',
    //             Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2UzNWI2YWYwZDI5ZGIzNzkyNTVkMTI1MTExN2IxNSIsInN1YiI6IjY0YzJiMzk3MmYxYmUwMDE0ZWY2NmMxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Om1pvX6y-LD1RBgwalZweLx6hhFOTZJ4shnRsROs4SI'
    //         }
    //     };

    //     fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, options)
    //         .then(response => response.json())
    //         .then(video => setMovieVideo(video.results))
    //         .catch(err => console.error(err));
    // }

    // const opts = {
    //     height: '390',
    //     width: '640',
    //     playerVars: {
    //         autoplay: 0,
    //     },
    // };

    return (
        <>
            <div className="movie">
                <div className="movie_intro">
                    <img className='movie_img rounded-md' src={`https://image.tmdb.org/t/p/original${MovieDetail ? MovieDetail.backdrop_path : ""}`} alt="" />
                    <div className="movie_detail">
                        <div className="movie_detail_left">
                            <div className="movie_posterbox">
                                <img src={`https://image.tmdb.org/t/p/original${MovieDetail ? MovieDetail.poster_path : ""}`} alt="" className="movie_poster" />
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
                                    <span className="text-gray-500 pr-1">{MovieDetail ? MovieDetail.vote_average : ""}</span>
                                    <span className="movie_voteCount text-gray-500">
                                        {MovieDetail ? "(" + MovieDetail.vote_count + ") votes" : ""}
                                    </span>
                                </div>
                                <div className="movie_runtime">
                                    {MovieDetail ? MovieDetail.runtime + " mins" : ""}
                                </div>
                                <div className="movie_relaeseDate ">
                                    Release Date :<span className='pr-1 text-gray-500' >{MovieDetail ? MovieDetail.release_date : ""}</span>
                                </div>
                                <div className="movie_geners">
                                    Gener :
                                    {
                                        MovieDetail && MovieDetail.genres
                                            ?
                                            MovieDetail.genres.map((genre, index) => (
                                                <div div key={index}><span className="movie_genre p-1 text-gray-500"  id={genre.id}>{genre.name}</span></div>
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
                    <div className="movie_heading text-center font-medium text-[20px]">Usefull Links</div>
                    <div className="movie_links flex justify-evenly mb-5">
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
                    {/* <div className="movie_heading">Production Companies</div>
                    <div className="movie_production">
                        {
                            MovieDetail && MovieDetail.production_companies && MovieDetail.production_companies.map((company) => (
                                <>
                                    {
                                        company.logo_path
                                        &&
                                        <span className='production_company_img'>
                                            <img className='movie_productionComapany' src={"https://image.tmdb.org/t/p/original" + company.logo_path} alt="" />
                                            <span>{company.name}</span>
                                        </span>
                                    }
                                </>
                            ))
                        }
                    </div> */}
                </div>

            </div>


            {/* video player */}
            {/* <div className="yotube">
            <h1 className="title">TRAILER</h1>
                <YouTube videoId={id} opts={opts} />
            </div> */}

        </>
    )
}

export default MovieDetail
