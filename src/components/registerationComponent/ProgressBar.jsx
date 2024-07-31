import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";

function ProgressBar({ lightUp }) {
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);
  useEffect(() => {
    if (lightUp === 1) {
      gsap.to(firstRef.current, {
        backgroundColor: "var(--theme-color)",
      });
      gsap.to(secondRef.current, {
        backgroundColor: "var(--medium-grey)",
      });
      gsap.to(thirdRef.current, {
        backgroundColor: "var(--medium-grey)",
      });
    }
    if (lightUp === 2) {
      gsap.to(firstRef.current, {
        backgroundColor: "var(--theme-color)",
      });
      gsap.to(secondRef.current, {
        backgroundColor: "var(--theme-color)",
      });
      gsap.to(thirdRef.current, {
        backgroundColor: "var(--medium-grey)",
      });
    }
    if (lightUp === 3) {
      gsap.to(firstRef.current, {
        backgroundColor: "var(--theme-color)",
      });
      gsap.to(secondRef.current, {
        backgroundColor: "var(--theme-color)",
      });
      gsap.to(thirdRef.current, {
        backgroundColor: "var(--theme-color)",
      });
    }
  });
  return (
    <Wrapper>
      <Holder>
        <FirstBox ref={firstRef} />
        <SecondBox ref={secondRef} />
        <ThirdBox ref={thirdRef} />
      </Holder>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  position: relative;
  width: 220px;
  height: 3px;
`;

const Holder = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 32% 32% 32%;
  justify-content: space-between;
`;

const FirstBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--medium-grey);
  border-radius: 5px;
`;
const SecondBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--medium-grey);
  border-radius: 5px;
`;
const ThirdBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--medium-grey);
  border-radius: 5px;
`;

export default ProgressBar;
