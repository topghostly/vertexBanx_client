import React, { useEffect, useState } from "react";
import styled from "styled-components";
import currencyConverter from "../../../../util/balanceConverter";

function AcctBalance({ refreshDetails, setRefreshDetails }) {
  const [updatedValue, setUpdateValue] = useState(0);

  const [userDetails, setUserDetails] = useState(() => {
    const savedUserDetails = localStorage.getItem("userDetails");
    return savedUserDetails ? JSON.parse(savedUserDetails) : null;
  });

  useEffect(() => {
    if (refreshDetails) {
      const newSavedUserDetails = JSON.parse(
        localStorage.getItem("userDetails")
      );
      setUserDetails(newSavedUserDetails);
    }
    console.log("the detaills as been refreshed");
    setRefreshDetails(false);
  }, [refreshDetails]);

  useEffect(() => {
    while (updatedValue < 60) {
      const changeUpdated = setInterval(() => {
        setUpdateValue((prevValue) => (prevValue += 1));
      }, 1000);

      return () => clearInterval(changeUpdated);
    }
  }, []);

  return (
    <Wrapper>
      <Holder>
        <div className="top">
          <div className="left">
            <p className="update">Last updated {updatedValue}s ago</p>
            <p className="small">Avialable balance</p>
          </div>
          <div className="right"></div>
        </div>

        <div className="bottom">
          <h2 className="balance">{currencyConverter(userDetails.balance)}</h2>
          <div className="card-number">
            <p className="small">A/C No: {userDetails.AccountNumber}</p>
          </div>
        </div>
      </Holder>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  height: 200px;
  background-color: black;
  border-radius: var(--medium-br);
  color: white;
`;

const Holder = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    color: white;
  }

  .top {
    display: flex;
    justify-content: space-between;
    .left {
      p.update {
        font-size: 11px;
        color: var(--dark-grey);
      }
    }
    .right {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background-color: white;
      cursor: pointer;
    }
  }
  .bottom {
    p {
      font-size: 11px;
    }
  }
`;
export default AcctBalance;
