import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import SubsForm from "./components/SubsForm";
import Navbar from "./components/Navbar";
import SubsVisualization from "./components/SubsVisualization";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme, lightTheme } from "./assets/Theme";
import { useSelector } from "react-redux";
import { selectBackgroundColor } from "./features/background/backgroundSlice";
import { useEffect } from "react";

function App() {
  const [theme, setTheme] = useState(darkTheme);
  const backgroundColor = useSelector(selectBackgroundColor);

  useEffect(() => {
    if (backgroundColor === "dark") {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
    localStorage.setItem("Theme", backgroundColor);
  }, [backgroundColor]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<SubsForm />} />
          <Route path="/SubsVisualization" element={<SubsVisualization />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
