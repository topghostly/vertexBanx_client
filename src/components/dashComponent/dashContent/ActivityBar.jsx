import React from "react";
import styled from "styled-components";

function ActivityBar() {
  return (
    <Wrapper>
      <Holder>
        <section>
          <p className="heading">Utilities</p>
          <Card>
            <div className="logo"></div>
            <div className="text">MTN e-Recharge</div>
            <button>Buy</button>
          </Card>
          <Card>
            <div className="logo"></div>
            <div className="text">MTN e-Recharge</div>
            <button>Buy</button>
          </Card>
          <Card>
            <div className="logo"></div>
            <div className="text">MTN e-Recharge</div>
            <button>Buy</button>
          </Card>
        </section>
        <section>
          <p className="heading">Utilities</p>
          <Card>
            <div className="logo"></div>
            <div className="text">MTN e-Recharge</div>
            <button>Buy</button>
          </Card>
          <Card>
            <div className="logo"></div>
            <div className="text">MTN e-Recharge</div>
            <button>Buy</button>
          </Card>
        </section>
      </Holder>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  border: solid 1px var(--medium-grey);
  border-radius: var(--medium-br);

  @media screen and (max-width: 1050px) {
    display: none;
  }
`;

const Holder = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  section {
    display: flex;
    flex-direction: column;
    gap: 10px;

    p.heading {
      font-family: "Firs-Medium";
      font-size: 20px;
    }
  }
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  background-color: var(--light-grey);
  border-radius: 100px;
  align-items: center;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  padding: 10px;

  .logo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--dark-grey);
  }

  .text {
    font-size: var(--text-font);
    font-family: "Manrope-Bold";
  }

  button {
    outline: none;
    width: 100%;
    height: 30px;
    border-radius: 100px;
    border: none;
    background-color: #00000021;
    display: grid;
    place-content: center;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #00000049;
      transition: all 0.2s ease-in-out;
    }
    cursor: pointer;
  }
`;

export default ActivityBar;
