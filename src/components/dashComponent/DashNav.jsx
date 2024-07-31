import React from "react";
import styled from "styled-components";
import logo from "/images/VERTEX-07.png";
import SideNav from "./SideNav";

function DashNav({}) {
  return (
    <Wrapper>
      <Holder>
        <LogoHolder>
          <img src={logo} alt="vertex-logo" />
        </LogoHolder>
        <SideNav />
      </Holder>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 720px) {
    display: none;
  }
`;

const Holder = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;
const LogoHolder = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  img {
    width: 25px;
  }
`;

export default DashNav;
