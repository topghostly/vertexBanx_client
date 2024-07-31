import React, { useState } from "react";
import styled from "styled-components";
import Homepage from "./dashPages/Homepage";
import TransferPage from "./dashPages/TransferPage";
import { Outlet } from "react-router-dom";

function DashContent({ page }) {
  return (
    <Wrapper>
      {/* {page === "homepage" ? (
        <Homepage />
      ) : page === "transfer" ? (
        <TransferPage />
      ) : null} */}

      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  max-height: 100%;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  overflow-y: scroll;
  color: black;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #2929298f;
    border-radius: 30px;
  }
  &::-webkit-scrollbar-track {
    background-color: none;
  }
`;

export default DashContent;
