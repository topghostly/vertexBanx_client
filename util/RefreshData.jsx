import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import lock from "/images/lock.png";
import styled from "styled-components";
import gsap from "gsap";
import emailjs from "@emailjs/browser";

const RefreshDatabase = ({ setRefreshDetails, setBalLoad }) => {
  const navigate = useNavigate();

  const inputRefs = useRef([]);
  const otpRef = useRef([]);

  const [otp, setOtp] = useState(["", "", "", ""]);

  const [otpPopup, setOtpPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actuallatitude, setActualLatitude] = useState();
  const [actuallongitude, setActualLongitude] = useState();
  const [verificationID, setVerificationID] = useState();
  const [recievedOtp, setRecievedOtp] = useState("");
  const [updateHandled, setUpdateHandled] = useState(false);
  const [userDetails, setUserDetails] = useState(() => {
    const savedUserDetails = localStorage.getItem("userDetails");
    const user = JSON.parse(savedUserDetails);
    if (!user.userDetails) {
      navigate("/auth/login");
    }
    return user.userDetails;
  });

  const userAccountNumber = userDetails.AccountNumber;

  if (!userAccountNumber) {
    console.log("Can't get user account number for the update function");
    navigate("/auth/login");
    return null;
  }

  //OTP boxes logic
  const handleChange = (value, index) => {
    if (!/^[0-9]$/.test(value)) return; // Allow only numerical values

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input box if a value is entered
    if (value !== "" && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Whne the Otp key id pressed down
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        // Move to the previous input box on backspace if the current box is empty
        inputRefs.current[index - 1].focus();
      } else {
        // Clear the current input value on backspace
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  // Code for when user submits the OTP
  const handleOtpSubmit = async () => {
    console.log("Otp inoutted");
    const otpValue = otp.join("");

    if (recievedOtp === otpValue) {
      setLoading(true);
      setOtpPopup(false);
      try {
        let beneficiaryLocation = await getActualLocation(
          actuallatitude,
          actuallongitude
        );

        const response = await axios.post(
          `http://localhost:3030/v0/api/verify/delete/${verificationID}`,
          { beneficiaryLocation }
        );

        if (response.data.status === "SUCCESS") {
          setBalLoad(true);
          localStorage.setItem(
            "userDetails",
            JSON.stringify(response.data.data)
          );
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setBalLoad(false);
          setRefreshDetails(true);
        }
      } catch (error) {}
    } else {
      alert("Invalid One Time Password");
    }
  };

  // Logic for the expiration time
  const generateExpTime = () => {
    try {
      const currentTime = new Date();
      const expTime = new Date(currentTime.getTime() + 4 * 60000);

      const hr = String(expTime.getHours()).padStart(2, "0");
      const mint = String(expTime.getMinutes()).padStart(2, "0");

      const formattedExpTime = `${hr}:${mint}`;

      return formattedExpTime;
    } catch (error) {
      console.log(error);
      return "5 minutes";
    }
  };

  // Send otp to emall
  const sendOtp = async (otp, userMail) => {
    const templateParams = {
      to_email: userMail,
      otp,
      expTime: generateExpTime(),
    };

    console.log("Started sending mail");
    emailjs
      .send(
        "service_atc86bv",
        "template_90jyytl",
        templateParams,
        "JjaRLIhcF0urdjSfX"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setOtpPopup(true);
          setLoading(false);
        },
        (error) => {
          console.error("FAILED...", error);
          alert("An unexpected error occured");
        }
      );
  };

  // Get the actual location of the user
  const getActualLocation = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    try {
      const response = await axios.get(url);
      console.log("The actual location responce is", response);
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
      // console.log("Now the address is", detailLocation);
      return detailLocation;
    } catch (error) {
      console.error(
        "An error occurred while getting the actual location",
        error
      );
    }
  };

  // Calculate teh distance of the suer from base address
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
    const distance = R * c;
    console.log("The distance is", distance);

    return distance;
  };

  // 2FA Logic
  const triggerTwoFactorAuthentication = async () => {
    console.log("Started 2FA");
    try {
      const OTP = Math.floor(1000 + Math.random() * 9000).toString();
      console.log("the OTP is", OTP);
      setRecievedOtp(OTP);
      await sendOtp(OTP, userDetails.emailAddress);
    } catch (error) {
      console.log("A error occured while validating the transfer", error);
      alert("A error occured while validating the transfer", error);
    }
  };

  //Security check
  const securityCheck = async (latitude, longitude) => {
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
          let beneficiaryLocation = await getActualLocation(
            latitude,
            longitude
          );

          const response = await axios.post(
            `http://localhost:3030/v0/api/verify/delete/${verificationID}`,
            { beneficiaryLocation }
          );

          if (response.data.status === "SUCCESS") {
            setBalLoad(true);
            localStorage.setItem(
              "userDetails",
              JSON.stringify(response.data.data)
            );
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setBalLoad(false);
            setRefreshDetails(true);
          }
        }
      }
    } catch (error) {
      console.error("An error occured while getting NIN details");
    }
  };

  // logic for if new update is found
  const newUpdateHandler = useCallback(async () => {
    if (updateHandled) return;
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            console.log("The coordinates are", latitude, longitude);
            setActualLatitude(latitude);
            setActualLongitude(longitude);
            await getActualLocation(latitude, longitude);
            // await securityCheck(latitude, longitude);
          },
          (err) => {
            console.error("Geolocation error", err);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  }, [setRefreshDetails]);

  // Otp pop up logic and animatiom
  useEffect(() => {
    if (!otpPopup) {
      const tl1 = gsap.timeline();
      tl1.to(otpRef.current, {
        top: "200%",
        duration: 0.6,
        ease: "power3.in",
      });
    }

    if (otpPopup) {
      gsap.fromTo(
        otpRef.current,
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
  }, [otpPopup]);

  const fetchUpdate = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3030/v0/api/verify/update/${userAccountNumber}`
      );
      if (
        response.data.code === "FOUND_NEW_TRANSACTION_UPDATE" &&
        !updateHandled
      ) {
        setVerificationID(response.data.date._id);
        // await newUpdateHandler();
        await newUpdateHandler(response.data.date._id);
        // console.log("New update found");
      } else if (response.data.code === "NO_NEW_UPDATE") {
        // console.log("No update found");
      }
    } catch (err) {
      // console.error("An error occurred while fetching update", err);
    }
  }, [userAccountNumber]);

  useEffect(() => {
    const updateInterval = setInterval(fetchUpdate, 5000);
    return () => clearInterval(updateInterval);
  }, [fetchUpdate]);

  return (
    <TwoFactorAuth>
      <Holder2FA ref={otpRef}>
        <img src={lock} alt="padlock otp image" />
        <p className="head">
          We noticed that you're currently 5 kilometers away from your
          registered NIN address. For your security, please enter the OTP sent
          to your registered contact to complete this transaction.
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
  );
};

const TwoFactorAuth = styled.div`
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

const Holder2FA = styled.div`
  position: absolute;
  width: 95%;
  max-width: 400px;
  height: 500px;
  background-color: #ffffff;
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
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  img {
    width: 220px;
  }

  p.head {
    font-size: 12px;
    font-family: "Manrope-Bold";
    color: var(--theme-color);
    width: 90%;
  }
`;

const Button = styled.button`
  width: 140px;
  height: 38px;
  background-color: var(--theme-color);
  border: solid 1px var(--theme-color);
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

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const OTPBox = styled.input`
  width: 60px;
  height: 60px;
  text-align: center;
  font-size: 24px;
  border: 2px solid #ccc;
  background-color: #ffffff;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
  }
`;

export default RefreshDatabase;
