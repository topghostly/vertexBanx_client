import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import gsap from "gsap";
import Cookies from "js-cookie";

function SideNav({ openSideNav, activeMobileTab }) {
  const wrapperRef = useRef(null);
  useEffect(() => {
    if (!openSideNav) {
      gsap.to(wrapperRef.current, {
        x: "100%",
      });
    }
    if (openSideNav) {
      gsap.to(wrapperRef.current, {
        x: "0%",
      });
    }

    console.log("The display is", openSideNav);
  }, [openSideNav]);
  return (
    <Wrapper ref={wrapperRef}>
      <TopLinks>
        <Lnks
          to={"/u/overview/dashboard"}
          className={activeMobileTab === "dashboard" ? "active" : null}
        >
          <div className="svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#ffffff"
              width="20px"
              height="20px"
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
          <div className="word">Overview</div>
        </Lnks>
        <Lnks
          to={"/u/overview/transfer"}
          className={activeMobileTab === "transfer" ? "active" : null}
        >
          <div className="svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
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
          <div className="word">Transfer</div>
        </Lnks>
        <Lnks
          to={"/u/overview/profile"}
          className={activeMobileTab === "profile" ? "active" : null}
        >
          <div className="svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z"
                fill="#ffffff"
              />
            </svg>
          </div>
          <div className="word">Profile</div>
        </Lnks>

        <Lnks
          onClick={() => {
            Cookies.remove("sessionToken");
            localStorage.removeItem("userDetails");
            navigate("/auth/login");
          }}
        >
          <div className="svg log-out">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22px"
              height="22px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M14 4L17.5 4C20.5577 4 20.5 8 20.5 12C20.5 16 20.5577 20 17.5 20H14M3 12L15 12M3 12L7 8M3 12L7 16"
                stroke="#e40909"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="word log-out">Log out</div>
        </Lnks>
      </TopLinks>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  width: fit-content;
  max-width: 320px;
  height: fit-content;
  background-color: #fdfdfd;
  display: none;
  top: 0;
  right: 0;
  z-index: 10;
  border-radius: 10px 0px 0px 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  @media screen and (max-width: 540px) {
    display: flex;
  }
`;

const TopLinks = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;
  width: fit-content;
  padding: 30px 20px 30px 0px;
  border-radius: 10px 0px 0px 10px;
`;

const Lnks = styled(Link)`
  position: relative;
  display: grid;
  grid-template-columns: 30px 1fr;
  width: fit-content;
  cursor: pointer;
  border-radius: 7px;
  align-items: center;
  transition: all 0.2s ease-in-out;
  color: #c7c7c7;
  padding: 10px 25px 10px 25px;

  .word {
    font-size: var(--text-font);
  }

  &:hover {
    background-color: #1f1f1f;
    transition: all 0.3s ease-in-out;
  }

  .svg {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    svg {
      fill: #c7c7c7;
    }
  }
  .log-out {
    color: #e40909;
    font-family: "Manrope-Bold";

    svg {
      fill: none;
    }
  }
`;
export default SideNav;
