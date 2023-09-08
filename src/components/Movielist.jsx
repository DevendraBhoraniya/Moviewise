import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';
import './CSS/Movielist.css';
import { options } from '../API/TMDBapi';

const Movielist = () => {
    const [MovieList, setMovieList] = useState([]);
    const { type } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [showLoading, setShowLoading] = useState(false);

    const getData = async (page) => {
        try {
            setShowLoading(true);
            const response = await fetch(`https://api.themoviedb.org/3/movie/${type ? type : 'popular'}?page=${page}`, options);
            const data = await response.json();
            setMovieList(data.results);
            setIsLoading(false);
            setShowLoading(false);
        } catch (err) {
            console.error(err);
            setMovieList("ERROR WHILE GETTING MOVIE");
            setIsLoading(false);
            setShowLoading(false);
        }
    };

    useEffect(() => {
        getData(currentPage);
    }, [type, currentPage]);

    const NextPage = async () => {
        setCurrentPage((page) => page + 1);
    };

    const PreviousPage = async () => {
        setCurrentPage((page) => page - 1);
    };

    return (
        <>
            <div className="movie_list">
                <h2 className="list_title font-[1.75rem] mt-10">
                    {(type ? type : 'POPULAR').toUpperCase()}
                </h2>
                {/* pagination button  */}
                <div className="flex gap-4 justify-evenly mt-5 mb-7 ">
                    <button className={`border border-white bg-transparent hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ${currentPage === 1 ? "cursor-not-allowed" : ""}`} onClick={PreviousPage} disabled={currentPage === 1}>
                        &larr;
                    </button>
                    <p>Page: {currentPage}</p>
                    <button className={`border border-white bg-transparent hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ${MovieList.length === 0 ? "cursor-not-allowed" : ""}`} onClick={NextPage} disabled={setMovieList.length === 0}>
                        &rarr;
                    </button>
                </div>

                {/* actuola movies  */}
                <div className="list_card flex flex-wrap gap-5 justify-center items-start mb-16">
                    {isLoading || showLoading ? (
                        <div className="animate-pulse w-full flex justify-center mt-[15%]">
                            <img src="/logo.png" alt="Loading..." className="bg-gray-400 rounded-full p-4 h-[200px] w-[200px]" />
                        </div>
                    ) : (
                        MovieList.map((movie, index) => {
                            return <Card key={index} movie={movie} />;
                        })
                    )}
                </div>
                <div className="flex gap-4 justify-evenly mt-5 mb-7 ">
                    <button className={`border border-white bg-transparent hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ${currentPage === 1 ? "cursor-not-allowed" : ""}`} onClick={PreviousPage} disabled={currentPage === 1}>
                        &larr;
                    </button>
                    <p>Page: {currentPage}</p>
                    <button className={`border border-white bg-transparent hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ${MovieList.length === 0 ? "cursor-not-allowed" : ""}`} onClick={NextPage} disabled={setMovieList.length === 0}>
                        &rarr;
                    </button>
                </div>
            </div>
        </>
    )
}

export default Movielist
