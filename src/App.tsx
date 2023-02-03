import LandingPage from './pages/LandingPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Connexion from './pages/Connextion';
import ToastProvider from './context/ToastContext';
import CurrentUserProvider from './context/AuthContext';
import Inscription from './pages/Inscription';
import UserInterface from './pages/UserInterface';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <CurrentUserProvider>
          <Routes>
            <Route path='/user/interface' element={<UserInterface />} />

            <Route path='/' element={<LandingPage />} />
            <Route path='/connexion' element={<Connexion />} />
            <Route path='/inscription' element={<Inscription />} />
          </Routes>
        </CurrentUserProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
