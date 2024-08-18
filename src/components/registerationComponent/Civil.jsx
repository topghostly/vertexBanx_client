import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

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

  const [verifiedNin, setVerifiedNin] = useState(false);

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

  const verifyNIN = async (nin) => {
    console.log("Started verifing NIN");
    try {
      const ninDetails = await axios.get(
        `http://localhost:3030/nin/get-nin/${nin}`
      );
      console.log("The NIN details", ninDetails);

      if (ninDetails.data.code === "NIN_FOUND") {
        setVerifiedNin(true);
      } else {
        setVerifiedNin(false);
      }
    } catch (error) {
      console.error("An error occured while getting NIN details");
    }
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
        placeholder="Residential address (LGA, State)"
        style={{ textTransform: "capitalize" }}
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

          if (e.target.value.length === 11) {
            console.log("Counted 11");
            verifyNIN(e.target.value);
          } else if (e.target.value.length !== 11) {
            setVerifiedNin(false);
          }
        }}
      />
      {/* {verifiedNin ? (
        <p className="nin-apprved">Valid NIN</p>
      ) : (
        <p className="nin-disapprove">Invalid NIN</p>
      )} */}
      <div className="foot-part">
        <div className="error-statement">{error}</div>
        {verifiedNin ? (
          <button onClick={handleSubmit}>Continue</button>
        ) : (
          <InactiveButton
            style={{
              backgroundColor: "grey",
              border: "solid 1px grey",
            }}
          >
            Invalid NIN
          </InactiveButton>
        )}
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

  .nin-apprved {
    color: #106310;
    font-size: 12px;
    font-family: "Manrope-Bold";
  }
  .nin-disapprove {
    color: red;
    font-family: "Manrope-Bold";
    font-size: 12px;
  }
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

const InactiveButton = styled.button`
  position: relative;
  width: 110px;
  color: #636363;
  background-color: #7c7c7c;
  height: 40px;
  outline: none;
  border: solid 1px black;
  border-radius: 6px;
  margin-top: 10px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  font-family: "Manrope-SemiBold";
  margin: 0px auto;
`;
export default Civil;
