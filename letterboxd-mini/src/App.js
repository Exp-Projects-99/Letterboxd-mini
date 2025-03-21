import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from "./Components/MovieList";
import SearchInput from "./Components/SearchInput";
import MovieListHeading from "./Components/MovieListHeading";
import AddFavourite from "./Components/AddFavourite";
import RemoveFavourite from "./Components/RemoveFavourite";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async (search) => {
      const urlSearch = encodeURIComponent(search);
      const url = `http://www.omdbapi.com/?s=${urlSearch}&apikey=e7203cec`;
      const response = await fetch(url);
      const responseJson = await response.json();
      console.log(responseJson);
      if(responseJson.Search){
          setMovies(responseJson.Search)
      }
  }

  useEffect(() => {
      getMovieRequest(search)
  }, [search]);

  const addToFavouritesFn = (movie) => {
      const newFavourite = [...favourites, movie];
      setFavourites(newFavourite);
  }

  const removeFromFavouritesFn = (movie) => {
      console.log(movie)
      const newFavourite = favourites.filter((item) => item.imdbID !== movie.imdbID);
      console.log(newFavourite);
      setFavourites(newFavourite);
  }

  return (
      <div className='container-fluid movie-app'>
          <div className='row d-flex align-items-center mt-4 mb-4'>
              <MovieListHeading title={'Letterboxd Mini'} />
              <SearchInput inputValue={search} setSearch={setSearch} />
          </div>
          <h2 style={{ color: '#FFEEDB', marginLeft: '50px' }}>Search Results</h2>
          <div className='row movie-list'>
              <MovieList movies={movies} tileFooter={AddFavourite} onClick={addToFavouritesFn}/>
          </div>
          {favourites.length > 0 && (
              <>
                  <h2 style={{ color: '#F05D5E', marginLeft: '50px' }}>Favourites</h2>
                  <div className='row movie-list'>
                      <MovieList movies={favourites} tileFooter={RemoveFavourite} onClick={removeFromFavouritesFn}/>
                  </div>
              </>
          )}
      </div>
  );
};

export default App;