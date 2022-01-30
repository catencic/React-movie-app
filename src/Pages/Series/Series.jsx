import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Genres } from '../../components/genres/Genres';

import { CustomPagnation } from '../../components/pagination/CustomPagnation';
import { SingleContent } from '../../components/singleContent/SingleContent';
import { useGenre } from '../../hooks/useGenre';



export const Series = () => {

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  const genreForURL = useGenre(selectedGenres);

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=e555b12ddf56dc970b6d7235cf8f8c00&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`
    );

    setContent(data.results);
    setNumOfPages(data.total_pages);


 

   
  }


  useEffect(() => {
    
    fetchSeries();

    return ()=>{
      setNumOfPages(10);
    }
    
  }, [page, genreForURL]);
  
  

  return (
    <div>
    <span className="pageTitle">Tv series</span>
    <Genres
    type="tv"
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
          media_type="tv"
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
