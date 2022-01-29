import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Genres } from '../../components/genres/Genres';

import { CustomPagnation } from '../../components/pagination/CustomPagnation';
import { SingleContent } from '../../components/singleContent/SingleContent';
import { useGenre } from '../../hooks/useGenre';



export const Movies = () => {

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  const genreForURL = useGenre(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=e555b12ddf56dc970b6d7235cf8f8c00&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`
    );

    setContent(data.results);
    setNumOfPages(data.total_pages);

 

   
  }


  useEffect(() => {
    
    fetchMovies();

    return ()=>{
      setNumOfPages(10);
    }
    
  }, [page, genreForURL]);
  
  

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

    />
    <div className="trending">
      {
        content && content.map((c)=>(
          <SingleContent
          key={c.id}
          id={c.id}
          poster={c.poster_path}
          title={c.title || c.name}
          date={c.first_air_date || c.release_date}
          media_type={c.media_type}
          vote_average={c.vote_average}
          //{...c}
          />
        ))
      }

    </div>
      {numOfPages > 1 && 
      <CustomPagnation setPage={setPage} numOfPages={numOfPages}/>
      }
 </div>
  )
};
