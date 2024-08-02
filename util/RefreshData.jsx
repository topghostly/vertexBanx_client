import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RefreshDatabase = ({ setRefreshDetails }) => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(() => {
    const savedUserDetails = localStorage.getItem("userDetails");
    return savedUserDetails ? JSON.parse(savedUserDetails) : null;
  });

  const userAccountNumber = userDetails?.AccountNumber;

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
      console.log("Now the address is", detailLocation);
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
              console.log("The coordinates are", latitude, longitude);
              let beneficiaryLocation = await getActualLocation(
                latitude,
                longitude
              );
              console.log("The beneficiaryLocation is", beneficiaryLocation);

              const response = await axios.post(
                `http://localhost:3030/v0/api/verify/delete/${verificationID}`,
                { beneficiaryLocation }
              );

              console.log("The final data is", response);

              if (response.data.status === "SUCCESS") {
                localStorage.setItem(
                  "userDetails",
                  JSON.stringify(response.data.data)
                );
                setRefreshDetails(true);
              }
            },
            (err) => {
              console.error("Geolocation error", err);
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
        `http://localhost:3030/v0/api/verify/update/${userAccountNumber}`
      );
      if (response.data.code === "FOUND_NEW_TRANSACTION_UPDATE") {
        await newUpdateHandler(response.data.date._id);
        console.log("New update found");
      } else if (response.data.code === "NO_NEW_UPDATE") {
        console.log("No update found");
      }
    } catch (err) {
      console.error("An error occurred while fetching update", err);
    }
  }, [userAccountNumber, newUpdateHandler]);

  useEffect(() => {
    const updateInterval = setInterval(fetchUpdate, 2000);
    return () => clearInterval(updateInterval);
  }, [fetchUpdate]);

  return null;
};

export default RefreshDatabase;
