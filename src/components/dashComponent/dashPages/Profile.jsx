import React, { useState } from "react";
import styled from "styled-components";
import flag from "/images/flag.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(() => {
    const savedUserDetails = localStorage.getItem("userDetails");
    const user = JSON.parse(savedUserDetails);

    return user.userDetails;
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
      <Holder>
        <section className="heading">
          <h3>
            Account Details <img src={flag} alt="Nigeria-flag" />
          </h3>
          <p className="small">View and modify user account details</p>
        </section>
        <Header>
          <div className="avatar"></div>
          <h2>
            {userDetails.fullName.firstName} {userDetails.fullName.lastName}
          </h2>
          <p>T1</p>
        </Header>
        <Box>
          <p>Your account number</p>
          <h4>{userDetails.AccountNumber}</h4>
        </Box>
        <div className="mid-paragraph">
          <p>
            Your account is limited to a balance of <strong>Unlimited</strong>{" "}
            and you can recieve a maxmum deposit of <strong>Unlimited</strong>{" "}
            at a time from other banks
          </p>
        </div>
        <Upgrade>
          <p>Upgrade account</p>
        </Upgrade>

        <Field>
          <Section>
            <h4>{userDetails.nationality}</h4>
            <p>Country</p>
          </Section>
          <Section>
            <h4>{userDetails.AccountNumber}</h4>
            <p>Account Number</p>
          </Section>
          <Section>
            <h4>
              {userDetails.fullName.lastName} {userDetails.fullName.firstName}
            </h4>
            <p>Account Name</p>
          </Section>
          <Section>
            <h4>{userDetails.gender}</h4>
            <p>Gender</p>
          </Section>
          <Section>
            <h4>{userDetails.emailAddress}</h4>
            <p>EmailAddress</p>
          </Section>
          <Section>
            <h4>{userDetails.phoneNumber}</h4>
            <p>Phone number</p>
          </Section>
          <Section>
            <h4>{userDetails.residentialAddress}</h4>
            <p>Address</p>
          </Section>
        </Field>
      </Holder>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  position: relative;
`;

const Holder = styled.div`
  position: relative;
  height: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 0px auto;
  padding: 10px;

  section.heading {
    display: flex;
    flex-direction: column;
    gap: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    h3 {
      font-size: 30px;
      display: flex;
      align-items: center;
      gap: 8px;
      width: fit-content;
      img {
        width: 32px;
        margin: auto 0px;
      }
    }
    p {
      font-family: "Manrope-Bold";
      width: fit-content;
      text-align: center;
    }
  }

  .mid-paragraph {
    text-align: center;

    P {
      font-size: var(--text-font);
    }
  }
`;

const Header = styled.div`
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 2px;

  h2 {
    margin-top: 25px;
  }
  P {
    font-size: var(--text-font);
  }

  .avatar {
    width: 160px;
    aspect-ratio: 1;
    background-color: var(--medium-grey);
    border-radius: 50%;
  }
`;

const Box = styled.div`
  outline: none;
  transition: all 0.2s ease-in-out;
  border-radius: 5px;
  /* border: solid 2px var(--medium-grey); */
  background-color: var(--light-grey);
  padding: 10px;

  p {
    font-size: var(--text-font);
  }
`;

const Upgrade = styled.div`
  position: relative;
  margin: 0px auto;
  padding: 5px 15px;
  background-color: #ee3939;
  color: white;
  border-radius: 6px;
  p {
    font-family: "Manrope-Bold";
  }
`;

const Field = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Section = styled.div`
  position: relative;

  h4 {
    font-family: "Manrope-Bold";
  }
  P {
    font-size: 12px;
  }
`;
export default Profile;
