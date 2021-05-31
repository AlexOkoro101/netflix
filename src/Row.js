import React, { useEffect, useState } from 'react'
import axios from './axios'
import requests from './request';
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) {
    const [movies, setmovies] = useState([]);
    const [trailerUrl, settrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            // console.log(request)
            setmovies(request.data.results)
            return request;
        }
        fetchData();
        
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            //
            autoplay: 1
        },
    };

    const handleClick = (movie) => {
        if(trailerUrl) {
            settrailerUrl("")
        } else {
            movieTrailer(movie?.name || "")
            .then(url => {
                const urlParams = new URLSearchParams( new URL(url).search);
                settrailerUrl(urlParams.get('v'));
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map((movie) => (
                    <img 
                        key={movie.id} 
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name} 
                        onClick={() => handleClick(movie)}
                    />
                ))}
            </div>
           {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}></Youtube>}
        </div>
    )
}

export default Row

