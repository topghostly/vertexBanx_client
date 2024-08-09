import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import { orbit } from "ldrs";

function LoginPage({ setAlert, setSliderPosition }) {
  // Register loader stuff
  orbit.register();

  const navigate = useNavigate();

  //Define refs
  const buttonRef = useRef(null);

  // Define states
  const [loginDetails, setLoginDetails] = useState({
    usermailOrAcct: "",
    password: "",
  });
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");

  // Change slider position

  useEffect(() => {
    setSliderPosition("left");
  });

  useEffect(() => {
    if (loading) {
      buttonRef.current.style.backgroundColor = "white";
    } else {
      buttonRef.current.style.backgroundColor = "black";
    }
  }, [loading]);

  const validateAccountNumber = (number) => {
    const numberPattern = /^\d{10}$/;
    return numberPattern.test(number);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  // Cookie validation
  const createCookie = (token) => {
    const existingCookie = Cookies.get("sessionToken");
    if (existingCookie) {
      Cookies.remove(existingCookie);
    }
    Cookies.set("sessionToken", token);
  };

  // LOGIN LOGIC FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !validateEmail(loginDetails.usermailOrAcct) &&
      !validateAccountNumber(loginDetails.usermailOrAcct)
    ) {
      setError("invalid parameter");
      return setLoginDetails({ ...loginDetails, usermailOrAcct: "" });
    }

    if (!loginDetails.password) {
      return setError("invalid password");
    }

    setloading(true);

    try {
      const response = await axios.post(
        "https://vertex-server-9jyo.onrender.com/v0/api/auth/login",
        loginDetails
      );
      console.log(response);
      if (response.data.status === "SUCCESS") {
        createCookie(response.data.token);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setloading(false);
        navigate("/u/overview/dashboard");
      } else {
        setAlert({
          alertState: true,
          alertType: "Failed",
          alertDetails: response.data.mssg,
        });
        setloading(false);
        setLoginDetails({
          usermailOrAcct: "",
          password: "",
        });
      }
    } catch (error) {
      setloading(false);
      setLoginDetails({
        usermailOrAcct: "",
        password: "",
      });
      console.error("An error occured while logging in", error);
    }
  };

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
      <HeadText>
        <h3 className="big">Welcome</h3>
        <h3 className="big">back</h3>
      </HeadText>

      <FormHolder>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
            setloading(true);
          }}
        >
          <input
            type="text"
            name="usermailOrAcct"
            autoComplete="off"
            placeholder="Email or account number"
            value={loginDetails.usermailOrAcct}
            onChange={(e) => {
              setLoginDetails({
                ...loginDetails,
                usermailOrAcct: e.target.value,
              });
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginDetails.password}
            onChange={(e) => {
              setLoginDetails({ ...loginDetails, password: e.target.value });
            }}
          />
          <p className="error">{error}</p>
          <button ref={buttonRef}>
            {loading ? (
              <l-orbit size="31" speed="1.5" color="black"></l-orbit>
            ) : (
              <p>Sign in</p>
            )}
          </button>
        </form>
      </FormHolder>

      {/* 230969 */}

      <Oauth>
        <LineWord>
          <div className="line"></div>
          <p>or sign in with</p>
          <div className="line"></div>
        </LineWord>

        <div className="link-container">
          <SvgHolder>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="25px"
              height="25px"
            >
              <path
                fill="#fbc02d"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#e53935"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4caf50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1565c0"
                d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
          </SvgHolder>
          <SvgHolder>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="25px"
              height="25px"
            >
              <path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z" />
            </svg>
          </SvgHolder>
        </div>
      </Oauth>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const HeadText = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10px;
`;

const FormHolder = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    .error {
      color: var(--red-color);
      font-size: 12px;
      font-family: "Manrope-Bold";
    }
    input {
      width: 80%;
      height: 40px;
      outline: none;
      font-size: var(--text-font);
      transition: all 0.2s ease-in-out;
      border-radius: 5px;
      border: solid 2px var(--medium-grey);
      background-color: var(--light-grey);
      padding-left: 10px;
    }

    button {
      width: 110px;
      color: white;
      background-color: black;
      height: 40px;
      outline: none;
      border: solid 1px black;
      border-radius: 6px;
      margin-top: 10px;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      font-family: "Manrope-SemiBold";
      margin: 0px auto;

      P {
        font-size: var(--text-font);
      }

      &:hover {
        background-color: white;
        transition: all 0.2s ease-in-out;
        color: black;
      }
    }
  }
`;

const Oauth = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 15px;

  p {
    font-family: "Manrope-SemiBold";
    font-size: var(--text-font);
  }

  .link-container {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
`;

const SvgHolder = styled.div`
  position: relative;
  width: 48px;
  aspect-ratio: 1;
  border-radius: 5px;
  border: solid 2px var(--medium-grey);
  background-color: var(--light-grey);
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: not-allowed;
`;

const Bottom = styled.div`
  width: 310px;
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 5px;

  p {
    font-family: "Manrope-Regular";

    span {
      /* color: var(--theme-color); */
      font-family: "Manrope-SemiBold";
      cursor: pointer;
    }
  }
`;

const LineWord = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 95px 1fr;
  align-items: center;
  gap: 15px;

  .line {
    width: 70px;
    height: 2px;
    background-color: var(--medium-grey);
  }
`;
export default LoginPage;
