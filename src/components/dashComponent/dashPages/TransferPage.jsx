import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import gtbank from "/images/gtbank.png";
import access from "/images/access.png";
import fidelity from "/images/fidelity.jpg";
import vertex from "/images/vertex.jpg";
import { orbit } from "ldrs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import lock from "/images/lock.png";
import gsap from "gsap";
import emailjs from "@emailjs/browser";

import currencyConverter from "../../../../util/balanceConverter";
import Footer from "../../Footer";

function TransferPage({ setAlert }) {
  const navigate = useNavigate();

  const buttonRef = useRef(null);
  const inputRefs = useRef([]);
  const otpRef = useRef([]);

  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [allowTrasfer, setAllowTransfer] = useState(false);
  const [otpPopup, setOtpPopup] = useState(false);
  const [actuallatitude, setActualLatitude] = useState();
  const [actuallongitude, setActualLongitude] = useState();
  const [recievedOtp, setRecievedOtp] = useState("");

  const [userDetails, setUserDetails] = useState(() => {
    const savedUserDetails = localStorage.getItem("userDetails");
    const user = JSON.parse(savedUserDetails);

    if (!user.userDetails) {
      navigate("/u/overview/dashboard");
    }
    return user.userDetails;
  });

  const [transfer, setTransfer] = useState({
    beneficiaryAccountNumber: "",
    amount: "",
    narration: "",
  });

  orbit.register();

  // 2FA Logic
  const triggerTwoFactorAuthentication = () => {};

  //Calculate the distance
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    console.log("Calculating distance");
    const toRadians = (degrees) => degrees * (Math.PI / 180);

    const R = 6371; // Radius of the Earth in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km

    return distance;
  };

  //Validate 2FA transfer mode
  const securityCheck = async (latitude, longitude) => {
    console.log("Started Security check");
    try {
      const ninDetails = await axios.get(
        `http://localhost:3030/nin/get-nin/${userDetails.nin}`
      );

      console.log("The NIN details are", ninDetails);
      if (ninDetails.data.code === "NIN_FOUND") {
        const distance = calculateDistance(
          latitude,
          longitude,
          ninDetails.data.data.latitude,
          ninDetails.data.data.longitude
        );
        if (distance > 5) {
          triggerTwoFactorAuthentication();
        } else {
          await getActualLocation(latitude, longitude);
        }
      }
    } catch (error) {
      console.error("An error occured while getting NIN details");
    }
  };

  // Get actual location
  const getActualLocation = async (latitude, longitude) => {
    console.log(
      "this have started to get the actual location",
      latitude,
      longitude
    );
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    try {
      const response = await axios.get(url);

      const detailLocation = {
        longitude,
        latitude,
        addressName: response.data.display_name,
        county: response.data.address.county,
        state: response.data.address.state,
        ISO: response.data.address["ISO3166-2-lvl4"],
        country: response.data.address.country,
        countryCode: response.data.address.country_code,
      };

      console.log("Now the address is", detailLocation);

      const payload = {
        location: detailLocation,
        beneficiaryAccountNumber: transfer.beneficiaryAccountNumber,
        amount: transfer.amount,
        narration: transfer.narration,
        senderAccountNumber: userDetails.AccountNumber,
        senderName: {
          firstName: userDetails.fullName.firstName,
          lastName: userDetails.fullName.lastName,
        },
      };

      try {
        const verificationResponce = await axios.post(
          "http://localhost:3030/v0/api/verify/",
          payload
        );
        console.log("The responce from the back is", verificationResponce);

        if (verificationResponce.data.status === "SUCCESS") {
          setOtp(["", "", "", ""]);
          setOtpPopup(false);
          setLoading(false);
          setTransfer({
            beneficiaryAccountNumber: "",
            amount: "",
            narration: "",
          });
          setBeneficiaryName("");
          setAlert({
            alertState: true,
            alertType: "Success",
            alertDetails: "Transfer successful",
          });
        } else if (verificationResponce.data.status === "FAILED") {
          setLoading(false);
          setTransfer({
            beneficiaryAccountNumber: "",
            amount: "",
            narration: "",
          });
          setBeneficiaryName("");
          setAlert({
            alertState: true,
            alertType: "Failed",
            alertDetails: "Transfer failed, try again",
          });
        }
      } catch (error) {
        setLoading(false);
        console.error(
          "An error occured when sending details to the backside",
          error
        );
      }
    } catch (error) {
      setLoading(false);
      console.error(
        "An error occured while getting the actual location",
        error
      );
      setAlert({
        alertState: true,
        alertType: "FAILED",
        alertDetails: "An error occured",
      });
    }
  };

  //Check for valid phone number
  const isValidPhoneNumber = (input) => {
    const regex = /^\d{10}$/;
    return regex.test(input);
  };

  //Check for valid amount
  const validAmount = () => {
    const inputedAmount = Number(transfer.amount);
    const actualAmount = userDetails.balance;

    if (inputedAmount < actualAmount) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async () => {
    console.log("Start first submit");
    setLoading(true);
    if (!isValidPhoneNumber(transfer.beneficiaryAccountNumber)) {
      setTransfer({ ...transfer, beneficiaryAccountNumber: "" });
      return setError("Invalid account number");
    }
    if (!validAmount()) {
      setTransfer({ ...transfer, amount: "" });
      return setError("Insufficient funds");
    }
    if (!transfer.narration) {
      return setError("Please add a narration");
    }

    // Get the user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setActualLatitude(latitude);
          setActualLongitude(longitude);
          await securityCheck(latitude, longitude);
        },
        (err) => {
          setError(err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setLoading(false);
      setError("Geolocation is not supported by this browser.");
    }
  };

  //Get the beneficiary name
  const getBeneficiaryName = async (accountNumber) => {
    console.log("The account number is", accountNumber);
    console.log("this is the beginnign of the beneficairy name logic starting");
    try {
      const beneficiaryName = await axios.post(
        "http://localhost:3030/v0/api/get/beneficiary-name",
        { beneficiaryAccountNumber: accountNumber }
      );

      if (beneficiaryName.data.status === "SUCCESS") {
        setAllowTransfer(true);
        setBeneficiaryName(beneficiaryName.data.data);
      } else if (beneficiaryName.data.code === "INVALID_ACCOUNT_NUMBER") {
        setBeneficiaryName("USER_NOT_FOUND");
      }
    } catch (error) {
      console.error(
        "An error occured while getting the baneficiary name",
        error
      );
      setBeneficiaryName("...");
    }
  };

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
      <Holder>
        <section className="heading">
          <h3>Transfer Money</h3>
          <p className="small">Transfer to other bank beneficiary</p>
        </section>

        <section className="form-content">
          <InputHolder>
            <div className="user-name all-caps">
              <p>
                {userDetails.fullName.firstName} {userDetails.fullName.lastName}
              </p>
            </div>
            <div className="flex-2">
              <p className="small">{userDetails.AccountNumber}</p>
              <p className="small">{currencyConverter(userDetails.balance)}</p>
            </div>
          </InputHolder>
          <div className="label-holder">
            <label htmlFor="baneficiary-bank">Beneficiary Bank</label>
            <InputHolder>
              <div className="bank-image-holder">
                <div className="text-image-holder">
                  <ImageHolder background={vertex} />
                  <p className="small">Vertex Bank</p>
                </div>
                <div className="text-image-holder">
                  <ImageHolder background={gtbank} />
                  <p className="small">GtBank</p>
                </div>
                <div className="text-image-holder">
                  <ImageHolder background={access} />
                  <p className="small">Access Bank</p>
                </div>
                <div className="text-image-holder">
                  <ImageHolder background={fidelity} />
                  <p className="small">Fidelity Bank</p>
                </div>
              </div>
            </InputHolder>
          </div>
          <div className="label-holder">
            <label htmlFor="beneficiary-number">
              Beneficiary Account Number
            </label>
            <InputHolder>
              <input
                type="text"
                name="beneficiary-number"
                autoComplete="off"
                maxLength="10"
                value={transfer.beneficiaryAccountNumber}
                onChange={(e) => {
                  setTransfer({
                    ...transfer,
                    beneficiaryAccountNumber: e.target.value,
                  });

                  if (e.target.value.length === 10) {
                    console.log("Counted 10");
                    setBeneficiaryName("...");
                    getBeneficiaryName(e.target.value);
                  } else if (e.target.value.length !== 10) {
                    setAllowTransfer(false);
                    setBeneficiaryName("");
                  }
                }}
              />
            </InputHolder>
            <p className="account-name small">{beneficiaryName}</p>
          </div>
          <div className="label-holder">
            <label htmlFor="amount">Amount</label>
            <InputHolder>
              <input
                type="number"
                name="amount"
                value={transfer.amount}
                onChange={(e) => {
                  setTransfer({
                    ...transfer,
                    amount: e.target.value,
                  });
                }}
              />
            </InputHolder>
          </div>
          <div className="label-holder">
            <label htmlFor="narration">Narration</label>
            <InputHolder>
              <textarea
                name="narration"
                value={transfer.narration}
                cols={200}
                onChange={(e) => {
                  setTransfer({
                    ...transfer,
                    narration: e.target.value,
                  });
                }}
              ></textarea>
            </InputHolder>
          </div>
        </section>
        <div className="bottom">
          <p className="error">{error}</p>

          {loading ? (
            <l-orbit size="31" speed="1.5" color="black"></l-orbit>
          ) : (
            <button
              ref={buttonRef}
              onClick={() => {
                if (allowTrasfer) {
                  handleSubmit();
                }
              }}
            >
              {allowTrasfer ? <p>Transfer fund</p> : <p>Please wait...</p>}
            </button>
          )}
        </div>
        <Footer />
      </Holder>
      <TwoFactorAuth>
        <Holder2FA ref={otpRef}>
          <img src={lock} alt="padlock otp image" />
          <p className="head">
            We noticed that your current location does not match your registered
            residential location. For your security, please enter the One-Time
            Password (OTP) sent to your registered phone number or email address
            to complete this transaction.
          </p>
          <InputContainer>
            {otp.map((_, index) => (
              <OTPBox
                key={index}
                maxLength={1}
                value={otp[index]}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </InputContainer>
          {loading ? (
            <l-orbit size="31" speed="1.5" color="black"></l-orbit>
          ) : (
            <Button onClick={() => handleOtpSubmit()}>Transfer</Button>
          )}
        </Holder2FA>
      </TwoFactorAuth>
    </Wrapper>
  );
}

const Wrapper = styled(motion.section)`
  position: relative;
`;
const Holder = styled.div`
  position: relative;
  /* height: 100%; */
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 0px auto;
  padding: 10px;

  section.heading {
    display: flex;
    flex-direction: column;
    gap: 5px;
    text-align: center;
    h3 {
      font-size: 30px;
    }
    p {
      font-family: "Manrope-Bold";
    }
  }

  section.form-content {
    display: flex;
    flex-direction: column;
    gap: 25px;

    .label-holder {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 4px;

      .account-name {
        height: 10px;
      }

      label {
        font-size: var(--text-font);
        font-family: "Manrope-Bold";
      }

      p.account-name {
        font-family: "Manrope-Bold";
        text-transform: uppercase;
      }
    }
  }

  .bottom {
    .error {
      font-size: 11px;
      font-family: "Manrope-Bold";
      color: red;

      margin-bottom: 5px;
    }
  }

  button {
    background-color: black;
    height: 42px;
    width: 130px;
    border-radius: 6px;
    border: solid 1px black;
    outline: none;
    font-family: "Manrope-Bold";
    transition: all 0.3s ease-in-out;
    p {
      color: white;
      font-size: 13px;
    }

    &:hover {
      background-color: white;
      color: black;
      transition: all 0.3s ease-in-out;
      cursor: pointer;

      p {
        color: black;
      }
    }
  }
`;

const InputHolder = styled.div`
  outline: none;
  transition: all 0.2s ease-in-out;
  border-radius: 5px;
  /* border: solid 2px var(--medium-grey); */
  background-color: var(--light-grey);
  padding: 10px;

  input {
    width: 100%;
    height: 30px;
    background: none;
    border: none;
    outline: none;
    font-family: "Manrope-Bold";
  }

  textarea {
    max-width: 100%;
    height: 60px;
    background: none;
    border: none;
    outline: none;
    font-family: "Manrope-Bold";
  }

  .all-caps {
    p {
      text-transform: uppercase;
      font-size: var(--text-font);
      font-family: "Manrope-Bold";
    }
  }
  .flex-2 {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
  }
  .bank-image-holder {
    width: 100%;
    display: grid;
    grid-template-columns: 20% 20% 20% 20%;
    height: 110px;
    place-content: center;
    justify-content: space-evenly;

    .text-image-holder {
      width: 100%;
      display: grid;
      grid-template-rows: 1fr 15px;
      /* gap: 5px; */
      height: 80px;

      P {
        font-family: "Manrope-Bold";
        text-align: center;
      }
    }
  }
`;

const ImageHolder = styled.div`
  width: 70%;
  aspect-ratio: 1;
  background-color: var(--theme-color);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-image: url(${(props) => props.background});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  margin: 0px auto;

  &:hover {
    transition: all 0.2s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;
export default TransferPage;
