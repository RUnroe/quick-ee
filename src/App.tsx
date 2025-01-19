import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './styles/index.scss';
import Home from './pages/Home';


function App() {
  return (
    <BrowserRouter>
    {/* <NavigationMenu onHomePage={onHomePage}/> */}
    
    <main id="main">
      <RoutesModule />
    </main>
  </BrowserRouter>
  );
}

const RoutesModule = ({}) => {
  let location = useLocation();
  useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
  
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/" element={<Navigate to={{pathname: '/'}} />} />
    </Routes>
    
  )
}

export default App;
