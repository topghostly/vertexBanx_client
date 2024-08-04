import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import logo from "/images/VERTEX-07.png";

function MobileBottomNav({ activeMobileTab }) {
  return (
    <Wrapper>
      <LogoHolder>
        <img src={logo} alt="vertex-logo" />
      </LogoHolder>
      <div className="line"></div>
      <Navigations>
        <Lnks to={"/u/overview/dashboard"}>
          <div className={activeMobileTab === "dashboard" ? "active" : null}>
            <div className="svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                id="dashboard"
                className="icon glyph"
              >
                <rect x="2" y="2" width="9" height="11" rx="2" />
                <rect x="13" y="2" width="9" height="7" rx="2" />
                <rect x="2" y="15" width="9" height="7" rx="2" />
                <rect x="13" y="11" width="9" height="11" rx="2" />
              </svg>
            </div>
          </div>
        </Lnks>
        <Lnks to={"/u/overview/transfer"}>
          <div className={activeMobileTab === "transfer" ? "active" : null}>
            <div className="svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25px"
                height="25px"
                viewBox="0 0 48 48"
              >
                <title>transfer-solid</title>
                <g id="Layer_2" data-name="Layer 2">
                  <g id="invisible_box" data-name="invisible box">
                    <rect width="48" height="48" fill="none" />
                  </g>
                  <g id="icons_Q2" data-name="icons Q2">
                    <g>
                      <path d="M19,26a2,2,0,0,0-2,2v4H7V28a2,2,0,0,0-4,0V42a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V28A2,2,0,0,0,19,26Z" />
                      <path d="M43,26a2,2,0,0,0-2,2v4H31V28a2,2,0,0,0-4,0V42a2,2,0,0,0,2,2H43a2,2,0,0,0,2-2V28A2,2,0,0,0,43,26Z" />
                      <path d="M34,16v1.2l-2.6-2.6a1.9,1.9,0,0,0-3,.2,2.1,2.1,0,0,0,.2,2.7l6,5.9a1.9,1.9,0,0,0,2.8,0l6-5.9a2.1,2.1,0,0,0,.2-2.7,1.9,1.9,0,0,0-3-.2L38,17.2V16a14,14,0,0,0-28,0v6a2,2,0,0,0,4,0V16a10,10,0,0,1,20,0Z" />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </Lnks>
        <Lnks to={"/u/overview/dashboard"}>
          <div className="svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#ffffff"
              width="25px"
              height="25px"
              viewBox="0 0 24 24"
            >
              <path d="M21,3H4A2,2,0,0,0,2,5V19a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V8a1,1,0,0,0-1-1H5A1,1,0,0,1,5,5H22V4A1,1,0,0,0,21,3Zm-2.5,9.5A1.5,1.5,0,1,1,17,14,1.5,1.5,0,0,1,18.5,12.5Z" />
            </svg>
          </div>
        </Lnks>
        <Lnks to={"/u/overview/profile"}>
          <div className={activeMobileTab === "profile" ? "active" : null}>
            <div className="svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </Lnks>
      </Navigations>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  bottom: 15px;
  width: 90%;
  max-width: 400px;
  height: 62px;
  background-color: black;
  margin: 0px auto;
  z-index: 110;
  border-radius: 100px;
  grid-template-columns: 15% 2% 83%;
  padding: 0px 25px;
  display: none;

  @media screen and (max-width: 720px) {
    display: grid;
  }

  .line {
    width: 2px;
    height: 40%;
    background-color: var(--dark-grey);
    margin: auto 0px;
  }
`;

const LogoHolder = styled.div`
  position: relative;
  width: fit-content;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  img {
    width: 23px;
  }
`;

const Navigations = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding-left: 20px;
`;

const Lnks = styled(Link)`
  position: relative;

  .svg {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    svg {
      fill: #8b8b8b;
      color: #8b8b8b;
    }
  }

  .active {
    .svg {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      svg {
        fill: white;
        color: white;
      }
    }
  }
`;
export default MobileBottomNav;
