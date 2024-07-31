import React from "react";
import styled from "styled-components";
import AcctBalance from "./AcctBalance";
import SavingBalance from "./SavingBalance";
import ActivityBar from "./ActivityBar";

import { Link } from "react-router-dom";

function MidSection({ setRefreshDetails, refreshDetails }) {
  return (
    <Wrapper>
      <RightSide>
        <div className="balance-holder">
          <AcctBalance
            refreshDetails={refreshDetails}
            setRefreshDetails={setRefreshDetails}
          />
          <SavingBalance />
        </div>
        <Recent>
          <div className="head">
            <ViewAllLink className="heading">View all</ViewAllLink>
          </div>
          <Tab>
            <div className="icon"></div>
            <div className="text">
              <p>Azeez Chritiana Sangotope</p>
            </div>
            <div className="amount">
              <h2>₦23,050.00</h2>
            </div>
          </Tab>
          <Tab>
            <div className="icon"></div>
            <div className="text">
              <p>Azeez Chritiana Sangotope</p>
            </div>
            <div className="amount">
              <h2>₦23,050.00</h2>
            </div>
          </Tab>
          <Tab>
            <div className="icon"></div>
            <div className="text">
              <p>Azeez Chritiana Sangotope</p>
            </div>
            <div className="amount">
              <h2>₦23,050.00</h2>
            </div>
          </Tab>
        </Recent>
      </RightSide>
      <ActivityBar />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 65.5% 32.5%;
  gap: 20px;
  height: 100%;
  position: relative;

  @media screen and (max-width: 1050px) {
    display: block;
  }
`;

const RightSide = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .balance-holder {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
`;

const Recent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--light-grey);
  padding: 20px;
  border-radius: var(--medium-br);
  display: flex;
  flex-direction: column;
  gap: 5px;

  .head {
    position: relative;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: flex-end;
  }
`;
const ViewAllLink = styled(Link)`
  position: relative;
  color: black;
  font-size: 14px;
  font-family: "Manrope-Bold";
`;

const Tab = styled.div`
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

export default MidSection;
