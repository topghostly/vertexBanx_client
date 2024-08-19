import React, { useState, useEffect } from "react";
import Tab from "./Tab";
import styled from "styled-components";

function GetHistory({
  refreshDetails,
  setRefreshDetails,
  setPendingTransaction,
}) {
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

  useEffect(() => {
    if (refreshDetails) {
      const newSavedUserDetails = JSON.parse(
        localStorage.getItem("userDetails")
      );

      const savedDetails = newSavedUserDetails.transactionDetails;
      setUserHistory(savedDetails);
    }
    console.log("the detaills as been refreshed");
    setRefreshDetails(false);
    // setPendingTransaction(false);
  }, [refreshDetails]);

  const recent = userHistory.slice(-3);

  return (
    <Wrapper>
      {recent.length <= 0 ? (
        <p className="no-transaction">No recent transaction</p>
      ) : null}

      {recent
        .slice()
        .reverse()
        .map((recentTransaction) => {
          let type;
          let theName;
          if (
            userDetails.AccountNumber === recentTransaction.senderAccountNumber
          ) {
            type = "debit";
            theName = `${recentTransaction.beneficiaryName.firstName} ${recentTransaction.beneficiaryName.lastName}`;
          } else if (
            userDetails.AccountNumber ===
            recentTransaction.beneficiaryAccountNumber
          ) {
            type = "credit";
            theName = `${recentTransaction.senderName.firstName} ${recentTransaction.senderName.lastName}`;
          }

          if (
            recentTransaction.transactionStatus === "Pending" &&
            userDetails.AccountNumber ===
              recentTransaction.beneficiaryAccountNumber
          ) {
            setPendingTransaction(true);
          }
          return (
            <Tab
              amount={recentTransaction.amount}
              key={recentTransaction._id}
              type={type}
              name={theName}
              status={recentTransaction.transactionStatus}
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

  p.no-transaction {
    font-size: 13px;
    text-align: center;
    margin-top: 20px;
    font-family: "Manrope-Bold";
  }
`;

export default GetHistory;
