import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Genres } from '../../components/genres/Genres';


import { CustomPagnation } from '../../components/pagination/CustomPagnation';
import { SingleContent } from '../../components/singleContent/SingleContent';
import { getGenre } from '../../helper/getGenre';

import Lottie from 'react-lottie';
import loading from '../../assets/lotties/loading.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loading,
  rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
  },
};




export const Movies = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const genreforURL = getGenre(selectedGenres);

  const [content, setContent] = useState({
    data: [],
    loading: true
  });

  
 const {data , loading} = content;

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=e555b12ddf56dc970b6d7235cf8f8c00&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setTimeout(() => {
   
      setContent({
        data: data.results,
        loading: false
      });
   }, 1000);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
   
  }, [genreforURL, page]);

  return (
    <div>
      <span className="pageTitle">Discover Movies</span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
        setContent={setContent}
      />
     { 
       (loading)
       ? 
       <Lottie options={defaultOptions} width={500} height={500}/> 
       :
     <div>
      <div className="trending">
        {data &&
          data.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagnation setPage={setPage} numOfPages={numOfPages} setContent={setContent}/>
      )}
      </div>
      }
    </div>
  );
};

