import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Box, Typography, Grid, Button } from "@mui/material";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";

function VehiclePage() {
  const [vehicleData, setVehicleData] = useState({});
  const { userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/vehicles/${id}`)
      .then((response) => {
        setVehicleData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  async function deleteVehicle() {
    try {
      const response = await axios.delete(`${BASE_URL}/deleteVehicle/${id}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (redirect) return <Navigate to="/" />;

  const lastUpdated = vehicleData.updatedAt
    ? formatDistanceToNow(new Date(vehicleData.updatedAt), {
        addSuffix: true,
      })
    : "";
  return (
    <Box
      sx={{
        m: "2rem",
        backgroundColor: "#f5f5f5",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      {userInfo &&
        vehicleData.owner &&
        userInfo.id === vehicleData.owner._id && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              color="error"
              startIcon={<FaTrashAlt />}
              onClick={deleteVehicle}
              sx={{ marginRight: "10px" }}
            >
              Delete
            </Button>
            <Link to={`/edit/${id}`} style={{ textDecoration: "none" }}>
              <Button variant="contained" color="info" startIcon={<FaEdit />}>
                Edit
              </Button>
            </Link>
          </Box>
        )}

      <img
        src={`${BASE_URL}/${vehicleData.coverImage}`}
        alt=""
        style={{ maxWidth: "100%", borderRadius: "8px", marginTop: "10px" }}
      />
      <Typography variant="subtitle1" sx={{ marginTop: "10px" }}>
        Last Updated: {lastUpdated}
      </Typography>
      <Box sx={{ marginTop: "20px" }}>
        <Typography variant="h4">{vehicleData.model}</Typography>
        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">
              <b>Price:</b> ₹{vehicleData.price}
            </Typography>
            <Typography variant="h6">
              <b>Age:</b> {vehicleData.age}
            </Typography>
            <Typography variant="h6">
              <b>Mileage:</b> {vehicleData.mileage}
            </Typography>
            <Typography variant="h6">
              <b>Engine Capacity:</b> {vehicleData.engineCapacity}
            </Typography>
            <Typography variant="h6">
              <b>Fuel Type:</b> {vehicleData.fuelType}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">
              <b>Location:</b> {vehicleData.location}
            </Typography>
            <Typography variant="h6" whiteSpace="pre-wrap">
              <b>Description:</b> {vehicleData.description}
            </Typography>
          </Grid>
        </Grid>
        {vehicleData.owner && (
          <Box
            sx={{
              marginTop: "20px",
              borderTop: "1px solid #ccc",
              paddingTop: "20px",
            }}
          >
            <Typography variant="h5">
              Owner: {vehicleData.owner.username}
            </Typography>
            <Link
              to={`/sendMail/${vehicleData.owner._id}`}
              style={{ textDecoration: "none", display: "block" }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  marginTop: "20px",
                  width: "100%",
                  backgroundColor: "#3f51b5", // Custom primary color
                  "&:hover": {
                    backgroundColor: "#2f3a87", // Darker shade on hover
                  },
                }}
              >
                Contact Owner
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default VehiclePage;
