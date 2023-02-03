import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../api/useAxiosPrivate';
import NavBar from '../components/NavBar';
import { useAuth } from '../context/AuthContext';
import { ProgramType } from '../models/Program';

let eventsListProgram: ProgramType[] = [];

let nombreProgramAgenda: Number = 0;

const UserInterface = () => {
  const { currentUser } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [listProgram, setListProgram] = useState<ProgramType[]>([]);





  return (
    <div className='NavBAR LOGIN '>
      <NavBar />
      <section className='bandeau-user'>
        <div className='bonjour-user'>Bonjour {currentUser?.name},</div>
        <p>
          {nombreProgramAgenda < 1
            ? `Vous avez pas de programme dans votre agenda  `
            : `Vous avez actuellement  ${nombreProgramAgenda} sur votre agenda, veuillez la consuler`}
        </p>
        <div className='photo-bandeau-user'></div>
      </section>
      <section className='caroussel'>
        <div className='programSECHE'>

        </div>
        <div className='programPM'>

        </div>
        <div className='programP'>

        </div>
      </section>
    </div>
  );
};

export default UserInterface;
