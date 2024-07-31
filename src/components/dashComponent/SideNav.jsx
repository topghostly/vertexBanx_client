import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

function SideNav({ page, setPage }) {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <p className="header">MAIN MENU</p>
      <TopLinks>
        <Lnks to={"/u/overview/dashboard"}>
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
        <Lnks to={"/u/overview/transfer"}>
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
        <Lnks>
          <div className="svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#fdfdfd"
              width="20px"
              height="20px"
              viewBox="0 0 32 32"
              version="1.1"
            >
              <title>tools</title>
              <path d="M27.783 7.936c0.959 2.313 0.502 5.074-1.379 6.955-2.071 2.071-5.201 2.395-7.634 1.022l-1.759 1.921 1.255 1.26 0.75-0.75c0.383-0.384 1.005-0.384 1.388 0l6.082 6.144c0.384 0.383 0.384 1.005 0 1.388l-2.776 2.776c-0.383 0.384-1.005 0.384-1.388 0l-6.082-6.144c-0.384-0.383-0.384-1.005 0-1.388l0.685-0.685-1.196-1.199-8.411 9.189c-0.767 0.767-2.010 0.767-2.776 0l-0.694-0.694c-0.767-0.767-0.767-2.010 0-2.776l9.582-8.025-6.364-6.381-2.010-0.001-2.326-3.74 1.872-1.875 3.825 2.341 0.025 1.968 6.438 6.463 1.873-1.568c-1.831-2.496-1.64-6.012 0.616-8.268 1.872-1.872 4.618-2.337 6.925-1.396l-4.124 4.067 3.471 3.471 4.132-4.075zM6.15 25.934c-0.383-0.383-1.004-0.383-1.388 0-0.384 0.384-0.384 1.005 0 1.389 0.384 0.383 1.005 0.383 1.388 0 0.384-0.385 0.384-1.006 0-1.389z" />
            </svg>
          </div>
          <div className="word">Utilities</div>
        </Lnks>
      </TopLinks>
      <p className="header">SETTINGS</p>
      <TopLinks>
        <Lnks>
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
        <Lnks>
          <div className="svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#ffffff"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
            >
              <path d="M21,3H4A2,2,0,0,0,2,5V19a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V8a1,1,0,0,0-1-1H5A1,1,0,0,1,5,5H22V4A1,1,0,0,0,21,3Zm-2.5,9.5A1.5,1.5,0,1,1,17,14,1.5,1.5,0,0,1,18.5,12.5Z" />
            </svg>
          </div>
          <div className="word">Wallet</div>
        </Lnks>
        <Lnks>
          <div className="svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM7.92 9.234v.102a.5.5 0 0 0 .5.5h.997a.499.499 0 0 0 .499-.499c0-1.29.998-1.979 2.34-1.979 1.308 0 2.168.689 2.168 1.67 0 .928-.482 1.359-1.686 1.91l-.344.154C11.379 11.54 11 12.21 11 13.381v.119a.5.5 0 0 0 .5.5h.997a.499.499 0 0 0 .499-.499c0-.516.138-.723.55-.912l.345-.155c1.445-.654 2.529-1.514 2.529-3.39v-.103c0-1.978-1.72-3.441-4.164-3.441-2.478 0-4.336 1.428-4.336 3.734zm2.58 7.757c0 .867.659 1.509 1.491 1.509.85 0 1.509-.642 1.509-1.509 0-.867-.659-1.491-1.509-1.491-.832 0-1.491.624-1.491 1.491z"
                fill="#ffffff"
              />
            </svg>
          </div>
          <div className="word">Help</div>
        </Lnks>
      </TopLinks>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .active {
    background-color: var(--dark-grey);
  }

  p.header {
    color: var(--dark-grey);
    font-size: 9px;
    font-family: "Manrope-Bold";
    margin-top: 10px;
  }
`;

const TopLinks = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: start;
  width: 100%;
`;

const Lnks = styled(Link)`
  position: relative;
  display: grid;
  grid-template-columns: 30px 1fr;
  width: 100%;
  cursor: pointer;
  height: 30px;
  border-radius: 7px;
  align-items: center;
  transition: all 0.2s ease-in-out;
  padding-left: 10px;
  color: white;

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
      fill: white;
    }
  }
`;

export default SideNav;
