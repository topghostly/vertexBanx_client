import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";

function Alert({ alert, setAlert }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!alert.alertState) {
      const tl1 = gsap.timeline();
      tl1.to(wrapperRef.current, {
        top: "200%",
        duration: 0.6,
        ease: "power3.in",
      });
    }

    if (alert.alertState) {
      gsap.fromTo(
        wrapperRef.current,
        {
          top: "200%",
        },
        {
          top: "50%",
          duration: 0.6,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }
  }, [alert.alertState]);

  let buttonBackground =
    alert.alertType == "Success" ? "var(--theme-color)" : "var(--red-color)";

  const handleClick = () => {
    setAlert({ ...alert, alertState: false });
  };
  return (
    <MainHold>
      <Wrapper ref={wrapperRef}>
        <div className="heading">
          <p>{alert.alertType}</p>
        </div>
        <div className="details">
          <p>{alert.alertDetails}</p>
        </div>
        <Button
          onClick={() => handleClick()}
          backgroundcolor={buttonBackground}
        >
          Close
        </Button>
      </Wrapper>
    </MainHold>
  );
}

const MainHold = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: none;
  height: 100vh;
  width: 100vw;
  pointer-events: none;
  overflow: hidden;
  z-index: 999;
`;

const Wrapper = styled.div`
  position: absolute;
  width: 360px;
  height: 200px;
  background-color: white;
  top: 200%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: var(--medium-br);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  text-align: center;
  pointer-events: all;

  .heading {
    p {
      font-family: "Firs-Medium";
      font-size: 25px;
      color: var(--medium-grey);
    }
  }

  .details {
    p {
      color: var(--dark-grey);
      font-size: 14px;
    }
  }
`;

const Button = styled.button`
  width: 140px;
  height: 38px;
  background-color: ${(props) => props.backgroundcolor};
  border: solid 1px ${(props) => props.backgroundcolor};
  color: white;
  border-radius: 130px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: white;
    transition: all 0.2s ease-in-out;
    color: var(--dark-grey);
  }
`;

export default Alert;
