import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme, lightTheme } from "./assets/Theme";
import { useSelector } from "react-redux";
import { selectBackgroundColor } from "./features/background/backgroundSlice";
import { useEffect } from "react";
import LoginRoutes from "./components/loginPage/LoginRoutes";
import Home from "./components/Home";
import AuthProvider from "./contexts/AuthContext";

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
      <AuthProvider>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/account/*" element={<LoginRoutes />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
