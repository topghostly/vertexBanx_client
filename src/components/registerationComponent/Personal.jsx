import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Personal({
  setLightUp,
  setregisterationDetails,
  registerationDetails,
}) {
  const navigate = useNavigate();

  const [personalInfo, setPersonalInfo] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    gender: "male",
    nationality: "Nigeria",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setregisterationDetails({
      ...registerationDetails,
      personalDetails: {
        ...registerationDetails.personalDetails,
        ...personalInfo,
      },
    });

    navigate("/auth/create-acct/other-details");
  };

  useEffect(() => {
    setLightUp(1);
  });
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
      <input
        type="text"
        name="firstname"
        placeholder="Firstname"
        value={personalInfo.fullname.firstname}
        onChange={(e) => {
          setPersonalInfo({
            ...personalInfo,
            fullname: { ...personalInfo.fullname, firstname: e.target.value },
          });
        }}
      />

      <input
        type="text"
        name="lastname"
        placeholder="Lastname"
        value={personalInfo.fullname.lastname}
        onChange={(e) => {
          setPersonalInfo({
            ...personalInfo,
            fullname: { ...personalInfo.fullname, lastname: e.target.value },
          });
        }}
      />

      <DropDownForm>
        <label htmlFor="gender ">Gender</label>
        <select
          name="gender"
          placeholder="Gender"
          onChange={(e) => {
            setPersonalInfo({
              ...personalInfo,
              gender: e.target.value,
            });
          }}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="none">none</option>
        </select>
      </DropDownForm>

      <DropDownForm>
        <label htmlFor="nationality ">Nationality</label>
        <select
          name="nationality"
          onChange={(e) => {
            setPersonalInfo({
              ...personalInfo,
              nationality: e.target.value,
            });
          }}
        >
          <option value="Nigeria">Nigeria</option>
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          <option value="Dubai">Dubai</option>
        </select>
      </DropDownForm>

      <button onClick={handleSubmit}>Continue</button>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const DropDownForm = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  label {
    color: var(--dark-grey);
    font-size: var(--text-font);
  }

  select {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    outline: none;
    font-size: var(--text-font);
    border: solid 2px var(--medium-grey);
    background-color: var(--light-grey);
    padding-left: 10px;
    color: var(--dark-grey);
  }
`;
export default Personal;
