
import './NavBar.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function NavBar() {
  // On récupère, depuis le context, la fonction de logout pour l'attacher à l'icône correspondante
  const { handleLogout } = useAuth();

  //TODO : Ajouter le Hover sur les icones
  return (
    <Navbar fixed='bottom' className='navbar-mainNV'>
      <Link to={'/'}>
        <img src='/assets/Logo.png' alt='logo' className='logoNV' />
      </Link>
      <Nav className='nav-link-containerNV'>
        <Link to={'/user/interface'} className='boxiconNV'>
          <div className='nav-linkNV'>
            <FontAwesomeIcon
              icon={faHouse}
              color={'black'}
              className='iconNV'
            />
          </div>
        </Link>
        <Link to={'/Recherche'} className='boxiconNV'>
          <div className='nav-linkNV'>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              color={'black'}
              className='iconNV'
            />
          </div>
        </Link>
        <Link to={'/Organiser'} className='boxiconNV'>
          <div className='nav-linkNV'>
            <FontAwesomeIcon
              icon={faCalendarPlus}
              color={'black'}
              className='iconNV'
            />
          </div>
        </Link>
        <Link to={'/Faq'} className='boxiconNV'>
          <div className='nav-linkNV'>
            <FontAwesomeIcon
              icon={faCircleQuestion}
              color={'black'}
              className='iconNV'
            />
          </div>
        </Link>
        <Link to={'/connexion'} className='boxiconNV'>
          <div className='nav-linkNV'>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              onClick={handleLogout}
              color={'black'}
              className='iconNV'
            />
          </div>
        </Link>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
