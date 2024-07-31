import React from "react";
import styled from "styled-components";
function History() {
  return (
    <Wrapper>
      <section className="heading">
        <h3>Transaction Statement</h3>
        <p className="small">Browse all transactions you've made</p>
      </section>
      <Recent>
        <div className="head"></div>
        <Tab>
          <div className="icon"></div>
          <div className="text">
            <p>Chritiana Sangotope</p>
          </div>
          <div className="amount">
            <h2>₦23,050.00</h2>
          </div>
        </Tab>
        <Tab>
          <div className="icon"></div>
          <div className="text">
            <p>Chritiana Sangotope</p>
          </div>
          <div className="amount">
            <h2>₦23,050.00</h2>
          </div>
        </Tab>
        <Tab>
          <div className="icon"></div>
          <div className="text">
            <p>Chritiana Sangotope</p>
          </div>
          <div className="amount">
            <h2>₦23,050.00</h2>
          </div>
        </Tab>
        <Tab>
          <div className="icon"></div>
          <div className="text">
            <p>Chritiana Sangotope</p>
          </div>
          <div className="amount">
            <h2>₦23,050.00</h2>
          </div>
        </Tab>
        <Tab>
          <div className="icon"></div>
          <div className="text">
            <p>Chritiana Sangotope</p>
          </div>
          <div className="amount">
            <h2>₦23,050.00</h2>
          </div>
        </Tab>
        <Tab>
          <div className="icon"></div>
          <div className="text">
            <p>Chritiana Sangotope</p>
          </div>
          <div className="amount">
            <h2>₦23,050.00</h2>
          </div>
        </Tab>
        <Tab>
          <div className="icon"></div>
          <div className="text">
            <p>Chritiana Sangotope</p>
          </div>
          <div className="amount">
            <h2>₦23,050.00</h2>
          </div>
        </Tab>
        <Tab>
          <div className="icon"></div>
          <div className="text">
            <p>Chritiana Sangotope</p>
          </div>
          <div className="amount">
            <h2>₦23,050.00</h2>
          </div>
        </Tab>
        <Tab>
          <div className="icon"></div>
          <div className="text">
            <p>Chritiana Sangotope</p>
          </div>
          <div className="amount">
            <h2>₦23,050.00</h2>
          </div>
        </Tab>
      </Recent>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 30px;

  section.heading {
    display: flex;
    flex-direction: column;
    gap: 5px;
    h3 {
      font-size: 30px;
    }
    p {
      font-family: "Manrope-Bold";
    }
  }
`;

const Recent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  /* background-color: var(--light-grey); */
  padding: 20px;
  padding-top: 0px;
  border-radius: var(--medium-br);
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media screen and (max-width: 560px) {
    padding: 0px;
  }

  .head {
    position: relative;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: flex-end;
  }
`;

const Tab = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  border-bottom: solid 1px var(--medium-grey);
  display: grid;
  place-content: center;
  grid-template-columns: 20% 55% 30%;
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

export default History;
