import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import VerifySession from "../VerifySession";
import { useState, useRef, useEffect } from "react";
import TopSection from "../dashContent/TopSection";
import MidSection from "../dashContent/MidSection";
import { orbit } from "ldrs";
import gsap from "gsap";
import RefreshDatabase from "../../../../util/RefreshData";

function Homepage({ alert, setAlert }) {
  orbit.register();
  const [loading, setLoading] = useState(true);
  const [balLoad, setBalLoad] = useState(true);
  const [openSideNav, setOpenSideNav] = useState(true);
  const [refreshDetails, setRefreshDetails] = useState(false);
  const alertRef = useRef(null);

  // Credit alert logic
  useEffect(() => {
    if (refreshDetails) {
      const tl1 = gsap.timeline();
      tl1
        .fromTo(
          alertRef.current,
          {
            top: "-300px",
          },
          {
            top: "30px",
            duration: 0.6,
            ease: "power3.out",
            delay: 0.3,
          }
        )
        .to(alertRef.current, {
          delay: 4,
          top: "-300px",
          duration: 0.6,
          ease: "power3.in",
        });
    }
  }, [refreshDetails]);

  return (
    <Wrapper
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        delay: 0.2,
        duration: 0.2,
      }}
      onClick={() => {
        setOpenSideNav(false);
      }}
    >
      {!loading && (
        <RefreshDatabase
          setRefreshDetails={setRefreshDetails}
          setBalLoad={setBalLoad}
        />
      )}
      <VerifySession
        setAlert={setAlert}
        setLoading={setLoading}
        setBalLoad={setBalLoad}
      />
      <TopSection
        loading={loading}
        openSideNav={openSideNav}
        setOpenSideNav={setOpenSideNav}
      />
      <MidSection
        refreshDetails={refreshDetails}
        setRefreshDetails={setRefreshDetails}
        loading={loading}
        balLoad={balLoad}
      />
      <CreditAlert ref={alertRef}>
        <p>Youre account has been credited</p>
      </CreditAlert>
    </Wrapper>
  );
}

const Wrapper = styled(motion.section)`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 43px 1fr;
  gap: 40px;

  @media screen and (max-width: 540px) {
    grid-template-rows: 115px 1fr;
  }
`;

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: grid;
  place-content: center;
  z-index: 9000;
  pointer-events: none;
  opacity: 1;
`;

const LoadingAnimation = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  display: grid;
  place-content: center;
`;

const CreditAlert = styled.div`
  padding: 10px 20px;
  width: 100%;
  max-width: 300px;
  background-color: #67cc67;
  border: solid 2px #96d496;
  color: white;
  position: fixed;
  left: 50%;
  top: -300px;
  transform: translateX(-50%);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  P {
    font-size: 14px;
  }
`;

export default Homepage;
