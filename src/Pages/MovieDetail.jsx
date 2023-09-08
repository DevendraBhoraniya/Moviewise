import React, { useEffect, useState } from 'react'
import "./CSS/MovieDetail.css"
import { Link, useParams } from 'react-router-dom'
import { BiLinkAlt } from "react-icons/bi";
import Card from '../components/Card';
import { options } from '../API/TMDBapi';

const MovieDetail = () => {

    const [MovieDetail, setMovieDetail] = useState()
    const [MovieVideo, setMovieVideo] = useState()
    const [similar, setSimilar] = useState()
    const [moviecast, setMovieCast] = useState()
    const { id } = useParams()
    const [isLoading, setIsLOading] = useState(true)


    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
            .then(response => response.json())
            .then(data => {
                setMovieDetail(data);
                setIsLOading(false);
            })
            .catch(err => console.error(err));
    };
    // to get video 
    const getVideo = () => {

        fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, options)
            .then(response => response.json())
            .then(video => setMovieVideo(video.results[0]))
            .catch(err => console.error(err));
    }

    // get casts
    const getCast = () => {

        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
            .then(response => response.json())
            .then(cast => setMovieCast(cast.cast))
            .catch(err => console.error(err));
    }



    // to get similar 
    const getSimilar = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/similar?language=en&page=1`, options)
            .then(response => response.json())
            .then(similarMovie => setSimilar(similarMovie.results))
            .catch(err => console.error(err));
    }

    // to get movie data
    useEffect(() => {
        getData()
        window.scrollTo(0, 0)
    }, []);

    // get moive video
    useEffect(() => {
        getVideo()
    }, [])

    //get casr members
    useEffect(() => {
        getCast()
    }, [])

    //get similars movies 
    useEffect(() => {
        getSimilar()
    }, [])

    return (
        <>
            {isLoading ?
                (
                    <div className='animate-pulse  w-full flex justify-center mt-[15%]' >
                        <img src="/logo.png" alt="Loading..." className='bg-gray-400 rounded-full p-4 h-[200px] w-[200px]' />
                    </div>
                ) : (
                    <div className='ALL my-[3%]'>
                        <div className="movie">
                            <div className="movie_intro">
                                <img 
                                src={`https://image.tmdb.org/t/p/original${MovieDetail ? MovieDetail.backdrop_path : ""}`} 
                                alt="" 
                                loading='lazy'    
                                className='movie_img rounded-md' 
                                />
                                <div className="movie_detail">
                                    <div className="movie_detail_left">
                                        <div className="movie_posterbox">
                                            <img 
                                            src={`https://image.tmdb.org/t/p/original${MovieDetail ? MovieDetail.poster_path : ""}`} 
                                            alt=""
                                            loading='lazy' 
                                            className="movie_poster hidden md:block" />
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
                                            <div className="movie_geners flex">
                                                Gener :
                                                {
                                                    MovieDetail && MovieDetail.genres
                                                        ?
                                                        MovieDetail.genres.map((genre, index) => (
                                                            <div key={index}><span className="movie_genre p-1 text-gray-500" id={genre.id}>{genre.name}</span></div>
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

                        {/* Cast */}
                        <div className='font-sans text-white' >
                            <div className='text-center w-ful text-lg '>Cast Members </div>
                            <div className="castmain flex flex-row gap-5 overflow-x-scroll mx-[5%]">
                                {moviecast && moviecast.map((cast, index) => (
                                    <div key={index} className="cast_card flex flex-row justify-center items-center p-5 gap-5 w-[600px] border text-center text-[5px] rounded-xl my-[1%]">
                                        <img 
                                        src={`https://image.tmdb.org/t/p/original${cast ? cast.profile_path : ""}`} 
                                        alt='no image' 
                                        loading='lazy'
                                        className='rounded-full w-[80px] object-contain ' />
                                        <div className='text-center w-[300px]'>
                                            <p >Charecter Played :<span className='ml-1 text-gray-400'>{cast ? cast.character : ""}</span></p>
                                            <p>Name :<span className='ml-1 text-gray-400'>{cast ? cast.name : ""}</span></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* video player */}
                        <div className='flex flex-col justify-center items-center'>
                            <h1 className="title mb-2 text-xl">Video</h1>
                            {MovieVideo && (
                                <div>
                                    <h2 className='text-lg mb-3 flex justify-center items-center text-gray-500'>{MovieVideo.name}</h2>
                                    <div className="aspect-video flex justify-center mb-20 md:mb-24">
                                        <iframe
                                            title={MovieVideo.name}
                                            src={`https://www.youtube.com/embed/${MovieVideo.key}`}
                                            allow="autoplay; encrypted-media"
                                            allowFullScreen
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* similar */}
                        {/* <div className='mb-[14%]'>
                            <div className="title text-center w-ful text-lg ">Similar</div>
                            <div className="similar flex mx-[5%]  flex-row  overflow-x-scroll">
                                {similar && similar.map((similar, index) => (
                                    <Link to={`/movie/${similar.id}`}>
                                        <Card key={index} movie={similar} />
                                    </Link>
                                ))}
                            </div>
                        </div> */}
                    </div>
                )}
        </>
    )
}

export default MovieDetail
