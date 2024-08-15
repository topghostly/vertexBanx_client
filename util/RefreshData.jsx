import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RefreshDatabase = ({ setRefreshDetails, setBalLoad }) => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(() => {
    const savedUserDetails = localStorage.getItem("userDetails");
    const user = JSON.parse(savedUserDetails);
    if (!user.userDetails) {
      navigate("/auth/login");
    }
    return user.userDetails;
  });

  const userAccountNumber = userDetails.AccountNumber;

  if (!userAccountNumber) {
    console.log("Can't get user account number for the update function");
    navigate("/auth/login");
    return null;
  }

  const getActualLocation = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    try {
      const response = await axios.get(url);
      const detailLocation = {
        longitude,
        latitude,
        addressName: response.data.display_name,
        county: response.data.address.county,
        state: response.data.address.state,
        ISO: response.data.address["ISO3166-2-lvl4"],
        country: response.data.address.country,
        countryCode: response.data.address.country_code,
      };
      // console.log("Now the address is", detailLocation);
      return detailLocation;
    } catch (error) {
      console.error(
        "An error occurred while getting the actual location",
        error
      );
    }
  };

  const newUpdateHandler = useCallback(
    async (verificationID) => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              // console.log("The coordinates are", latitude, longitude);
              let beneficiaryLocation = await getActualLocation(
                latitude,
                longitude
              );
              // console.log("The beneficiaryLocation is", beneficiaryLocation);

              const response = await axios.post(
                `https://vertex-server-9jyo.onrender.com/v0/api/verify/delete/${verificationID}`,
                { beneficiaryLocation }
              );

              if (response.data.status === "SUCCESS") {
                setBalLoad(true);
                localStorage.setItem(
                  "userDetails",
                  JSON.stringify(response.data.data)
                );
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setBalLoad(false);
                setRefreshDetails(true);
              }
            },
            (err) => {
              console.error("Geolocation error", err);
            },
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0,
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      } catch (error) {
        console.error("An error occurred", error);
      }
    },
    [setRefreshDetails]
  );

  const fetchUpdate = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://vertex-server-9jyo.onrender.com/v0/api/verify/update/${userAccountNumber}`
      );
      if (response.data.code === "FOUND_NEW_TRANSACTION_UPDATE") {
        await newUpdateHandler(response.data.date._id);
        // console.log("New update found");
      } else if (response.data.code === "NO_NEW_UPDATE") {
        // console.log("No update found");
      }
    } catch (err) {
      // console.error("An error occurred while fetching update", err);
    }
  }, [userAccountNumber]);

  useEffect(() => {
    const updateInterval = setInterval(fetchUpdate, 2000);
    return () => clearInterval(updateInterval);
  }, [fetchUpdate]);
};

export default RefreshDatabase;
