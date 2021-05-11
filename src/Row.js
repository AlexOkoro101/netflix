import React, { useEffect, useState } from 'react'
import axios from './axios'
import requests from './request';
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl}) {
    const [movies, setmovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            console.log(request)
            setmovies(request.data.results)
            return request;
        }
        fetchData();
        
    }, [fetchUrl]);

    console.log(movies)

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map((movie) => (
                    <img key={movie.id} className="row_poster" src={`${base_url}${movie.poster_path}`} alt={movie.name} />
                ))}
            </div>

        </div>
    )
}

export default Row

