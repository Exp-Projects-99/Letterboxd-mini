import React from 'react';

const MovieListHeading = (props) => {
    return (
        <div className='col col-sm-3 p-2'>
            <h1>{props.title}</h1>
        </div>
    );
}

export default MovieListHeading;