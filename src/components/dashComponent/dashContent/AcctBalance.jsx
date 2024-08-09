import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import GetBalance from "../micro/GetBalance";
import GetAcctNum from "../micro/GetAcctNum";

function AcctBalance({ refreshDetails, setRefreshDetails, loading, balLoad }) {
  const [updatedValue, setUpdateValue] = useState(0);
  const [showBalance, setShowBalance] = useState(true);
  const animationRef56 = useRef(null);
  const animationRef64 = useRef(null);
  const privacyGuardRef = useRef(null);

  useEffect(() => {
    while (updatedValue < 60) {
      const changeUpdated = setInterval(() => {
        setUpdateValue((prevValue) => (prevValue += 1));
      }, 1000);

      return () => clearInterval(changeUpdated);
    }
  }, []);

  //For the loading animation
  useEffect(() => {
    if (loading) {
      gsap.fromTo(
        animationRef56.current,
        {
          transform: "translateX(-80%)",
        },
        {
          transform: "translateX(80%)",
          duration: 1,
          repeat: -1,
          yoyo: false,
          ease: "power4.in",
          delay: 0.2,
        }
      );
      gsap.fromTo(
        animationRef64.current,
        {
          transform: "translateX(-80%)",
        },
        {
          transform: "translateX(80%)",
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "power4.in",
          delay: 0.6,
        }
      );
    }
  });

  //For hiding the balance
  const handlePrivacy = () => {
    if (showBalance) {
      setShowBalance(false);
    }
    if (!showBalance) {
      setShowBalance(true);
    }
  };

  useEffect(() => {
    if (!showBalance) {
      gsap.to(privacyGuardRef.current, {
        opacity: 1,
        duration: 0.3,
      });
    }

    if (showBalance) {
      gsap.to(privacyGuardRef.current, {
        opacity: 0,
        duration: 0.3,
      });
    }
  }, [showBalance]);

  return (
    <Wrapper>
      <Holder>
        <div className="top">
          <div className="left">
            <p className="update">Last updated {updatedValue}s ago</p>
            <p className="small">Avialable balance</p>
          </div>
          {/* <div className="right"></div> */}
        </div>

        <div className="bottom">
          <div className="balance-holder">
            <div className="privacy-guard" ref={privacyGuardRef}></div>
            {loading ? (
              <PlaceHolder>
                <LoaderAnim ref={animationRef56} />
              </PlaceHolder>
            ) : (
              <GetBalance
                refreshDetails={refreshDetails}
                setRefreshDetails={setRefreshDetails}
              />
            )}
          </div>

          <div className="card-number">
            {loading ? (
              <PlaceHolder>
                <LoaderAnim ref={animationRef64} />
              </PlaceHolder>
            ) : (
              <GetAcctNum />
            )}
          </div>
        </div>

        <div className="privacy" onClick={handlePrivacy}>
          <div className="svg-holder">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4.4955 7.44088C3.54724 8.11787 2.77843 8.84176 2.1893 9.47978C0.857392 10.9222 0.857393 13.0778 2.1893 14.5202C3.9167 16.391 7.18879 19 12 19C13.2958 19 14.4799 18.8108 15.5523 18.4977L13.8895 16.8349C13.2936 16.9409 12.6638 17 12 17C7.9669 17 5.18832 14.82 3.65868 13.1634C3.03426 12.4872 3.03426 11.5128 3.65868 10.8366C4.23754 10.2097 4.99526 9.50784 5.93214 8.87753L4.4955 7.44088Z"
                fill="currentColor"
              />
              <path
                d="M8.53299 11.4784C8.50756 11.6486 8.49439 11.8227 8.49439 12C8.49439 13.933 10.0614 15.5 11.9944 15.5C12.1716 15.5 12.3458 15.4868 12.516 15.4614L8.53299 11.4784Z"
                fill="currentColor"
              />
              <path
                d="M15.4661 12.4471L11.5473 8.52829C11.6937 8.50962 11.8429 8.5 11.9944 8.5C13.9274 8.5 15.4944 10.067 15.4944 12C15.4944 12.1515 15.4848 12.3007 15.4661 12.4471Z"
                fill="currentColor"
              />
              <path
                d="M18.1118 15.0928C19.0284 14.4702 19.7715 13.7805 20.3413 13.1634C20.9657 12.4872 20.9657 11.5128 20.3413 10.8366C18.8117 9.18002 16.0331 7 12 7C11.3594 7 10.7505 7.05499 10.1732 7.15415L8.50483 5.48582C9.5621 5.1826 10.7272 5 12 5C16.8112 5 20.0833 7.60905 21.8107 9.47978C23.1426 10.9222 23.1426 13.0778 21.8107 14.5202C21.2305 15.1486 20.476 15.8603 19.5474 16.5284L18.1118 15.0928Z"
                fill="currentColor"
              />
              <path
                d="M2.00789 3.42207C1.61736 3.03155 1.61736 2.39838 2.00789 2.00786C2.39841 1.61733 3.03158 1.61733 3.4221 2.00786L22.0004 20.5862C22.391 20.9767 22.391 21.6099 22.0004 22.0004C21.6099 22.3909 20.9767 22.3909 20.5862 22.0004L2.00789 3.42207Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </Holder>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  height: 200px;
  background-color: black;
  border-radius: var(--medium-br);
  color: white;
`;

const PlaceHolder = styled.div`
  width: 170px;
  max-width: 100%;
  position: relative;
  overflow: hidden;
  background-color: none;
  height: 30px;
`;
const LoaderAnim = styled.div`
  display: absolute;
  transform: skewX(80);
  width: 100%;
  top: -20px;
  left: 0;
  background: linear-gradient(
    90deg,
    #f3f3f313 10%,
    #6b6b6b 30%,
    #6b6b6b 70%,
    #f3f3f313 90%
  );
  height: 100%;
  animation: SwipeAnimation 1s cubic-bezier(0.77, 0, 0.175, 1) infinite;
`;

const Holder = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    color: white;
  }

  .top {
    display: flex;
    justify-content: space-between;
    .left {
      p.update {
        font-size: 11px;
        color: var(--dark-grey);
      }
    }
    .right {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background-color: white;
      cursor: pointer;
    }
  }
  .bottom {
    display: flex;
    flex-direction: column;
    gap: 2px;
    .balance-holder {
      position: relative;
      width: 170px;

      h2 {
        width: fit-content;
      }

      .privacy-guard {
        width: 265px;
        height: 38px;
        position: absolute;
        z-index: 2;
        backdrop-filter: blur(7px);

        @media screen and (max-width: 540px) {
          width: 190px;
          height: 34px;
        }
      }
    }
    .card-number {
      width: fit-content;
      height: 32px;
      p {
        font-size: 11px;
      }
    }
  }

  .privacy {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 30px;
    cursor: pointer;
    transition: all 0.15s ease-in-out;
    scale: 1;

    .svg-holder {
      position: relative;
      width: 100%;

      svg {
        position: relative;
        width: 30px;
        color: white;
      }
    }

    &:hover {
      scale: 0.89;
      transform-origin: center;
      transition: all 0.15s ease-in-out;
    }
  }
`;
export default AcctBalance;
