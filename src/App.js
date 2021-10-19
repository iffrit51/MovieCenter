import Movie from './composants/Movie';

import React, { useEffect, useState } from "react";

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a738af5d7f7482f20997e6be8d8df8f9&page=1";

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=a738af5d7f7482f20997e6be8d8df8f9&language=fr-FR&query=";
var flattened = [];
let flattenedTest = [];

function App() {
  const [movies, setMovies] = useState([]);
  const handleFileChange = (e) => {

    var files = e.target.files;


    var textreplaced = "";

    for (let i = 0; i < files.length; i++) {
      if (files[i].name.split('.').pop() === "mp4" || files[i].name.split('.').pop() === "avi" || files[i].name.split('.').pop() === "mkv") {
        textreplaced = files[i].name.replace("_", " ").toLowerCase();
        textreplaced = textreplaced.split('.').shift();
        
        console.log(SEARCH_API + textreplaced);
        fetch(SEARCH_API + textreplaced).then(res => res.json())
          .then((data) => {
            if(data.results.length !== 0)
            {
            flattened.push(data.results.slice(1,2));
              if(flattenedTest.length<=1)
              {
                flattenedTest.push(flattened)
                console.log(flattenedTest);
                setMovies(flattenedTest);
              }
            }
          },
          (error) => {

          }
          );
      }
    }
  };
  useEffect(() => {
  }, []);
  return (
<>
      <header>
        <input id="picker" type="file" directory="" webkitdirectory=""
          onChange={handleFileChange} className="video" />
      </header>
          <div className="movie-container">
      {movies.length > 0 && movies.map((movie) =>
        <Movie key={movie.id} {...movie} />)}
    </div>
    </>
  );

}

export default App;