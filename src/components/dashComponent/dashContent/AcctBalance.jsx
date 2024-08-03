import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import GetBalance from "../micro/GetBalance";
import GetAcctNum from "../micro/GetAcctNum";

function AcctBalance({ refreshDetails, setRefreshDetails, loading }) {
  const [updatedValue, setUpdateValue] = useState(0);
  const animationRef = useRef(null);
  const animationRef6 = useRef(null);

  useEffect(() => {
    while (updatedValue < 60) {
      const changeUpdated = setInterval(() => {
        setUpdateValue((prevValue) => (prevValue += 1));
      }, 1000);

      return () => clearInterval(changeUpdated);
    }
  }, []);

  useEffect(() => {
    if (loading) {
      gsap.fromTo(
        animationRef.current,
        {
          transform: "translateX(-80%)",
        },
        {
          transform: "translateX(80%)",
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "power4.in",
          delay: 0.2,
        }
      );
      gsap.fromTo(
        animationRef6.current,
        {
          transform: "translateX(-80%)",
        },
        {
          transform: "translateX(80%)",
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "power4.in",
          delay: 0.6,
        }
      );
    }
  });

  return (
    <Wrapper>
      <Holder>
        <div className="top">
          <div className="left">
            <p className="update">Last updated {updatedValue}s ago</p>
            <p className="small">Avialable balance</p>
          </div>
          {/* <div className="right"></div> */}
        </div>

        <div className="bottom">
          <div className="balance-holder">
            {loading ? (
              <PlaceHolder>
                <LoaderAnim ref={animationRef} />
              </PlaceHolder>
            ) : (
              <GetBalance
                refreshDetails={refreshDetails}
                setRefreshDetails={setRefreshDetails}
              />
            )}
          </div>

          <div className="card-number">
            {loading ? (
              <PlaceHolder>
                <LoaderAnim ref={animationRef6} />
              </PlaceHolder>
            ) : (
              <GetAcctNum />
            )}
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

const PlaceHolder = styled.div`
  width: 170px;
  max-width: 100%;
  position: relative;
  overflow: hidden;
  background-color: none;
  height: 30px;
`;
const LoaderAnim = styled.div`
  display: absolute;
  transform: skewX(200);
  width: 100%;
  top: -20px;
  left: 0;
  background: linear-gradient(
    90deg,
    #f3f3f313 10%,
    #6b6b6b 30%,
    #6b6b6b 70%,
    #f3f3f313 90%
  );
  height: 100%;
  animation: SwipeAnimation 1s cubic-bezier(0.77, 0, 0.175, 1) infinite;
`;

const Holder = styled.div`
  position: relative;
  width: fit-content;
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
    display: flex;
    flex-direction: column;
    gap: 2px;
    .balance-holder {
      position: relative;
      width: 170px;

      h2 {
        width: fit-content;
      }
    }
    .card-number {
      width: fit-content;
      height: 32px;
      p {
        font-size: 11px;
      }
    }
  }
`;
export default AcctBalance;
