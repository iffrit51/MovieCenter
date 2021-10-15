
import Movie from './composants/Movie';

import React, { useEffect, useState } from "react";

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a738af5d7f7482f20997e6be8d8df8f9&page=1";


const SEARCH_API = "https://api.themovidb.org/3/search/movie&api_key=a738af5d7f7482f20997e6be8d8df8f9&query";



const handleFileChange = event => {
  var files = event.target.files;
  var flattened = [];
  for (let i = 0; i < files.length; i++) {
    if (files[i].split('.').pop() == "jpg") {
      flattened.push(files[i].name);
      //list.innerHTML += '<br>' + file.webkitRelativePath
    }
  }
  console.log(flattened);
};


function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(FEATURED_API).then(res => res.json())
      .then(data => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);
  return (
    <div className="movie-container">
      <header>
        <input id="picker" type="file" directory="" webkitdirectory=""
          onChange={handleFileChange} />
      </header>
      {movies.length > 0 && movies.map((movie) =>
        <Movie key={movie.id} {...movie} />)}
    </div>
  );

}

export default App;
