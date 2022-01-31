
import {
  Button,
  createTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { SingleContent } from "../../components/singleContent/SingleContent";


import './Search.css';
import { CustomPagnation } from "../../components/pagination/CustomPagnation";
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


export const Search = () => {

  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();

  const isLoading = useRef(true);

  const [content, setContent] = useState({
    data: [],
    loading: true,
  });

  const {data , loading} = content;


  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
  
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=e555b12ddf56dc970b6d7235cf8f8c00&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      
      setTimeout(() => {
        
        setContent({
          data: data.results,
          loading: false
        });
      }, 1000);
      setNumOfPages(data.total_pages);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    if(searchText){

      window.scroll(0, 0);
      fetchSearch();
    }
  }, [type, page]);


  return (
    <div>
    <ThemeProvider theme={darkTheme}>
      <div className="search">
        <TextField
          style={{ flex: 1 }}
          className="searchBox"
          label="Search"
          variant="filled"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          onClick={fetchSearch}
          variant="contained"
          style={{ marginLeft: 10 }}
        >
          <SearchIcon fontSize="large" />
        </Button>
      </div>
      <Tabs
        value={type}
        indicatorColor="primary"
        textColor="primary"
        onChange={(event, newValue) => {
          setType(newValue);
          setPage(1);
  
          
        }}
        style={{ paddingBottom: 5 }}
        aria-label="disabled tabs example"
      >
        <Tab style={{ width: "50%" }} label="Search Movies" />
        <Tab style={{ width: "50%" }} label="Search TV Series" />
      </Tabs>
    </ThemeProvider>
   { 
   (loading)
   ?  <Lottie options={defaultOptions} width={500} height={500}/>
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
            media_type={type ? "tv" : "movie"}
            vote_average={c.vote_average}
          />
        ))}
      {searchText &&
       ( !data && loading)  &&
        (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
    </div>
    {numOfPages > 1 && (
      <CustomPagnation setPage={setPage} numOfPages={numOfPages} setContent={setContent}/>
    )}
    </div>}
  </div>
  )
};
