import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function TransactionDetails({ transactionDetails }) {
  const navigate = useNavigate();
  const [userHistory, setUserHistory] = useState(() => {
    const savedUserDetails = localStorage.getItem("userDetails");
    const user = JSON.parse(savedUserDetails);

    if (!user.transactionDetails) {
      navigate("/u/overview/dashboard");
    }

    return user.transactionDetails;
  });

  return (
    <MainHold>
      <Wrapper>
        <div className="heading">
          <div className="share">Share</div>
          <p>Transaction</p>
          <div className="cancel">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="35px"
              height="35px"
            >
              <path d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 30.486328 15.978516 A 1.50015 1.50015 0 0 0 29.439453 16.439453 L 24 21.878906 L 18.560547 16.439453 A 1.50015 1.50015 0 0 0 17.484375 15.984375 A 1.50015 1.50015 0 0 0 16.439453 18.560547 L 21.878906 24 L 16.439453 29.439453 A 1.50015 1.50015 0 1 0 18.560547 31.560547 L 24 26.121094 L 29.439453 31.560547 A 1.50015 1.50015 0 1 0 31.560547 29.439453 L 26.121094 24 L 31.560547 18.560547 A 1.50015 1.50015 0 0 0 30.486328 15.978516 z" />
            </svg>
          </div>
        </div>
        <Badge>
          <p>Transfer</p>
        </Badge>
        <Time>on Aug, 11 2024</Time>
        <Details>
          <Tabs>
            <div>
              <p className="amount">{transactionDetails.amount}</p>
              <p className="name">{transactionDetails.name}</p>
            </div>
          </Tabs>
          <Tabs>
            <div>
              <p className="small">Description</p>
              <p className="bold">{transactionDetails.narration}</p>
            </div>
          </Tabs>
          <Tabs>
            <div>
              <p className="small">Payment Method</p>
              <p className="bold">Outward Transfer</p>
            </div>
            <div>
              <p className="small">Fees</p>
              <p className="bold">₦0.00</p>
            </div>
          </Tabs>
          <Tabs>
            <div>
              <p className="small">Transaction Id</p>
              <p className="bold">{transactionDetails.id}</p>
            </div>
            <div className="svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26px"
                height="26px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z"
                  fill="var(--theme-color)"
                />
                <path
                  d="M17.0998 2H12.8998C9.81668 2 8.37074 3.09409 8.06951 5.73901C8.00649 6.29235 8.46476 6.75 9.02167 6.75H11.0998C15.2998 6.75 17.2498 8.7 17.2498 12.9V14.9781C17.2498 15.535 17.7074 15.9933 18.2608 15.9303C20.9057 15.629 21.9998 14.1831 21.9998 11.1V6.9C21.9998 3.4 20.5998 2 17.0998 2Z"
                  fill="var(--theme-color)"
                />
              </svg>
              <p>Copy</p>
            </div>
          </Tabs>
          <Tabs>
            <div>
              <p className="small">Status</p>
              <p className="status">{transactionDetails.status}</p>
            </div>
          </Tabs>
        </Details>
      </Wrapper>
    </MainHold>
  );
}

const MainHold = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: #000000d8;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: 888;
  display: grid;
  place-content: center;
`;

const Wrapper = styled.div`
  position: relative;
  width: 90vw;
  max-width: 500px;
  height: 90vh;
  background-color: white;
  border-radius: var(--small-br);
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  pointer-events: all;

  .heading {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: solid 3px var(--medium-grey);
    .cancel {
      svg {
        width: 35px;
      }
    }
    p {
      font-size: 20px;
      font-family: "Firs-Medium";
      color: black;
    }
    .share {
      font-size: 12px;
      padding: 8px 12px;
      background-color: var(--theme-color);
      border-radius: 5px;
      color: white;
      cursor: pointer;
    }
  }
`;

const Badge = styled.div`
  position: relative;
  width: 120px;
  height: 40px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  color: var(--theme-color);
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  p {
    font-family: "Firs-Medium";
  }
`;

const Time = styled.p`
  margin-top: 20px;
  font-size: 15px;
`;

const Details = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 40px;
`;

const Tabs = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 69px;
  border-bottom: solid 2px var(--medium-grey);

  p.amount {
    font-family: "Manrope-Bold";
    font-size: 19px;
  }
  p.small {
    font-size: 12px;
    color: var(--dark-grey);
  }
  p.bold {
    font-family: "Manrope-Bold";
  }

  p.status {
    color: var(--theme-color);
    font-family: "Manrope-Bold";
  }

  .svg {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    cursor: pointer;

    p {
      font-family: "Manrope-Bold";
      color: var(--theme-color);
    }
  }
`;
export default TransactionDetails;
