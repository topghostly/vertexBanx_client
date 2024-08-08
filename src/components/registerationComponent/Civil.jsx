import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Civil({ setLightUp, setregisterationDetails, registerationDetails }) {
  const navigate = useNavigate();

  const [civilInfo, setCivilInfo] = useState({
    mail: "",
    phoneNumber: "",
    employmentStatus: "employed",
    residentialAddress: "",
    bvn: "",
    nin: "",
  });

  const [error, setError] = useState("");

  const validateBVN = (bvn) => {
    const bvnPattern = /^\d{11}$/;
    return bvnPattern.test(bvn);
  };

  const validateNIN = (nin) => {
    const ninPattern = /^\d{11}$/;
    return ninPattern.test(nin);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validBVN = validateBVN(civilInfo.bvn);
    const validNIN = validateNIN(civilInfo.nin);
    const validEmail = validateEmail(civilInfo.mail);

    if (!validBVN) {
      setCivilInfo({ ...civilInfo, bvn: "" });
      return setError("invalid BVN");
    }
    if (!validNIN) {
      setCivilInfo({ ...civilInfo, nin: "" });
      return setError("invalid NIN");
    }
    if (!validEmail) {
      setCivilInfo({ ...civilInfo, mail: "" });
      return setError("invalid mail address");
    }

    setregisterationDetails({
      ...registerationDetails,
      otherDetails: {
        ...registerationDetails.otherDetails,
        ...civilInfo,
      },
    });

    navigate("/auth/create-acct/password-details");
  };

  useEffect(() => {
    setLightUp(2);
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
        type="mail"
        name="mail"
        placeholder="Mail"
        autoComplete="off"
        value={civilInfo.mail}
        onChange={(e) => {
          setCivilInfo({
            ...civilInfo,
            mail: e.target.value,
          });
        }}
      />

      <input
        type="text"
        name="phoneNumber"
        autoComplete="off"
        placeholder="Phone number"
        value={civilInfo.phoneNumber}
        onChange={(e) => {
          setCivilInfo({
            ...civilInfo,
            phoneNumber: e.target.value,
          });
        }}
      />

      <input
        type="text"
        name="residentialAddress"
        autoComplete="off"
        placeholder="Residential address"
        value={civilInfo.residentialAddress}
        onChange={(e) => {
          setCivilInfo({
            ...civilInfo,
            residentialAddress: e.target.value,
          });
        }}
      />

      <DropDownForm>
        <label htmlFor="employmentStatus ">Employment status</label>
        <select
          name="employmentStatus"
          onChange={(e) => {
            setCivilInfo({
              ...civilInfo,
              employmentStatus: e.target.value,
            });
          }}
        >
          <option value="employed">Employed</option>
          <option value="unemployed">UnEmployed</option>
          <option value="student">Student</option>
        </select>
      </DropDownForm>

      <input
        type="text"
        name="bvn"
        autoComplete="off"
        placeholder="BVN"
        value={civilInfo.bvn}
        onChange={(e) => {
          setCivilInfo({
            ...civilInfo,
            bvn: e.target.value,
          });
        }}
      />

      <input
        type="text"
        name="nin"
        autoComplete="off"
        placeholder="National Identification Number"
        value={civilInfo.nin}
        onChange={(e) => {
          setCivilInfo({
            ...civilInfo,
            nin: e.target.value,
          });
        }}
      />
      <div className="foot-part">
        <div className="error-statement">{error}</div>
        <button onClick={handleSubmit}>Continue</button>
      </div>
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
  .foot-part {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;

    .error-statement {
      color: red;
      font-size: var(--text-font);
      font-family: "Manrope-SemiBold";
    }
  }
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
export default Civil;
