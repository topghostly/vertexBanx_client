import React from "react";
import styled from "styled-components";

function SavingBalance() {
  return (
    <Wrapper>
      <SavingWrapper>
        <div className="svg-holder"></div>
        <div className="text">
          <h3 className="big">Savings</h3>
        </div>
        <div className="amount">
          <h3>₦23,050.00</h3>
        </div>
      </SavingWrapper>
      <InvestmentWrapper>
        <div className="svg-holder"></div>
        <div className="text">
          <h3>Investment</h3>
        </div>
        <div className="amount">
          <h3>₦23,050.00</h3>
        </div>
      </InvestmentWrapper>
      <StocktWrapper>
        <div className="svg-holder"></div>
        <div className="text">
          <h3>Stocks</h3>
        </div>
        <div className="amount">
          <h3>₦23,050.00</h3>
        </div>
      </StocktWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  position: relative;
  height: 200px;
  border-radius: var(--medium-br);
  color: black;
`;

const SavingWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 50%;
  border-radius: var(--medium-br);
  background-color: var(--theme-color);
  z-index: 3;
  display: grid;
  padding: 10px;
  grid-template-columns: 20% 40% 40%;
  align-items: center;

  p.amount {
    font-family: "Firs-Medium";
  }
`;
const InvestmentWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 75%;
  border-radius: var(--medium-br);
  background-color: var(--medium-grey);
  z-index: 2;
  padding: 10px;
  display: grid;
  grid-template-columns: 20% 40% 40%;
  align-items: top;
  padding-top: 18px;
`;
const StocktWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 100%;
  border-radius: var(--medium-br);
  background-color: var(--light-grey);
  z-index: 1;
  padding: 10px;
  grid-template-columns: 20% 40% 40%;
  align-items: top;
  display: grid;
  padding-top: 18px;
`;

export default SavingBalance;
