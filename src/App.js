import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom'
import Router from './router/routers';
import './App.css';
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";
import Banner from "./components/Banner/index";
function App() {
  return (
    <BrowserRouter>   
      <Header/>
      <Banner/>
      <Router/>

      <Footer/>
    </BrowserRouter>
  );
}
export default App;