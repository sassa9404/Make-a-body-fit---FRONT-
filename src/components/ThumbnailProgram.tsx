import React, { useState } from 'react';

import { ProgramType } from '../models/Program';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'react-bootstrap/Image';

import { Navigation, Pagination } from 'swiper';

import './ThumbnailProgram.css';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { BiRotateLeft } from 'react-icons/bi';
import { BsGlobe2 } from 'react-icons/bs';

interface ThumbnailProgramProps {
  programs: ProgramType[];
}

const ThumbnailProgram = ({ programs }: ThumbnailProgramProps) => {
  //   const [program, setProgram] = useState<ProgramType>();

  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={50}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className='mySwiperTP'
      >
        {programs.map((program) => {
          return (
            <SwiperSlide>
              <AnimationOnScroll animateIn='animate__fadeIn'>
                <div className='programTP'>
                  <div className='programTP-inner'>
                    <div className='programTP-front'>
                      <Image
                        src={`http://localhost:8080/${program.url_picture}`} // Affiche la photo dans le programme
                        alt='program1'
                      />

                      <p className='ProgrammeName'>{program.name}</p>
                    </div>

                    <div className='programTP-back'>
                      <div className='programTP-back-top'>
                        <p>jojojojojojojo </p>
                      </div>
                      <p className='lolo'>hello</p>
                    </div>
                  </div>
                </div>
              </AnimationOnScroll>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default ThumbnailProgram;
