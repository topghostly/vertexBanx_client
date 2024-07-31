import React, { useEffect } from "react";
import styled from "styled-components";

import gsap from "gsap";
import { Link } from "react-router-dom";

function AuthTopBar({ sliderPosition, setSliderPosition }) {
  useEffect(() => {
    if (sliderPosition === "right") {
      gsap.to(".slider", {
        left: "120px",
        ease: "power3.out",
      });
      gsap.to(".right", {
        color: "black",
      });
      gsap.to(".left", {
        color: "var(--medium-grey)",
      });
    }
    if (sliderPosition === "left") {
      gsap.to(".slider", {
        left: "0px",
        ease: "power3.out",
      });
      gsap.to(".left", {
        color: "black",
      });
      gsap.to(".right", {
        color: "var(--medium-grey)",
      });
    }
  });
  return (
    <Wrapper>
      <Holder>
        <TextHolder>
          <Text to={"/auth/login"} className="left">
            Sign in
          </Text>
          <Text to={"/auth/create-acct/personal-details"} className="right">
            Sign up
          </Text>
        </TextHolder>
        <SliderHolder>
          <div className="slider"></div>
        </SliderHolder>
      </Holder>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  display: grid;
  justify-content: center;
  align-items: end;
`;

const Holder = styled.div`
  position: relative;
  width: 180px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TextHolder = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Text = styled(Link)`
  position: relative;
  font-family: "Manrope-SemiBold";
  font-size: 18px;
  cursor: pointer;
`;

const SliderHolder = styled.div`
  position: relative;
  width: 100%;
  height: 6px;
  border-bottom: solid 1px var(--theme-color);

  .slider {
    width: 60px;
    height: 5px;
    background-color: var(--theme-color);
    position: absolute;
    left: 0px;
  }
`;
export default AuthTopBar;
