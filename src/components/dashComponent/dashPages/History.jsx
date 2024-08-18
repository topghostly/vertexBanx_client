import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Tab from "../micro/Tab";
import Footer from "../../Footer";
import TransactionDetails from "../../TransactionDetails";

function History() {
  const navigate = useNavigate();

  const [transactionDetails, setTransactionDetails] = useState({
    detailStatus: false,
    amount: "",
    name: "",
    narration: "",
    id: "",
    status: "",
  });

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
    if (!userDetails || !userHistory) {
      navigate("/u/overview/dashboard");
    }
  });
  return (
    <Wrapper
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        delay: 0.2,
        duration: 0.2,
      }}
    >
      <section className="heading">
        <h3>Transaction Statement</h3>
        <p className="small">Browse all transactions you've made</p>
      </section>
      {userHistory.length <= 0 ? (
        <p className="no-transaction">No recent transaction</p>
      ) : null}
      <Recent>
        <div className="head"></div>

        {userHistory
          .slice()
          .reverse()
          .map((recentTransaction) => {
            let type;
            let theName;
            if (
              userDetails.AccountNumber ===
              recentTransaction.senderAccountNumber
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

            return (
              <Tab
                amount={recentTransaction.amount}
                key={recentTransaction._id}
                type={type}
                name={theName}
                status={recentTransaction.transactionStatus}
                setTransactionDetails={setTransactionDetails}
                narration={recentTransaction.narration}
                id={recentTransaction._id}
              />
            );
          })}
      </Recent>
      {transactionDetails.detailStatus && (
        <TransactionDetails
          transactionDetails={transactionDetails}
          setTransactionDetails={setTransactionDetails}
        />
      )}
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 30px;
  min-height: 100vh;
  padding: 10px;

  p.no-transaction {
    font-size: 13px;
    text-align: center;
    margin-top: 20px;
    font-family: "Manrope-Bold";
  }

  section.heading {
    display: flex;
    flex-direction: column;
    gap: 5px;
    text-align: center;
    h3 {
      font-size: 30px;
    }
    p {
      font-family: "Manrope-Bold";
    }
  }
`;

const Recent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
  padding-top: 0px;
  border-radius: var(--medium-br);
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media screen and (max-width: 560px) {
    padding: 0px;
  }

  .head {
    position: relative;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: flex-end;
  }
`;

export default History;
