import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useState } from 'react';
import SubsForm from './components/SubsForm';
import Navbar from './components/Navbar';
import SubsVisualization from './components/SubsVisualization';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme, lightTheme } from './assets/Theme';

function App() {
  const [theme, setTheme] = useState(darkTheme);

  function toggleTheme(){
    setTheme(theme === darkTheme ? lightTheme : darkTheme);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Router>
        <Navbar toggleTheme={toggleTheme}/>
        <Routes>
          <Route path="/SubtitleForm" element={<SubsForm/>} />
          <Route path="/" element={<SubsVisualization />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
