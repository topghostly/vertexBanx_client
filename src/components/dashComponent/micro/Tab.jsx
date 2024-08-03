import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import currencyConverter from "../../../../util/balanceConverter";

function Tab({ name, amount, type }) {
  const amountColor = useRef(null);

  // Amount color function
  useEffect(() => {
    if (type === "debit") {
      amountColor.current.style.color = "black";
    } else if (type === "credit") {
      amountColor.current.style.color = "var(--theme-color)";
    }
  });
  return (
    <Wrapper>
      <div className="icon"></div>
      <div className="text">
        <p>Chritiana Sangotope</p>
      </div>
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
  grid-template-columns: 20% 50% 30%;
  padding: 0px 10px;
  padding-bottom: 10px;

  .icon {
    width: 45px;
    height: 45px;
    background-color: var(--dark-grey);
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
