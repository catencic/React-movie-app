import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CustomPagnation } from '../../components/pagination/CustomPagnation';
import { SingleContent } from '../../components/singleContent/SingleContent';
import './Trending.css'


export const Trending = () => {

  const [content, setContent] = useState([]);

  const [page, setPage] = useState(1);

  const fetchTrending = async () => {

  const { data } = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=e555b12ddf56dc970b6d7235cf8f8c00&page=${page}`
  );

  setContent(data.results);
  
 
};



  useEffect(() => {
    
   fetchTrending();
    
  }, [page]);
  

  return (
      <div>
         <span className="pageTitle">Trending Today</span>
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
           <CustomPagnation setPage={setPage}/>
      </div>
  )
};
