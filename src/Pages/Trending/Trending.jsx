import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CustomPagnation } from '../../components/pagination/CustomPagnation';
import { SingleContent } from '../../components/singleContent/SingleContent';
import Lottie from 'react-lottie';
import loading from '../../assets/lotties/loading.json';

import './Trending.css'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loading,
  rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
  },
};


export const Trending = () => {
  
  const [page, setPage] = useState(1);

  const [content, setContent] = useState({
    data: [],
    loading: true
  });

  
 const {data , loading} = content;


 
 const fetchTrending = async () => {

 const { data } = await axios.get(
   `https://api.themoviedb.org/3/trending/all/day?api_key=e555b12ddf56dc970b6d7235cf8f8c00&page=${page}`
 );

 setTimeout(() => {
   
   setContent({
     data: data.results,
     loading: false
   });
}, 1000);
 

};
 



useEffect(() => {
  
  fetchTrending();
  
}, [page]);


  return (
    <>
         <span className="pageTitle">Trending Today</span>
     { (loading)
     ?  <Lottie options={defaultOptions} width={500} height={500}/>
     : 
     <div>
         <div className="trending">
           {
             data && data.map((c)=>(
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
           <CustomPagnation setPage={setPage} setContent={setContent}/>
      </div>}
    </>
  )
};
