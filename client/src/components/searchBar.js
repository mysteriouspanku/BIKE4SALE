import React, { useContext } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";
import { SearchContext } from "../context/SearchContext";

export default function VehicleSearchBar() {
  const {
    priceValue,
    setPriceValue,
    locationValue,
    setLocationValue,
    setPriceLow,
    setPriceHigh,
    setLocation,
  } = useContext(SearchContext);

  const handlePriceRangeChange = (low, high) => {
    setPriceLow(low);
    setPriceHigh(high);
    setPriceValue(`${low}-${high} lakhs`);
  };

  const handleLocationChange = (location) => {
    setLocation(location);
    setLocationValue(location);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f2f5f8", // Soft blue background color
        borderRadius: "10px",
        padding: "16px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Sort by Price ranges</FormLabel>
            <RadioGroup
              aria-label="price-range"
              name="price-range"
              value={priceValue}
              onChange={(e) => setPriceValue(e.target.value)}
            >
              <FormControlLabel
                value="allPrices"
                onClick={() => handlePriceRangeChange(0, -1)}
                control={<Radio />}
                label="All Prices"
              />
              <FormControlLabel
                value="0-5 lakhs"
                onClick={() => handlePriceRangeChange(0, 500000)}
                control={<Radio />}
                label="0-5 lakhs"
              />
              <FormControlLabel
                value="5-10 lakhs"
                onClick={() => handlePriceRangeChange(500000, 1000000)}
                control={<Radio />}
                label="5-10 lakhs"
              />
              <FormControlLabel
                value="above 10 lakhs"
                onClick={() => handlePriceRangeChange(1000000, -1)}
                control={<Radio />}
                label="above 10 lakhs"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Sort by locations</FormLabel>
            <RadioGroup
              aria-label="location"
              name="location"
              value={locationValue}
              onChange={(e) => handleLocationChange(e.target.value)}
            >
              <FormControlLabel
                value="allPlaces"
                onClick={() => handleLocationChange("")}
                control={<Radio />}
                label="All Places"
              />
              <FormControlLabel
                value="Bangalore"
                onClick={() => handleLocationChange("Bangalore")}
                control={<Radio />}
                label="Bangalore"
              />
              <FormControlLabel
                value="Delhi"
                onClick={() => handleLocationChange("Delhi")}
                control={<Radio />}
                label="Delhi"
              />
              <FormControlLabel
                value="Hyderabad"
                onClick={() => handleLocationChange("Hyderabad")}
                control={<Radio />}
                label="Hyderabad"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
