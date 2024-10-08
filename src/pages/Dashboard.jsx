import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import DashNav from "../components/dashComponent/DashNav";

import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import MobileBottomNav from "../components/dashComponent/MobileBottomNav";
import SideNav from "../components/dashComponent/dashContent/SideNac";

function Dashboard() {
  const location = useLocation();

  const [activeMobileTab, setActiveMobileTab] = useState("home");

  useEffect(() => {
    const urlPath = location.pathname;
    const urlParts = urlPath.split("/");
    const currentPage = urlParts[urlParts.length - 1];
    setActiveMobileTab(currentPage);
  }, []);
  return (
    <Wrapper>
      <Holder>
        <SideNav activeMobileTab={activeMobileTab} />
        <div className="content">
          <DashNav activeMobileTab={activeMobileTab} />
          <div className="dash-holder">
            <Outlet />
          </div>
        </div>
        <div className="content-mobile">
          <Outlet />
        </div>
      </Holder>
      {/* <MobileBottomNav activeMobileTab={activeMobileTab} /> */}
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  position: relative;
  background-color: black;
  height: 100vh;
  overflow-x: hidden;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #2929298f;
    border-radius: 30px;
  }
  &::-webkit-scrollbar-track {
    background-color: none;
  }

  @media screen and (max-width: 720px) {
    padding: 0px;
    background-color: white;
  }
`;

const Holder = styled.div`
  position: relative;
  width: 100%;
  max-width: 1300px;
  height: 100%;

  .content {
    position: relative;
    width: 100%;
    max-width: 1300px;
    height: 100%;
    display: grid;
    grid-template-columns: 150px 1fr;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #2929298f;
      border-radius: 30px;
    }
    &::-webkit-scrollbar-track {
      background-color: none;
    }

    @media screen and (max-width: 720px) {
      display: none;
    }

    .dash-holder {
      position: relative;
      width: 100%;
      max-height: 100%;
      background-color: white;
      border-radius: 10px;
      padding: 20px;
      overflow-y: scroll;
      color: black;

      @media screen and (max-width: 720px) {
        border-radius: 0px;
        width: 100%;
        height: auto;
        max-height: auto;
        overflow-y: auto;
      }

      @media screen and (max-width: 400px) {
        padding: 10px;
        padding-top: 20px;
      }
    }
  }

  // Mobile content
  .content-mobile {
    position: relative;
    width: 100vw;
    display: none;
    color: black;

    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #2929298f;
      border-radius: 30px;
    }
    &::-webkit-scrollbar-track {
      background-color: none;
    }

    @media screen and (max-width: 720px) {
      display: block;
    }

    .bottom-space {
      width: 100%;
      display: none;
      height: 80px;

      @media screen and (max-width: 720px) {
        display: block;
      }
    }
  }
`;

export default Dashboard;
