import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import AcctBalance from "./AcctBalance";
// import SavingBalance from "./SavingBalance";
import ActivityBar from "./ActivityBar";
import gsap from "gsap";

import { Link } from "react-router-dom";
import GetHistory from "../micro/GetHistory";

function MidSection({ setRefreshDetails, refreshDetails, loading, balLoad }) {
  const animationRef = useRef(null);
  const animationRef1 = useRef(null);
  const animationRef2 = useRef(null);

  const [pendingTransaction, setPendingTransaction] = useState(false);
  useEffect(() => {
    if (loading) {
      gsap.fromTo(
        animationRef.current,
        {
          transform: "translateX(-88%)",
        },
        {
          transform: "translateX(88%)",
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "power4.in",
        }
      );
      gsap.fromTo(
        animationRef1.current,
        {
          transform: "translateX(-88%)",
        },
        {
          transform: "translateX(88%)",
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "power4.in",
          delay: 0.2,
        }
      );
      gsap.fromTo(
        animationRef2.current,
        {
          transform: "translateX(-88%)",
        },
        {
          transform: "translateX(88%)",
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "power4.in",
          delay: 0.4,
        }
      );
    }
  });
  return (
    <Wrapper>
      <RightSide>
        <div className="balance-holder">
          <AcctBalance
            refreshDetails={refreshDetails}
            setRefreshDetails={setRefreshDetails}
            loading={loading}
            balLoad={balLoad}
          />
          {/* <SavingBalance /> */}
        </div>
        <Recent>
          <div className="head">
            <p className="pending">
              {pendingTransaction
                ? "You have a pending Transaction, refresh for verification"
                : ""}
            </p>
            <ViewAllLink className="heading" to={"/u/overview/statement"}>
              View all
            </ViewAllLink>
          </div>
          {loading ? (
            <PlaceHolder>
              <LoaderAnim ref={animationRef} />
              <LoaderAnim ref={animationRef1} />
              <LoaderAnim ref={animationRef2} />
            </PlaceHolder>
          ) : (
            <GetHistory
              refreshDetails={refreshDetails}
              setRefreshDetails={setRefreshDetails}
              setPendingTransaction={setPendingTransaction}
            />
          )}
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

const PlaceHolder = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: none;
  height: 200px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const LoaderAnim = styled.div`
  display: absolute;
  transform: skewX(200);
  width: 100%;
  top: -20px;
  left: 0;
  background: linear-gradient(
    90deg,
    #f3f3f36e 10%,
    #d1d1d1 30%,
    #d1d1d1 70%,
    #f3f3f36e 90%
  );
  height: 100%;
  animation: SwipeAnimation 1s cubic-bezier(0.77, 0, 0.175, 1) infinite;
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

  @media screen and (max-width: 560px) {
    padding: 20px 0px;
  }

  .head {
    position: relative;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    width: 100%;

    @media screen and (max-width: 560px) {
      padding-right: 20px;
    }

    .pending {
      font-size: 10px;
      font-family: "Manrope-Bold";
      color: red;
    }
  }

  .tab-holder {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 5px;
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
