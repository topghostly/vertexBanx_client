import React, { useState, useEffect } from "react";
import styled from "styled-components";
import currencyConverter from "../../../../util/balanceConverter";

function GetBalance({ refreshDetails, setRefreshDetails }) {
  const [userDetails, setUserDetails] = useState(() => {
    const savedUserDetails = localStorage.getItem("userDetails");
    const user = JSON.parse(savedUserDetails);

    return user.userDetails;
  });

  useEffect(() => {
    if (refreshDetails) {
      const newSavedUserDetails = JSON.parse(
        localStorage.getItem("userDetails")
      );
      setUserDetails(newSavedUserDetails);
    }
    console.log("the detaills as been refreshed");
    setRefreshDetails(false);
  }, [refreshDetails]);

  return <Wrapper>{currencyConverter(userDetails.balance)}</Wrapper>;
}

const Wrapper = styled.h2`
  position: relative;
  width: fit-content;
`;

export default GetBalance;
