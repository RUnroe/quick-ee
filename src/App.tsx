import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './styles/index.scss';
import Home from './pages/Home';
import FunctionalBlock from './pages/FunctionalBlock';
import { useMediaQuery, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';


function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      {/* <NavigationMenu onHomePage={onHomePage}/> */}
      
      <main id="main">
        <RoutesModule />
      </main>
    </BrowserRouter>
  </ThemeProvider>
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
      {/* <Route path="/block/search" element={} /> */}
      {/* <Route path="/block/compare/:blockId/:secondBlockId" element={} /> */}
      <Route path="/block/view/:blockId" element={<FunctionalBlock/>} />
      {/* Catch all block */}
      <Route path="*" element={<Home/>} /> 
    </Routes>
    
  )
}

export default App;
