import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import gtbank from "/images/gtbank.png";
import access from "/images/access.png";
import fidelity from "/images/fidelity.jpg";
import vertex from "/images/vertex.jpg";
import { orbit } from "ldrs";
import axios from "axios";

import currencyConverter from "../../../../util/balanceConverter";
import PinPage from "../micro/PinPage";

function TransferPage({ setAlert }) {
  const buttonRef = useRef(null);

  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [userDetails, setUserDetails] = useState(() => {
    const savedUserDetails = localStorage.getItem("userDetails");
    const user = JSON.parse(savedUserDetails);

    return user.userDetails;
  });

  const [transfer, setTransfer] = useState({
    beneficiaryAccountNumber: "",
    amount: "",
    narration: "",
  });

  orbit.register();

  // Get actual location
  const getActualLocation = async (latitude, longitude) => {
    console.log("this have started", latitude, longitude);
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
          setLoading(false);
          setTransfer({
            beneficiaryAccountNumber: "",
            amount: "",
            narration: "",
          });
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

  const isValidPhoneNumber = (input) => {
    const regex = /^\d{10}$/;
    return regex.test(input);
  };

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
          await getActualLocation(latitude, longitude);
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setLoading(false);
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {}, [beneficiaryName]);
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
                value={transfer.beneficiaryAccountNumber}
                onChange={(e) => {
                  setTransfer({
                    ...transfer,
                    beneficiaryAccountNumber: e.target.value,
                  });
                }}
              />
            </InputHolder>
            <p className="account-name small">{beneficiaryName}</p>
          </div>

          <div className="label-holder">
            <label htmlFor="amount">Amount</label>
            <InputHolder>
              <input
                type="text"
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
            <button ref={buttonRef} onClick={handleSubmit}>
              <p>Transfer fund</p>
            </button>
          )}
        </div>
      </Holder>
    </Wrapper>
  );
}

const Wrapper = styled(motion.section)`
  position: relative;
`;
const Holder = styled.div`
  position: relative;
  height: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 0px auto;

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
