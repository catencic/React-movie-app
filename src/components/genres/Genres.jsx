

import { Chip } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect } from 'react';

export const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage,
    setContent
}) => {

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=e555b12ddf56dc970b6d7235cf8f8c00&language=en-US`
    );
    setGenres(data.genres);
   
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({}); 
    };
    
  }, []);

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
    setContent({ loading: true });
    
  };

  const handleRemove =  (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
    setContent({ loading: true });
  }


  return (
    <div style={{ padding: "6px 0" }}>
    {selectedGenres.map((genre) => (
      <Chip
        style={{ margin: 2 }}
        label={genre.name}
        key={genre.id}
        color="primary"
        clickable
        size="small"
        onDelete={() => handleRemove(genre)}
      />
    ))}
    {genres.map((genre) => (
      <Chip
        style={{ margin: 2 }}
        label={genre.name}
        key={genre.id}
        clickable
        size="small"
        onClick={() => handleAdd(genre)}
      />
    ))}
  </div>
  )
};
