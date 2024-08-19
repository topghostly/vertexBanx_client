import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import AuthTopBar from "../components/AuthTopBar";
import { Link } from "react-router-dom";
import background from "/images/authback.png";
import flag from "/images/flag.png";

// Media Import
import logo from "/images/VERTEX-04.png";
import { Outlet } from "react-router-dom";

function Login({ sliderPosition, setSliderPosition }) {
  return (
    <Wrapper>
      <SectionWrapper className="contained">
        <LogoHolder>
          <img src={logo} alt="vertex-logo" />
        </LogoHolder>
        <FormSection>
          <AuthTopBar
            sliderPosition={sliderPosition}
            setSliderPosition={setSliderPosition}
          />
          <Outlet />
        </FormSection>
      </SectionWrapper>
      <ImageWrapper background={background}>
        <LinktoNIN to={"/get-nin"}>
          Get your NIN <img src={flag} alt="nigeria flag" />
        </LinktoNIN>
      </ImageWrapper>
    </Wrapper>
  );
}

const Wrapper = styled(motion.section)`
  width: 100%;
  min-height: 100vh;
  background-color: black;
  display: grid;
  grid-template-columns: 350px 1fr;

  @media screen and (max-width: 540px) {
    display: block;
  }
`;

const SectionWrapper = styled.div`
  position: relative;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: flex-end;
`;

const FormSection = styled.section`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-rows: 80px 1fr;
  background-color: #ffffff;
  overflow-y: scroll;
  padding-bottom: 30px;

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
`;

const LogoHolder = styled.div`
  position: absolute;
  width: fit-content;
  height: fit-content;
  top: 50px;
  left: 0;
  img {
    width: 200px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.background});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  @media screen and (max-width: 540px) {
    display: none;
  }
`;

const LinktoNIN = styled(Link)`
  position: absolute;
  right: 20px;
  margin-top: 25px;
  color: green;
  font-family: "Manrope-Bold";
  font-size: 13px;
  display: flex;
  justify-content: center;
  gap: 5px;
  width: 150px;
  height: 40px;
  align-items: center;
  background-color: white;
  border-radius: 120px;
  transition: all 0.15s ease-in-out;

  @media screen and (max-width: 590px) {
    display: none;
  }

  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transition: all 0.15s ease-in-out;
  }

  img {
    width: 15px;
    height: 15px;
    align-self: center;
  }
`;
export default Login;
