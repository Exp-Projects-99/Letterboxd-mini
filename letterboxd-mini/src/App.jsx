import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import MovieList from "./Components/MovieList";
import SearchInput from "./Components/SearchInput";
import MovieListHeading from "./Components/MovieListHeading";
import AddFavourite from "./Components/AddFavourite";
import RemoveFavourite from "./Components/RemoveFavourite";
import LoginComponent from "./Components/Login";
import RegisterComponent from "./Components/Register";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [favourites, setFavourites] = useState([]);
  const [loginOpen, setLoginOpen] = useState(false);


  const getMovieRequest = async (search) => {
      const urlSearch = encodeURIComponent(search);
      const url = `http://www.omdbapi.com/?s=${urlSearch}&apikey=e7203cec`;
      const response = await fetch(url);
      const responseJson = await response.json();
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
          <div className='row mt-4 mb-4'>
              <MovieListHeading title={'Letterboxd Mini'} />
              <div className='container' style={{ display: 'inline-flex', flexDirection: 'column', position: 'relative', width: '613px', paddingTop: '8px' }}>
                  <button
                      type="button"
                      className='btn btn-outline-primary'
                      style={{ marginLeft: 'auto', marginBottom: '10px' }}
                      onClick={() => setLoginOpen(!loginOpen)}
                      aria-controls='loginRow'>
                      +Log in
                  </button>
                  {loginOpen && (<LoginComponent />)}
              </div>
              <RegisterComponent/>
              <SearchInput inputValue={search} setSearch={setSearch} />
          </div>
          <h2 style={{color: '#FFEEDB', marginLeft: '50px'}}>Search Results</h2>
          <div className='row movie-list'>
              <MovieList movies={movies} tileFooter={AddFavourite} onClick={addToFavouritesFn}/>
          </div>
          {favourites.length > 0 && (
              <>
                  <h2 style={{color: '#ff785a', marginLeft: '50px', marginTop: '20px' }}>Favourites</h2>
                  <div className='row movie-list'>
                      <MovieList movies={favourites} tileFooter={RemoveFavourite} onClick={removeFromFavouritesFn}/>
                  </div>
              </>
          )}
      </div>
  );
};

export default App;