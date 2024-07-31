import "./App.css";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import gsap from "gsap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Routes, Route, useLocation } from "react-router-dom";

// Pages and components import
import Homepage from "./components/dashComponent/dashPages/Homepage";
import TransferPage from "./components/dashComponent/dashPages/TransferPage";
import LoginPage from "./components/LoginPage";
import RegisterationPage from "./components/RegisterationPage";
import Personal from "./components/registerationComponent/Personal";
import Civil from "./components/registerationComponent/Civil";
import Password from "./components/registerationComponent/Password";
import Auth from "./pages/Auth";

// Alert components import
import Alert from "./components/dashComponent/Alert";
import History from "./components/dashComponent/dashPages/History";
import Profile from "./components/dashComponent/dashPages/Profile";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const backDropRef = useRef(null);

  // Alert state
  const [alert, setAlert] = useState({
    alertState: false,
    alertType: "undefined",
    alertDetails: "undefined",
  });

  // Registration details state
  const [registerationDetails, setregisterationDetails] = useState({
    personalDetails: {},
    otherDetails: {},
    passwordDetails: {},
  });

  // Slider position state
  const [sliderPosition, setSliderPosition] = useState("");

  // Progress state
  const [lightUp, setLightUp] = useState(1);

  // Handle registration state
  const [handleRegistration, setHandleRegistration] = useState(false);

  const handleNavigation = () => {
    console.log("Redirecting to login");
    navigate("/auth/login");
  };

  // Handle registration logic
  const handleAsyncRegostration = async () => {
    try {
      const responce = await axios.post(
        "http://localhost:3030/v0/api/auth/register",
        registerationDetails
      );
      if (responce.data.status == "SUCCESS") {
        setAlert({
          alertState: true,
          alertType: "Success",
          alertDetails: "login to account",
        });
        return setTimeout(() => {
          handleNavigation();
        }, 1000);
      } else {
        return console.log(responce);
      }
    } catch (error) {
      setAlert({
        alertState: true,
        alertType: "Failed",
        alertDetails: "An error occured, try again",
      });
      navigate("/auth/create-acct/personal-details");
      return console.log("Error creating user:", error);
    }
  };

  useEffect(() => {
    if (handleRegistration) {
      handleAsyncRegostration();
      setHandleRegistration(false);
    }
  });

  // Alert animation
  useEffect(() => {
    if (alert.alertState) {
      gsap.to(".main-content", {
        transformOrigin: "center",
      });
      gsap.to(backDropRef.current, {
        display: "block",
        opacity: 1,
      });
    } else {
      gsap.to(".main-content", {
        transformOrigin: "center",
        delay: 0.4,
      });
      gsap.to(backDropRef.current, {
        delay: 0.4,
        opacity: 0,
        display: "none",
      });
    }
  });
  return (
    <div className="main-content">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/auth"
            element={
              <Auth
                sliderPosition={sliderPosition}
                setSliderPosition={setSliderPosition}
              />
            }
          >
            <Route
              index
              path="login"
              element={
                <LoginPage
                  setSliderPosition={setSliderPosition}
                  setAlert={setAlert}
                />
              }
            />
            <Route
              path="create-acct"
              element={
                <RegisterationPage
                  lightUp={lightUp}
                  setSliderPosition={setSliderPosition}
                />
              }
            >
              <Route
                path="personal-details"
                element={
                  <Personal
                    setregisterationDetails={setregisterationDetails}
                    registerationDetails={registerationDetails}
                    setLightUp={setLightUp}
                  />
                }
              />
              <Route
                path="other-details"
                element={
                  <Civil
                    setregisterationDetails={setregisterationDetails}
                    registerationDetails={registerationDetails}
                    setLightUp={setLightUp}
                  />
                }
              />
              <Route
                path="password-details"
                element={
                  <Password
                    setregisterationDetails={setregisterationDetails}
                    registerationDetails={registerationDetails}
                    setLightUp={setLightUp}
                    setAlert={setAlert}
                    setHandleRegistration={setHandleRegistration}
                  />
                }
              />
            </Route>
          </Route>
          <Route path="/u/overview" element={<Dashboard />}>
            <Route
              path="dashboard"
              element={<Homepage alert={alert} setAlert={setAlert} />}
            />
            <Route
              path="transfer"
              element={<TransferPage setAlert={setAlert} />}
            />
            <Route path="statement" element={<History setAlert={setAlert} />} />
            <Route path="profile" element={<Profile setAlert={setAlert} />} />
          </Route>
        </Routes>
        <Alert alert={alert} setAlert={setAlert} />
        <BackDrop ref={backDropRef} />
      </AnimatePresence>
    </div>
  );
}

const BackDrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #27272729;
  z-index: 88;
  backdrop-filter: blur(1px);
  pointer-events: none;
  display: none;
`;

export default App;
