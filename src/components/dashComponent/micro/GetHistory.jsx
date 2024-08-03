import React, { useState } from "react";
import Tab from "./Tab";
import styled from "styled-components";

function GetHistory() {
  const [userHistory, setUserHistory] = useState(() => {
    const savedUserDetails = localStorage.getItem("userDetails");
    const user = JSON.parse(savedUserDetails);

    return user.transactionDetails;
  });

  const [userDetails, setUserDetails] = useState(() => {
    const savedUserDetails = localStorage.getItem("userDetails");
    const user = JSON.parse(savedUserDetails);

    return user.userDetails;
  });

  const recent = userHistory.slice(-3);

  return (
    <Wrapper>
      {recent.map((recentTransaction) => {
        let type;
        if (
          userDetails.AccountNumber === recentTransaction.senderAccountNumber
        ) {
          type = "debit";
        } else if (
          userDetails.AccountNumber ===
          recentTransaction.beneficiaryAccountNumber
        ) {
          type = "credit";
        }
        return (
          <Tab
            amount={recentTransaction.amount}
            key={recentTransaction._id}
            type={type}
          />
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export default GetHistory;
