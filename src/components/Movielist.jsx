import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from './Card'
import "./CSS/Movielist.css"

const Movielist = () => {

    const [MovieList, setMovieList] = useState([])
    const { type } = useParams()
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);


    const getData = async (page) => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        };

        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${type ? type : 'popular'}?page=${page}`, options);
            const data = await response.json();
            setMovieList(data.results);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setMovieList("ERROR WHILE GETTING MOVIE")
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getData(currentPage)
    }, [type, currentPage])

    const NextPage = async () => {
        setCurrentPage((page) => page + 1);
        console.log("next")
    }

    const PreviousPage = async () => {
        setCurrentPage((page) => page - 1);
        console.log("prevPage")
    }


    return (
        <>
            <div className="movie_list">
                <h2 className="list_title font-[1.75rem] mt-10">
                    {(type ? type : "POPULAR").toUpperCase()}
                </h2>
                <div className="list_card flex flex-wrap justify-center gap-4 mb-16">
                    {isLoading ? ( 
                        <p>Loading...</p>
                    ) : (
                        MovieList.map((movie, index) => {
                            return <Card key={index} movie={movie} />;
                        })
                    )}
                </div>
                {/* <div className="flex gap-4 justify-evenly mt-5 ">
                    <button className={`border border-white bg-transparent hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ${currentPage === 1 ? "cursor-not-allowed" : ""}`} onClick={PreviousPage} disabled={currentPage === 1}>
                        &larr;
                    </button>
                    <p>Page: {currentPage}</p>
                    <button className={`border border-white bg-transparent hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ${MovieList.length === 0 ? "cursor-not-allowed" : ""}`} onClick={NextPage} disabled={setMovieList.length === 0}>
                        &rarr;
                    </button>
                </div> */}
            </div>
        </>
    )
}

export default Movielist