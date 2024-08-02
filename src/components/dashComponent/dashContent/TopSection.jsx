import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import gsap from "gsap";

import flag from "/images/flag.png";

import "../../../index.css";
import Getusername from "../micro/Getusername";

function TopSection({ loading }) {
  const navigate = useNavigate();

  const animationRef = useRef(null);
  const animationRef0 = useRef(null);

  useEffect(() => {
    if (loading) {
      gsap.fromTo(
        animationRef.current,
        {
          transform: "translateX(-80%)",
        },
        {
          transform: "translateX(80%)",
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "power4.in",
        }
      );
      gsap.fromTo(
        animationRef0.current,
        {
          transform: "translateX(-80%)",
        },
        {
          transform: "translateX(80%)",
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "power4.in",
        }
      );
    }
  });
  return (
    <Wrapper>
      <Holder>
        <div className="left">
          <p className="light-grey">Welcome back</p>
          <div className="name-holder">
            {loading ? (
              <PlaceHolder>
                <LoaderAnim ref={animationRef} />
              </PlaceHolder>
            ) : (
              <Getusername />
            )}
          </div>
        </div>
        <div className="left-mobile">
          <div className="avatar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="22px"
              height="22px"
              viewBox="0 0 36 36"
              aria-hidden="true"
              role="img"
              className="iconify iconify--twemoji"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                fill="#7C533E"
                d="M5 21c0 2.209-1.119 4-2.5 4S0 23.209 0 21s1.119-4 2.5-4S5 18.791 5 21z"
              />
              <path
                fill="#7C533E"
                d="M3 18.562C3 10.037 8.373 3.125 15 3.125s12 6.912 12 15.438C27 27.088 21.627 34 15 34S3 27.088 3 18.562z"
              />
              <path
                fill="#DD2E44"
                d="M20 0c-.249 0-.478.007-.713.012C19.19.01 19.097 0 19 0C9 0 2 4.582 2 9s6.373 4 13 4c4.442 0 7.648 0 9.966-.086L25 13l6 15h2s.343-3.055 1-7c1-6 .533-21-14-21z"
              />
              <path
                fill="#7C533E"
                d="M30 21c0 2.209-1.119 4-2.5 4S25 23.209 25 21s1.119-4 2.5-4s2.5 1.791 2.5 4z"
              />
              <path
                d="M10 21a1 1 0 0 1-1-1v-2a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1zm10 0a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1z"
                fill="#000000"
              />
              <path
                fill="#3D2E24"
                d="M16 26h-2a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2z"
              />
              <path
                fill="#E6E7E8"
                d="M27 25c0-2-2.293-.707-3 0c-1 1-3 3-5 2c-2.828-1.414-4-1-4-1s-1.171-.414-4 1c-2 1-4-1-5-2c-.707-.707-3-2-3 0s1 2 1 2c-1 2 1 3 1 3c0 3 3 3 3 3c0 3 4 2 4 2c1 1 3 1 3 1s2 0 3-1c0 0 4 1 4-2c0 0 3 0 3-3c0 0 2-1 1-3c0 0 1 0 1-2z"
              />
              <path fill="#7C533E" d="M15 28c7 0 4 2 0 2s-7-2 0-2z" />
              <ellipse fill="#D1D3D4" cx="3" cy="14" rx="2" ry="4" />
              <ellipse fill="#D1D3D4" cx="26" cy="14" rx="2" ry="4" />
              <circle fill="#F1F2F2" cx="32" cy="29" r="4" />
              <path
                fill="#F1F2F2"
                d="M29 12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h25a2 2 0 0 1 2 2v1z"
              />
            </svg>
          </div>
          <p className="light-grey">Welcome back</p>
          <div className="name-holder">
            {loading ? (
              <PlaceHolder>
                <LoaderAnim ref={animationRef0} />
              </PlaceHolder>
            ) : (
              <Getusername />
            )}
          </div>
          <div className="naira">
            <img src={flag} alt="nigerian-flag" />
            <p>Nigerian Naira</p>
          </div>
        </div>
        <div className="right-mobile">
          <div className="hamburger-holder">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45px"
              height="45px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355ZM18.75 16C18.75 16.4142 18.4142 16.75 18 16.75H6C5.58579 16.75 5.25 16.4142 5.25 16C5.25 15.5858 5.58579 15.25 6 15.25H18C18.4142 15.25 18.75 15.5858 18.75 16ZM18 12.75C18.4142 12.75 18.75 12.4142 18.75 12C18.75 11.5858 18.4142 11.25 18 11.25H6C5.58579 11.25 5.25 11.5858 5.25 12C5.25 12.4142 5.58579 12.75 6 12.75H18ZM18.75 8C18.75 8.41421 18.4142 8.75 18 8.75H6C5.58579 8.75 5.25 8.41421 5.25 8C5.25 7.58579 5.58579 7.25 6 7.25H18C18.4142 7.25 18.75 7.58579 18.75 8Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <div className="right">
          <div
            className="logout"
            onClick={() => {
              Cookies.remove("sessionToken");
              localStorage.removeItem("userDetails");
              navigate("/auth/login");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22px"
              height="22px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M14 4L17.5 4C20.5577 4 20.5 8 20.5 12C20.5 16 20.5577 20 17.5 20H14M3 12L15 12M3 12L7 8M3 12L7 16"
                stroke="var(--dark-grey)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="notification-tab">
            <div className="svg-holder">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clipPath="url(#clip0_15_159)">
                  <rect width="20" height="20" fill="none" />
                  <path
                    d="M9.5 19C8.89555 19 7.01237 19 5.61714 19C4.87375 19 4.39116 18.2177 4.72361 17.5528L5.57771 15.8446C5.85542 15.2892 6 14.6774 6 14.0564C6 13.2867 6 12.1434 6 11C6 9 7 5 12 5C17 5 18 9 18 11C18 12.1434 18 13.2867 18 14.0564C18 14.6774 18.1446 15.2892 18.4223 15.8446L19.2764 17.5528C19.6088 18.2177 19.1253 19 18.382 19H14.5M9.5 19C9.5 21 10.5 22 12 22C13.5 22 14.5 21 14.5 19M9.5 19C11.0621 19 14.5 19 14.5 19"
                    stroke="var(--dark-grey)"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 5V3"
                    stroke="var(--dark-grey)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_15_159">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p>Notifications</p>
            <div className="notification-count">5</div>
          </div>
          <div className="avatar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="22px"
              height="22px"
              viewBox="0 0 36 36"
              aria-hidden="true"
              role="img"
              className="iconify iconify--twemoji"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                fill="#7C533E"
                d="M5 21c0 2.209-1.119 4-2.5 4S0 23.209 0 21s1.119-4 2.5-4S5 18.791 5 21z"
              />
              <path
                fill="#7C533E"
                d="M3 18.562C3 10.037 8.373 3.125 15 3.125s12 6.912 12 15.438C27 27.088 21.627 34 15 34S3 27.088 3 18.562z"
              />
              <path
                fill="#DD2E44"
                d="M20 0c-.249 0-.478.007-.713.012C19.19.01 19.097 0 19 0C9 0 2 4.582 2 9s6.373 4 13 4c4.442 0 7.648 0 9.966-.086L25 13l6 15h2s.343-3.055 1-7c1-6 .533-21-14-21z"
              />
              <path
                fill="#7C533E"
                d="M30 21c0 2.209-1.119 4-2.5 4S25 23.209 25 21s1.119-4 2.5-4s2.5 1.791 2.5 4z"
              />
              <path
                d="M10 21a1 1 0 0 1-1-1v-2a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1zm10 0a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1z"
                fill="#000000"
              />
              <path
                fill="#3D2E24"
                d="M16 26h-2a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2z"
              />
              <path
                fill="#E6E7E8"
                d="M27 25c0-2-2.293-.707-3 0c-1 1-3 3-5 2c-2.828-1.414-4-1-4-1s-1.171-.414-4 1c-2 1-4-1-5-2c-.707-.707-3-2-3 0s1 2 1 2c-1 2 1 3 1 3c0 3 3 3 3 3c0 3 4 2 4 2c1 1 3 1 3 1s2 0 3-1c0 0 4 1 4-2c0 0 3 0 3-3c0 0 2-1 1-3c0 0 1 0 1-2z"
              />
              <path fill="#7C533E" d="M15 28c7 0 4 2 0 2s-7-2 0-2z" />
              <ellipse fill="#D1D3D4" cx="3" cy="14" rx="2" ry="4" />
              <ellipse fill="#D1D3D4" cx="26" cy="14" rx="2" ry="4" />
              <circle fill="#F1F2F2" cx="32" cy="29" r="4" />
              <path
                fill="#F1F2F2"
                d="M29 12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h25a2 2 0 0 1 2 2v1z"
              />
            </svg>
          </div>
        </div>
      </Holder>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  position: relative;

  .light-grey {
    color: var(--medium-grey);
  }
`;

const PlaceHolder = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: none;
  height: 30px;
`;
const LoaderAnim = styled.div`
  display: absolute;
  transform: skewX(200);
  width: 100%;
  top: -20px;
  left: 0;
  background: linear-gradient(
    90deg,
    #f3f3f36e 10%,
    #d1d1d1 30%,
    #d1d1d1 70%,
    #f3f3f36e 90%
  );
  height: 100%;
  animation: SwipeAnimation 1s cubic-bezier(0.77, 0, 0.175, 1) infinite;
`;

const Holder = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 3px;
    @media screen and (max-width: 540px) {
      display: none;
    }

    h3 {
      font-size: 26px;
    }
    p {
      font-size: 14px;
      color: #919191;
    }
    .name-holder {
      width: fit-content;
      min-width: 185px;
      height: 30px;
    }
  }

  .right-mobile {
    width: fit-content;
    height: 100%;
    display: flex;
    align-items: flex-start;

    .hamburger-holder {
      width: fit-content;
      height: fit-content;
      color: black;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      display: none;

      @media screen and (max-width: 540px) {
        display: block;
      }

      &.hover {
        color: var(--dark-grey);
        transition: all 0.3s ease-in-out;
      }
    }
  }

  .left-mobile {
    display: none;
    flex-direction: column;
    gap: 3px;

    .name-holder {
      width: fit-content;
      min-width: 185px;
      height: 30px;
    }

    @media screen and (max-width: 540px) {
      display: flex;
    }
    h3 {
      font-size: 28px;
    }
    p {
      font-size: 20px;
      color: #919191;
    }
    .avatar {
      width: 50px;
      height: 50px;
      background-color: var(--light-grey);
      border-radius: 50%;
      display: grid;
      place-content: center;
    }

    .naira {
      margin-top: 5px;
      width: fit-content;
      display: flex;
      justify-content: center;
      gap: 5px;
      img {
        width: 18px;
      }
      p {
        font-family: "Manrope-SemiBold";
        font-size: 13px;
        color: #919191;
      }
    }
  }

  .right {
    display: flex;
    gap: 5px;
    align-items: center;

    @media screen and (max-width: 540px) {
      display: none;
    }

    .logout {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      background-color: var(--light-grey);
      display: grid;
      place-content: center;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: var(--medium-grey);
        transition: all 0.2s ease-in-out;
      }
    }

    .notification-tab {
      height: 42px;
      width: 195px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
      border-radius: 100px;
      padding: 0px;
      padding-left: 3.5px;
      padding-right: 8px;
      border: solid 1px var(--medium-grey);
      transition: all 0.2s ease-in-out;

      p {
        color: var(--dark-grey);
        font-size: 13px;
      }

      .svg-holder {
        width: 33px;
        aspect-ratio: 1;
        border-radius: 50%;
        background-color: var(--light-grey);
        display: grid;
        place-content: center;
        transition: all 0.2s ease-in-out;
      }

      .notification-count {
        width: 25px;
        height: 25px;
        background-color: var(--dark-grey);
        display: grid;
        place-content: center;
        border-radius: 50%;

        color: white;
        font-size: 11px;
      }

      &:hover {
        .svg-holder {
          background-color: var(--medium-grey);
          transition: all 0.2s ease-in-out;
        }
      }
    }

    .avatar {
      width: 40px;
      height: 40px;
      background-color: var(--light-grey);
      border-radius: 50%;
      display: grid;
      place-content: center;
    }
  }
`;

export default TopSection;
