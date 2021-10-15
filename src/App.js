
import Movie from './composants/Movie';

import React,{useEffect,useState} from "react";

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=01c35731a5ee918f014970082a0088b1&page=1";

const IMG_API = "https//image.tmdb.org/t/p/w1280";
const SEARCH_API = "https://api.themovidb.org/3/search/movie&api_key=01c35731a5ee918f014970082a0088b1&query";


function App() {
  const [movies,setMovies]=useState([]);

  useEffect(()=> {
    fetch(FEATURED_API).then(res => res.json())
    .then(data => {
      console.log(data);
      setMovies(data);
    });
  },[]);
  return <div>
      {
        movies.length > 0 && movies.map((movie) => (
          <Movie key={movie.id} data={movie} />
        ))}
    </div>;

}

export default App;
