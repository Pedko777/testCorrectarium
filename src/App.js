import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from "./components/header/Header"
import TextCorrectionPage from './pages/textCorrectionPage/TextCorrectionPage';
import Footer from './components/footer/Footer';


const  App = () => {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <TextCorrectionPage />
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
