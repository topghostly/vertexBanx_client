import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Tab from "../micro/Tab";

function History() {
  const navigate = useNavigate();

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
              />
            );
          })}
      </Recent>
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
  /* background-color: var(--light-grey); */
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

// const Tab = styled.div`
//   position: relative;
//   width: 100%;
//   height: 60px;
//   border-bottom: solid 1px var(--medium-grey);
//   display: grid;
//   place-content: center;
//   grid-template-columns: 20% 55% 30%;
//   padding: 0px 10px;
//   padding-bottom: 10px;

//   .icon {
//     width: 45px;
//     height: 45px;
//     background-color: var(--dark-grey);
//     border-radius: 50%;
//   }

//   .text {
//     display: grid;
//     place-content: center;
//     justify-content: flex-start;
//     p {
//       font-family: "Manrope-Bold";
//       font-size: var(--text-font);
//     }
//   }

//   .amount {
//     display: grid;
//     place-content: center;
//     justify-content: flex-end;
//     h2 {
//       color: var(--theme-color);
//       font-size: var(--text-font);
//     }
//   }
// `;

export default History;
