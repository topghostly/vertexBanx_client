import React, { useEffect, useState } from "react";
import styled from "styled-components";
import currencyConverter from "../../util/balanceConverter";
import logo from "/images/admin.png";
import axios from "axios";

function Admin() {
  const [transactionID, setTransactionID] = useState("");
  const [details, setDetails] = useState();
  const [localDate, setLocalDate] = useState();

  const getDetails = async (id) => {
    setDetails();
    try {
      const transactionDetails = await axios.get(
        `https://vertex-server-9jyo.onrender.com/v0/api/verify/get-transfer/${id}`
      );
      setDetails(transactionDetails.data.date);
      console.log("The detaisl state is", details);
    } catch (error) {
      console.error(
        "An error occured while geting the single transaction",
        error
      );
    }
  };
  useEffect(() => {
    if (details) {
      const date = new Date(details.createdAt);

      const theDtae = date.toLocaleString();
      setLocalDate(theDtae);
    }
  });
  return (
    <Wrapper>
      <Holder>
        {/* <Auth>
          <div className="logo">
            <img src={logo} alt="admin-logo" />
          </div>
          <form>
            <input type="mail" placeholder="Email Address" />
            <input type="password" placeholder="Password" />
            <button>Sign in</button>
          </form>
        </Auth> */}
        <MainPage>
          <nav>
            <div className="logo">
              <img src={logo} alt="admin-logo" />
            </div>
          </nav>

          <ViewPort>
            <p className="heading">
              Paste the ID number of the transaction reciept to get the sender
              and beneficiary details at the point of transaction.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                getDetails(transactionID);
              }}
            >
              <input
                type="text"
                placeholder="Transaction ID"
                value={transactionID}
                onChange={(e) => {
                  setTransactionID(e.target.value);
                }}
              />
              <button type="submit">Get details</button>
            </form>
            <div className="loader"></div>
            {details && (
              <Result>
                <h4>General details</h4>
                <Detail>
                  Amount:{" "}
                  <span className="bold">
                    {currencyConverter(details.amount)}
                  </span>
                </Detail>
                <Detail>
                  Time: <span className="bold">{localDate}</span>
                </Detail>
                <Detail>
                  Narration: <span className="bold">{details.narration}</span>
                </Detail>
                <Detail>
                  Status:
                  <span className="bold">{details.transactionStatus}</span>
                </Detail>

                <h4>Sender details</h4>
                <Detail>
                  Name:
                  <span className="bold">
                    {details.senderName.firstName} {details.senderName.lastName}
                  </span>
                </Detail>
                <Detail>
                  Country:{" "}
                  <span className="bold">{details.senderLocation.country}</span>
                </Detail>
                <Detail>
                  State:{" "}
                  <span className="bold">{details.senderLocation.state}</span>
                </Detail>
                <h4>Beneficiary details</h4>
                <Detail>
                  Name:{" "}
                  <span className="bold">
                    {details.beneficiaryName.firstName}{" "}
                    {details.beneficiaryName.lastName}
                  </span>
                </Detail>
                <Detail>
                  Country:{" "}
                  <span className="bold">
                    {details.beneficiaryLocation.country}
                  </span>
                </Detail>
                <Detail>
                  State:{" "}
                  <span className="bold">
                    {details.beneficiaryLocation.state}
                  </span>
                </Detail>
              </Result>
            )}
          </ViewPort>
        </MainPage>
      </Holder>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  background-color: #ffffff;
`;

const Holder = styled.div`
  max-width: 1280px;
  margin: 0px auto;
  min-height: 100vh;
`;

// const Auth = styled.section`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   display: flex;
//   flex-direction: column;
//   gap: 30px;
//   background-color: var(--light-grey);
//   padding: 100px 15px;
//   border-radius: 15px;

//   .logo {
//     width: 200px;
//     margin: 0px auto;
//     pointer-events: none;
//     img {
//       width: 100%;
//       position: relative;
//     }
//   }

//   form {
//     display: flex;
//     flex-direction: column;
//     gap: 15px;
//     width: 99vw;
//     max-width: 400px;
//     justify-content: center;
//     align-items: center;

//     input {
//       width: 90%;
//       max-width: 400px;
//       height: 50px;
//       outline: none;
//       /* background-color: var(--light-grey); */
//       background-color: white;
//       border: none;
//       border-radius: 5px;
//       padding-left: 10px;
//     }

//     button {
//       width: 110px;
//       height: 35px;
//       border: none;
//       background-color: black;
//       color: white;
//       border-radius: 5px;
//       cursor: pointer;
//     }
//   }
// `;

const MainPage = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;

  nav {
    width: 100%;
    height: 80px;
    border-bottom: solid 2px var(--medium-grey);
    display: flex;
    justify-content: space-between;
    align-items: center;

    top: 0px;
    background-color: white;
    z-index: 20;
    position: fixed;

    .logo {
      width: 180px;
      margin: 0px auto;
      pointer-events: none;
      img {
        width: 100%;
        position: relative;
      }
    }
  }
`;

const ViewPort = styled.div`
  position: relative;
  width: 400px;
  margin: 0px auto;
  padding: 20px;
  padding-top: 120px;

  @media screen and (max-width: 420px) {
    width: 100%;
  }

  p.heading {
    text-align: center;
    font-size: 14px;
    color: var(--dark-grey);
    margin-bottom: 50px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;

    input {
      width: 90%;
      height: 40px;
      outline: none;
      border-radius: 5px;
      border: solid 2px var(--medium-grey);
      background-color: var(--light-grey);
      padding-left: 10px;
    }

    button {
      width: 130px;
      height: 37px;
      border-radius: 5px;
      background-color: black;
      color: white;
      border: solid 1px black;
      cursor: pointer;
      transition: all 0.1s ease-in-out;

      &:hover {
        background-color: white;
        color: black;
        transition: all 0.1s ease-in-out;
      }
    }
  }
`;

const Result = styled.div`
  margin-top: 50px;
  width: 100%;

  h4 {
    margin-top: 10px;
  }
`;

const Detail = styled.p`
  position: relative;
  font-size: 15px;

  span {
    font-family: "Firs-Medium";
  }
`;

export default Admin;
