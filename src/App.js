import { useState } from "react";
import { useMovies } from "./hooks/useMovies.jsx";
import { useLocalStorageState } from "./hooks/useLocalStorageState.jsx";
import WatchedMovieList from "./components/WatchedMovieList.jsx";
import WatchedSummary from "./components/WatchedSummary.jsx";
import SelectedMovie from "./components/SelectedMovie.jsx";
import MovieList from "./components/MovieList.jsx";
import Box from "./components/Box";
import Main from "./components/Main";
import Numresults from "./components/Numresults";
import Search from "./components/Search";
import Logo from "./components/Logo";
import NavBar from "./components/NavBar";
import ErrorMessage from "./components/ErrorMessage";
import Loader from "./components/Loader.jsx";

export const KEY = "f9f062c8";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");

  const [watched, setWatched] = useLocalStorageState([], "watch");

  const [selecteId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  useState();

  function handleSelectMovie(id) {
    setSelectedId((selecteId) => (id === selecteId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar movies={movies}>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Numresults movies={movies} />
      </NavBar>
      <Main movies={movies}>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          <>
            {selecteId ? (
              <SelectedMovie
                selecteId={selecteId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                watched={watched}
              />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMovieList
                  watched={watched}
                  onDeleteWatched={handleDeleteWatched}
                />
              </>
            )}
          </>
        </Box>
      </Main>
    </>
  );
}
