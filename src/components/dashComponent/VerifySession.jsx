import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VerifySession({ setAlert, setLoading, setBalLoad }) {
  const [error, setError] = useState(false);
  const [token, setToken] = useState(() => {
    const existingToken = Cookies.get("sessionToken");
    // console.log("the existing token is", existingToken);

    if (!existingToken) {
      console.log("No token found");
      setAlert({
        alertState: true,
        alertType: "FAILED",
        alertDetails: "Session expired",
      });
      return setError(true);
    }
    return existingToken;
  });

  const navigate = useNavigate();

  useEffect(() => {
    // console.log("the token used", token);
    const existingDetails = localStorage.getItem("userDetails");
    if (existingDetails) {
      localStorage.removeItem("userDetails");
    }

    const fetchUserDetails = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3030/v0/api/get/user-info",
          {
            rawToken: String(token),
          }
        );
        console.log(response);
        if (response.data.status == "FAILED") {
          console.log("this error got triggered");
          Cookies.remove("sessionToken");
          return setError(true);
        }
        console.log("The response is", response);
        localStorage.setItem("userDetails", JSON.stringify(response.data.data));
      } catch (err) {
        console.error("An error occured", err);
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setLoading(false);
        setBalLoad(false);
      }
    };
    fetchUserDetails();
  }, [token]);

  useEffect(() => {
    if (error) {
      navigate("/auth/login");
    }
  }, [error]);
}

export default VerifySession;
