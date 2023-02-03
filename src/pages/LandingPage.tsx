import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Header from '../components/Header';


//import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import des modules dasn swiper
import { Navigation, Pagination } from 'swiper';
import { ProgramType } from '../models/Program';
import ThumbnailEvent from '../components/ThumbnailProgram';
import ThumbnailProgram from '../components/ThumbnailProgram';
import axios from 'axios';
import './LandingPage.css';

let listProgram;


const LandingPage = () => {
  const [listPrograms, setListPrograms] = useState<ProgramType[]>([]);
  console.log ("listprogram", listPrograms)

useEffect(() => {
    axios
      .get("http://localhost:8080/api/programs  ")
      .then((res) => {
        listProgram = res.data;
        setListPrograms(listProgram);
        console.log("---------------listProgram", listProgram);

      })
      .catch((error) => {
        console.log(error);
      });},[])


  return (
    <div className='landing-page'>
      <Header />
      <section className='section-slogan'>
        <div className='photo-bandeau'>
          <div className='text-slogan'>LET'S DO IT</div>{' '}
          <Button
            className='button-Search'
            type='submit'
            placeholder='Recherche'
          >
            Recherche ton programme
          </Button>
        </div>
      </section>
      <div className='apercuprogram'>
       <ThumbnailProgram programs = {listPrograms}/>
       
      </div>
    </div>
  );
};

export default LandingPage;
