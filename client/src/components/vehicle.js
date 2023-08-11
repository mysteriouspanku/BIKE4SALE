import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

function Vehicle({
  createdAt,
  _id,
  model,
  price,
  location,
  coverImage,
  owner,
}) {
  const createdDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  return (
    <Link
      to={`/vehicles/${_id}`}
      style={{
        textDecoration: "none",
        display: "block",
        width: "100%",
      }}
    >
      <Card
        sx={{
          borderRadius: "10px",
          margin: "auto",
          width: "100%",
          transition: "transform 0.2s",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <CardMedia
          component="img"
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
          image={`${BASE_URL}/` + coverImage}
          alt={"Image not found"}
        />
        <CardContent
          style={{
            padding: "16px",
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{
              marginBottom: "8px",
              color: "#333",
              fontWeight: "bold",
            }}
          >
            {model}
          </Typography>
          <Typography
            color={"#f09090"}
            variant="subtitle2"
            component="div"
            style={{
              marginBottom: "6px",
              fontSize: "0.85rem",
            }}
          >
            Added: {createdDate}
          </Typography>
          <Typography
            variant="body2"
            color="text.primary"
            style={{
              marginBottom: "4px",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            ₹{price}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              marginBottom: "4px",
            }}
          >
            Location: {location}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              marginBottom: "4px",
            }}
          >
            Owner: {owner.username}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default Vehicle;
