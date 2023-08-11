import React, { useEffect, useState, useContext } from "react";
import Vehicle from "../components/vehicle";
import { CircularProgress, Grid } from "@mui/material";
import axios from "axios";
import VehicleSearchBar from "../components/searchBar";
import { SearchContext } from "../context/SearchContext";

function IndexPage() {
  const [vehicles, setVehicles] = useState([]);
  const [isFound, setIsFound] = useState(false);
  const { priceLow, priceHigh, location } = useContext(SearchContext);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/vehicles`, {
        params: { priceLow, priceHigh, location },
      })
      .then((response) => {
        const vehicles = response.data;
        setVehicles(vehicles);
        setIsFound(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [priceLow, priceHigh, location]);

  return (
    <div
      style={{
        backgroundColor: "#f8f8f8", // Light gray background color
        minHeight: "100vh",
        padding: "20px 0",
      }}
    >
      <VehicleSearchBar />
      <Grid container spacing={2} style={{ margin: "auto" }}>
        {(isFound === false && vehicles.length === 0 && (
          <div style={{ textAlign: "center", width: "100%" }}>
            <p>
              Please wait for a few seconds. The free version of the server
              takes some time to start.
            </p>
            <CircularProgress style={{ marginTop: "20px" }} />
          </div>
        )) ||
          (isFound === true && vehicles.length === 0 && (
            <div style={{ width: "100%", textAlign: "center" }}>
              <h2>No bikes found for the given price and location.</h2>
            </div>
          )) ||
          (vehicles.length > 0 &&
            vehicles.map((vehicle) => (
              <Grid key={vehicle.id} item xs={12} sm={6} md={4} lg={4}>
                <Vehicle {...vehicle} />
              </Grid>
            )))}
      </Grid>
    </div>
  );
}

export default IndexPage;
