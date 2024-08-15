import React, { useState } from "react";
import backgroundImage from "/images/bacimg.png";
import styled from "styled-components";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(ninDetails);
  };
  return (
    <Wrapper>
      <nav>
        <h4>NIN Registeration</h4>
      </nav>
      <Holder>
        <p className="header">Please fill the form appropriately</p>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <p>Tell us about yourself</p>
          <label htmlFor="firstName">Firstname</label>
          <input
            type="text"
            name="firstname"
            value={ninDetails.firstName}
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
            onChange={(e) => {
              setNinDetails({
                ...ninDetails,
                email: e.target.value,
              });
            }}
          />

          <button type="submit">Submit</button>
        </form>
      </Holder>
      <img src={backgroundImage} alt="bacground-images" />
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

  nav {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    background-color: red;
    align-items: center;
    max-width: 1280px;
    padding: 0px 20px;
    margin: 0px auto;
  }
  img {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 750px;
    z-index: -1;
    opacity: 0.7;
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

    button {
      width: 130px;
      height: 38px;
      background-color: #3ab93a;
      border: none;
      border-radius: 5px;
      color: white;
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
      width: 100%;
      height: 45px;
      margin-bottom: 20px;
      padding-left: 10px;
      font-size: 15px;
    }
  }
`;

export default GetNIN;
