import Movie from './composants/Movie';

import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=a738af5d7f7482f20997e6be8d8df8f9&language=fr-FR&query=";
//const PATH_VIDEO = "";


var d = [];

function App() {
  const [movies, setMovies] = useState([]);
  const [videoFilePath, setVideoFilePath] = useState(null);

  const handleClick = (poster) => {
      console.log(poster);
      var lien = poster.target.getAttribute("lien");
      console.log(URL.createObjectURL(lien));
      setVideoFilePath(URL.createObjectURL(lien));
  };

  const handleFileChange = (e) => {
    var files = e.target.files;
    fetchMovies(files);
  };

 function fetchMovies(files) {
    var textreplaced = "";

    for (let i = 0; i < files.length; i++) {
      if (files[i].name.split('.').pop() === "mp4" || files[i].name.split('.').pop() === "avi" || files[i].name.split('.').pop() === "mkv") {
        textreplaced = files[i].name.replace("_", " ").toLowerCase();
        textreplaced = textreplaced.split('.').shift();

        fetch(SEARCH_API + textreplaced).then(res => res.json())
          .then((data) => {         
            if(data.results.length !== 0 && data.results !== undefined)
            {
                d[i] = data.results.slice(1,2)[0];
                d[i].lien = files[i].webkitRelativePath;
            }
          },);
      }
    } 
    setMovies(d);
  }
  useEffect(() => {
    
  }, []);
  return (
<>
      <header>
        <input id="picker" type="file" directory="" webkitdirectory=""
          onChange={handleFileChange} className="video" />
      </header>
          <div className="movie-container" onClick={handleClick} >
      {movies.length > 0 && movies.map((movie) =>
        <Movie key={movie.id} {...movie} />)}
    </div>
    <footer>
    { <ReactPlayer id="reactPlayerOne" url={videoFilePath} width="100%" height="100%" controls={true} /> }
    </footer>
    </>
  );

}

export default App;