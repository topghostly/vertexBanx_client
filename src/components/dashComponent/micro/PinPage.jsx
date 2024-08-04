import React from "react";
import styled from "styled-components";

function PinPage() {
  return <Wrapper></Wrapper>;
}

const Wrapper = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  max-width: 400px;
  height: 35vh;
  background-color: black;
  border-radius: 30px 30px 0px 0px;
  z-index: 9999;

  @media screen and (max-width: 450px) {
    left: 50%;
    transform: translateX(-50%);
  }
`;
export default PinPage;
