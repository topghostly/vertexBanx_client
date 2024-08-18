import React, { useState } from "react";
import styled from "styled-components";

function Getusername() {
  const [userDetails, setUserDetails] = useState(() => {
    const savedUserDetails = localStorage.getItem("userDetails");
    const user = JSON.parse(savedUserDetails);
    return user.userDetails;
  });

  return (
    <Wrapper className="big">
      {userDetails.fullName.firstName} {userDetails.fullName.lastName}
    </Wrapper>
  );
}

const Wrapper = styled.h3`
  position: relative;
  text-transform: capitalize;
`;

export default Getusername;
