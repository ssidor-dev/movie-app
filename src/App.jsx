import Main from "./components/ui/Main";
import { useState } from "react";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import NavBar from "./components/navbar/NavBar";
import Search from "./components/navbar/Search";
import Logo from "./components/navbar/Logo";
import NumResults from "./components/navbar/NumResults";
import MovieDetail from "./components/MovieDetail";
import MovieList from "./components/MovieList";
import WatchedSummery from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import Box from "./components/ui/Box";
import Loader from "./components/ui/Loader";
import ErrorMessage from "./components/ui/ErrorMesage";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {

    setSelectedId((curSelectedId) => (id === curSelectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatchedMovie(movie) {
    setWatched((curWatched) => [...curWatched, movie]);
    
  }

  function handleDeleteWatched(id) {
    setWatched((curWatched) =>
      curWatched.filter((movie) => movie.imdbID !== id)
    );
  }



  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList  onSelectMovie={handleSelectMovie} movies={movies} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetail
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummery watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
