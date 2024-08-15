import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import currencyConverter from "../../../../util/balanceConverter";

function Tab({
  name,
  amount,
  type,
  status,
  setTransactionDetails,
  narration,
  id,
}) {
  const amountColor = useRef(null);
  const transactionStatus = useRef(null);
  const iconColor = useRef(null);

  //Function to generate andom colors
  function getRandomColorHash() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Amount color function
  useEffect(() => {
    if (type === "debit") {
      amountColor.current.style.color = "black";
    } else if (type === "credit") {
      amountColor.current.style.color = "var(--theme-color)";
    }

    if (status === "Completed") {
      transactionStatus.current.style.backgroundColor = "green";
    } else {
      transactionStatus.current.style.backgroundColor = "orange";
    }

    //Add color to icon tab
    iconColor.current.style.backgroundColor = `${getRandomColorHash()}`;
  });

  // Handle teh click action
  const handleClick = () => {
    setTransactionDetails({
      detailStatus: true,
      amount,
      name,
      narration,
      id,
      status,
    });
  };

  return (
    <Wrapper onClick={handleClick}>
      <div className="icon" ref={iconColor}></div>
      <div className="text">
        <p>{name}</p>
      </div>
      <div className="status" ref={transactionStatus}></div>
      <div className="amount">
        <h2 ref={amountColor}>{currencyConverter(amount)}</h2>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  border-bottom: solid 1px var(--medium-grey);
  display: grid;
  place-content: center;
  grid-template-columns: 20% 44% 6% 30%;
  padding: 0px 10px;
  padding-bottom: 10px;
  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: var(--medium-grey);
    cursor: pointer;
    transition: all 0.1s ease-in-out;
  }

  .icon {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }

  .status {
    position: relative;
    height: 8px;
    aspect-ratio: 1;
    background-color: orange;
    margin: auto 0px;
    border-radius: 50%;
  }

  .text {
    display: grid;
    place-content: center;
    justify-content: flex-start;
    p {
      font-family: "Manrope-Bold";
      font-size: var(--text-font);
    }
  }

  .amount {
    display: grid;
    place-content: center;
    justify-content: flex-end;
    h2 {
      color: var(--theme-color);
      font-size: var(--text-font);
    }
  }
`;

export default Tab;
