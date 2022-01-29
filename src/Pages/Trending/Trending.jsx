import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SingleContent } from '../../components/singleContent/SingleContent';



export const Trending = () => {

  const [content, setContent] = useState([]);

  const fetchTrending = async () => {

  const { data } = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=e555b12ddf56dc970b6d7235cf8f8c00`
  );

  setContent(data.results);
  
 
};



  useEffect(() => {
    
   fetchTrending();
    
  }, []);
  

  return (
      <div>
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

      </div>
  )
};
