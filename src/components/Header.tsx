import './Header.css';

import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='headerLP'>
      <div className='logoContainer'>
        <img
          className='imgLogo'
          src='/assets/LOGO.png'
          alt='logo Make a Body FIT'
        />
      </div>
      <div className='buttonContainer'>
        <Link to={'/connexion'}>
          <Button className='button-Sign-LogH' type='submit'>
            Connexion
          </Button>
        </Link>
        <Link to={'/inscription'}>
          <Button className='button-Sign-LogH' type='submit'>
            Inscription
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
