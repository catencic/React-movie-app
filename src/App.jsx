
import { Container } from '@material-ui/core';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Header } from './components/header/Header';
import { MainNav } from "./components/MainNav";
import { Trending } from "./Pages/Trending/Trending";
import { Movies } from "./Pages/Movies/Movies";
import { Series } from "./Pages/Series/Series";
import { Search } from "./Pages/Search/Search";

import './App.css'



export const App = () => {
  return (
    <BrowserRouter > 
    <Header />
    <div className="app">
      <Container>
        <Routes>
          <Route path="/" element={<Trending/>}  />
          <Route path="/movies" element={<Movies/>} />
          <Route path="/series" element={<Series/>} />
          <Route path="/search" element={<Search/>} />
        </Routes>
      </Container>
    </div>
    <MainNav />
  </BrowserRouter>
  )
};
