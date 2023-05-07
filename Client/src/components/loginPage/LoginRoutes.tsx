import React from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Signin from "./Signin";
import PrivateRoutes from "./privateRoutes";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Signup from "./Signup";
import { AiFillPicture } from "react-icons/ai";
import { backgroundImage } from "../../config/options";

function App() {
  const [selectedBackgroundImage, setSelectedBackgroundImage] = React.useState(
    backgroundImage.space
  );

  const toggleBackground = () => {
    const newBackgroundImage =
      selectedBackgroundImage === backgroundImage.space
        ? backgroundImage.lines
        : backgroundImage.space;
    setSelectedBackgroundImage(newBackgroundImage);
  };

  return (
    <div
      style={{
        backgroundImage: ` url(${selectedBackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        height: "100%",
      }}
    >
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="w-100"
          style={{ minWidth: "33%", maxWidth: "400px", zoom: "160%" }}
        >
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/update-profile" element={<UpdateProfile />} />
              <Route path="/" element={<Dashboard />} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
      </Container>
      <button
        style={{
          position: "fixed",
          bottom: "16px",
          right: "45px",
          border: "none",
          outline: "none",
          background: "none",
          color: "white",
          zoom: "175%",
        }}
        onClick={toggleBackground}
      >
        <AiFillPicture />
      </button>
    </div>
  );
}

export default App;
