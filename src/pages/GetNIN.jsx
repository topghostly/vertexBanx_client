import React, { useRef, useState } from "react";
import backgroundimage from "/images/ninbackground.jpg";
import logo from "/images/ninlogo.png";
import styled from "styled-components";
import axios from "axios";

function GetNIN() {
  const [ninDetails, setNinDetails] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    stateOfOrigin: "",
    lgaOfOrigin: "",
    resStreet: "",
    resLGA: "",
    resState: "",
    phoneNumber: "",
    email: "",
  });

  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState("");

  const alertRef = useRef(null);
  const charUppercase = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  const checkState = (value) => {
    value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    if (!value.toLowerCase().endsWith(" state")) {
      value += " State";
    }
    return value;
  };

  const validateFields = () => {
    const {
      firstName,
      lastName,
      dateOfBirth,
      stateOfOrigin,
      lgaOfOrigin,
      resStreet,
      resLGA,
      resState,
      phoneNumber,
      email,
    } = ninDetails;

    if (!firstName.trim()) return "First Name is required";
    if (!lastName.trim()) return "Last Name is required";
    if (!dateOfBirth) return "Date of Birth is required";
    if (!stateOfOrigin.trim()) return "State of Origin is required";
    if (!lgaOfOrigin.trim()) return "LGA of Origin is required";
    if (!resStreet.trim()) return "Residential Street Name is required";
    if (!resLGA.trim()) return "Residential LGA is required";
    if (!resState.trim()) return "Residential State is required";

    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(phoneNumber)) return "Phone number must be 11 digits";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email address";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError("");
    const error = validateFields();
    if (error) {
      //   alert(error);
      setFormError(error);
      return;
    }

    setLoading(true);

    const formattedNinDetails = {
      firstName: charUppercase(ninDetails.firstName),
      lastName: charUppercase(ninDetails.lastName),
      dateOfBirth: ninDetails.dateOfBirth,
      stateOfOrigin: checkState(ninDetails.stateOfOrigin),
      lgaOfOrigin: charUppercase(ninDetails.lgaOfOrigin),
      resStreet: charUppercase(ninDetails.resStreet),
      resLGA: charUppercase(ninDetails.resLGA),
      resState: checkState(ninDetails.resState),
      phoneNumber: ninDetails.phoneNumber,
      email: ninDetails.email,
    };

    const location = `${formattedNinDetails.resStreet} ${formattedNinDetails.resLGA}, ${formattedNinDetails.resState}`;

    const payload = {
      ...formattedNinDetails,
      location,
    };

    try {
      const response = await axios.post(
        "http://localhost:3030/nin/register-nin",
        payload
      );

      if (response.data.status === "SUCCESS") {
        setLoading(false);
        alert(`NIN registered successfully, NIN: ${response.data.data.nin}`);
        setNinDetails({
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          stateOfOrigin: "",
          lgaOfOrigin: "",
          resStreet: "",
          resLGA: "",
          resState: "",
          phoneNumber: "",
          email: "",
        });
      } else if (response.data.code === "EXISTING_NIN") {
        setLoading(false);
        alert("The User already exist");
        setNinDetails({
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          stateOfOrigin: "",
          lgaOfOrigin: "",
          resStreet: "",
          resLGA: "",
          resState: "",
          phoneNumber: "",
          email: "",
        });
      } else {
        setLoading(false);
        alert("An error occured, please try again");
      }
    } catch (error) {
      setLoading(false);
      alert("An error occurred, please try again");
      setNinDetails({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        stateOfOrigin: "",
        lgaOfOrigin: "",
        resStreet: "",
        resLGA: "",
        resState: "",
        phoneNumber: "",
        email: "",
      });
    }
  };

  return (
    <Wrapper backimage={backgroundimage}>
      <nav>
        <img src={logo} alt="" />
      </nav>
      <Holder>
        <p className="header">Please fill the form appropriately</p>
        <form onSubmit={handleSubmit}>
          <p>Tell us about yourself</p>
          <label htmlFor="firstName">Firstname</label>
          <input
            type="text"
            name="firstname"
            value={ninDetails.firstName}
            autoComplete="off"
            onChange={(e) => {
              setNinDetails({
                ...ninDetails,
                firstName: e.target.value,
              });
            }}
          />
          <label htmlFor="lastName">Lastname</label>
          <input
            type="text"
            name="lastName"
            value={ninDetails.lastName}
            autoComplete="off"
            onChange={(e) => {
              setNinDetails({
                ...ninDetails,
                lastName: e.target.value,
              });
            }}
          />
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={ninDetails.dateOfBirth}
            autoComplete="off"
            onChange={(e) => {
              setNinDetails({
                ...ninDetails,
                dateOfBirth: e.target.value,
              });
            }}
          />
          <p>Where are you from</p>
          <label htmlFor="stateOfOrigin">State of Origin</label>
          <input
            type="text"
            name="stateOfOrigin"
            value={ninDetails.stateOfOrigin}
            autoComplete="off"
            onChange={(e) => {
              setNinDetails({
                ...ninDetails,
                stateOfOrigin: e.target.value,
              });
            }}
          />
          <label htmlFor="lgaOfOrigin">LGA</label>
          <input
            type="text"
            name="lgaOfOrigin"
            value={ninDetails.lgaOfOrigin}
            autoComplete="off"
            onChange={(e) => {
              setNinDetails({
                ...ninDetails,
                lgaOfOrigin: e.target.value,
              });
            }}
          />
          <p>Where do you live</p>
          <label htmlFor="resStreet">Residential Street Name</label>
          <input
            type="text"
            name="resStreet"
            value={ninDetails.resStreet}
            autoComplete="off"
            onChange={(e) => {
              setNinDetails({
                ...ninDetails,
                resStreet: e.target.value,
              });
            }}
          />
          <label htmlFor="resLGA">Residential LGA</label>
          <input
            type="text"
            name="resLGA"
            value={ninDetails.resLGA}
            autoComplete="off"
            onChange={(e) => {
              setNinDetails({
                ...ninDetails,
                resLGA: e.target.value,
              });
            }}
          />
          <label htmlFor="resState">Residential State</label>
          <input
            type="text"
            name="resState"
            value={ninDetails.resState}
            autoComplete="off"
            onChange={(e) => {
              setNinDetails({
                ...ninDetails,
                resState: e.target.value,
              });
            }}
          />
          <p>Your contact information</p>
          <label htmlFor="phone-number">Phone number</label>
          <input
            type="text"
            name="phone-number"
            value={ninDetails.phoneNumber}
            autoComplete="off"
            onChange={(e) => {
              setNinDetails({
                ...ninDetails,
                phoneNumber: e.target.value,
              });
            }}
          />
          <label htmlFor="email">Email Address</label>
          <input
            type="mail"
            name="email"
            value={ninDetails.email}
            autoComplete="off"
            onChange={(e) => {
              setNinDetails({
                ...ninDetails,
                email: e.target.value,
              });
            }}
          />
          <p className="error">{formError}</p>
          <button type="submit">{loading ? "Registering" : "Submit"}</button>
        </form>
      </Holder>
      <CreditAlert ref={alertRef}>
        <p>NIN created successfully</p>
      </CreditAlert>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  flex-direction: column;
  gap: 30px;
  padding-bottom: 30px;
  background-image: url(${(props) => props.backimage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  nav {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 120px;
    align-items: center;
    max-width: 1280px;
    padding: 0px 20px;
    margin: 0px auto;
  }
`;

const Holder = styled.section`
  position: relative;
  width: 96%;
  min-height: 100vh;
  max-width: 400px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
  border-radius: 10px;
  padding: 30px 10px;
  background-color: white;

  p.header {
    font-family: "Manrope-Bold";
    text-align: center;
    font-size: 20px;
  }

  form {
    width: 99%;
    display: flex;
    flex-direction: column;
    gap: 5px;

    p.error {
      color: red;
      font-size: 11px;
      font-family: "Manrope-Bold";
      margin-top: 10px;
    }

    button {
      width: 130px;
      height: 38px;
      background-color: #28915d;
      border: none;
      border-radius: 5px;
      color: white;
      cursor: pointer;
      margin-top: 10px;
      transition: all 0.1s ease-in-out;

      &:hover {
        transition: all 0.1s ease-in-out;
        background-color: green;
      }
    }

    p {
      font-size: 15px;
      font-family: "Manrope-Bold";
      margin-bottom: 10px;
    }

    label {
      font-family: "Manrope-Bold";
      font-size: 12px;
    }

    input {
      width: 98%;
      height: 45px;
      margin-bottom: 20px;
      padding-left: 10px;
      font-size: 15px;
      margin: 0px auto;
    }
  }
`;

const CreditAlert = styled.div`
  padding: 10px 20px;
  width: 100%;
  max-width: 300px;
  background-color: #67cc67;
  border: solid 2px #96d496;
  color: white;
  position: fixed;
  left: 50%;
  top: -300px;
  transform: translateX(-50%);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  P {
    font-size: 14px;
  }
`;

export default GetNIN;
