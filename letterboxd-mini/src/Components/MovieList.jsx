import React from 'react';

const MovieList = (props) => {
    const TileFooter = props.tileFooter;
    return (
        <>
            {props.movies.map((movie, index) => (
                <div className='image-container d-flex justify-content-start m-3 movie-list-tile'>
                    <img src={movie.Poster} style={{ width: '170px', height: '250px'}} alt='movie'></img>
                    <div className='overlay d-flex align-items-center justify-content-center' onClick={() => props.onClick(movie)}>
                        <TileFooter />
                    </div>
                </div>
            ))}
        </>
    );
};

export default MovieList;