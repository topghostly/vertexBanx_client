import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import ProgressBar from "./registerationComponent/ProgressBar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import flag from "/images/flag.png";

function RegisterationPage({
  lightUp,
  setregisterationDetails,
  setSliderPosition,
}) {
  useEffect(() => {
    setSliderPosition("right");
  }, []);
  return (
    <Wrapper
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        delay: 0.2,
        duration: 0.2,
      }}
    >
      <LinktoNIN to={"/get-nin"}>
        Get your NIN <img src={flag} alt="nigeria flag" />
      </LinktoNIN>
      <HeadText>
        <h3 className="big">Create</h3>
        <h3 className="big">account</h3>
      </HeadText>

      <ProgressBar lightUp={lightUp} />
      <FormHolder>
        <form>
          <Outlet setregisterationDetails={setregisterationDetails} />
        </form>
      </FormHolder>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  position: relative;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
`;

const HeadText = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const FormHolder = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    input {
      width: 100%;
      height: 40px;
      outline: none;
      font-size: var(--text-font);
      background: none;
      transition: all 0.2s ease-in-out;
      border-radius: 5px;
      border: solid 2px var(--medium-grey);
      background-color: var(--light-grey);
      padding-left: 10px;
    }

    button {
      width: 110px;
      color: white;
      background-color: black;
      height: 40px;
      outline: none;
      border: solid 1px black;
      border-radius: 6px;
      margin-top: 10px;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      font-family: "Manrope-SemiBold";
      margin: 0px auto;

      P {
        font-size: var(--text-font);
      }

      &:hover {
        background-color: white;
        transition: all 0.2s ease-in-out;
        color: black;
      }
    }
  }
`;

const DropDownForm = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    color: var(--dark-grey);
  }

  select {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: solid 1px var(--dark-grey);
    outline: none;
  }
`;

const LinktoNIN = styled(Link)`
  position: relative;
  right: 20px;
  margin-top: 25px;
  color: green;
  font-family: "Manrope-Bold";
  font-size: 13px;
  display: flex;
  margin: 0px auto;
  transform: translateX(20px);
  justify-content: center;
  gap: 5px;
  width: 150px;
  height: 40px;
  align-items: center;
  background-color: white;
  border-radius: 120px;
  transition: all 0.15s ease-in-out;

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

export default RegisterationPage;
