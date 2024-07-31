import React from "react";
import styled from "styled-components";
import flag from "/images/flag.png";

function Profile() {
  return (
    <Wrapper>
      <Holder>
        <section className="heading">
          <h3>
            Account Details <img src={flag} alt="Nigeria-flag" />
          </h3>
          <p className="small">View and modify user account details</p>
        </section>
        <Header>
          <div className="avatar"></div>
          <h2>Abolaji Temitope</h2>
          <p>T1</p>
        </Header>
        <Box>
          <p>Your account number</p>
          <h4>0011223344</h4>
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
            <h4>0011001100</h4>
            <p>Account Number</p>
          </Section>
          <Section>
            <h4>Abolaji Temitope</h4>
            <p>Account Name</p>
          </Section>
          <Section>
            <h4>6, Oyeniji street, Egbeda</h4>
            <p>Address</p>
          </Section>
          <Section>
            <h4>topghostly@gmail.com</h4>
            <p>EmailAddress</p>
          </Section>
          <Section>
            <h4>6, Oyeniji street, Egbeda</h4>
            <p>Address</p>
          </Section>
        </Field>
      </Holder>
    </Wrapper>
  );
}

const Wrapper = styled.div`
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
  }
`;

const Header = styled.div`
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;

  h2 {
    margin-top: 20px;
  }

  .avatar {
    width: 160px;
    aspect-ratio: 1;
    background-color: var(--light-grey);
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
