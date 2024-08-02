import React, { useState } from "react";
import styled from "styled-components";

function GetAcctNum() {
  const [userDetails, setUserDetails] = useState(() => {
    const savedUserDetails = localStorage.getItem("userDetails");
    const user = JSON.parse(savedUserDetails);

    return user.userDetails;
  });

  return (
    <Wrapper className="small">A/C No: {userDetails.AccountNumber}</Wrapper>
  );
}

const Wrapper = styled.p`
  position: relative;
  font-size: 11px;
`;

export default GetAcctNum;
