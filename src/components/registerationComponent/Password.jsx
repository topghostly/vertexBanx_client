import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

function Password({
  setLightUp,
  setregisterationDetails,
  registerationDetails,
  setAlert,
  setHandleRegistration,
}) {
  const [passwordInfo, setPasswordInfo] = useState({
    password: "",
    transactionPin: "",
  });

  const verifyDetails = () => {
    if (
      registerationDetails.personalDetails == {} ||
      registerationDetails.otherDetails == {} ||
      registerationDetails.passwordDetails == {}
    ) {
      verifyDetails();
    } else {
      const registerationInfo = {
        personalInfo: registerationDetails.personalDetails,
        otherInfo: registerationDetails.otherDetails,
        passwordInfo: registerationDetails.passwordDetails,
      };
      return registerationInfo;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await setregisterationDetails({
      ...registerationDetails,
      passwordDetails: {
        ...registerationDetails.passwordDetails,
        ...passwordInfo,
      },
    });

    setHandleRegistration(true);
  };

  useEffect(() => {
    setLightUp(3);
  });
  useEffect(() => {});

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
        type="password"
        name="password"
        placeholder="Password"
        value={passwordInfo.password}
        onChange={(e) => {
          setPasswordInfo({
            ...passwordInfo,
            password: e.target.value,
          });
        }}
      />

      <input
        type="password"
        name="transactionPin"
        placeholder="Transaction pin"
        value={passwordInfo.transactionPin}
        onChange={(e) => {
          setPasswordInfo({
            ...passwordInfo,
            transactionPin: e.target.value,
          });
        }}
      />

      {/* <input
        type="number"
        name="initialDeposit"
        placeholder="Initial Deposite"
        value={passwordInfo.initialDeposit}
        onChange={(e) => {
          setPasswordInfo({
            ...passwordInfo,
            initialDeposit: e.target.value,
          });
        }}
      /> */}

      <button onClick={(e) => handleSubmit(e)}>Submit</button>
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

export default Password;
