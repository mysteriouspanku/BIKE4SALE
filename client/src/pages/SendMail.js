import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SendMail() {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [messageBody, setMessageBody] = useState(
    "I am interested in your bike. Please contact me."
  );
  const { id } = useParams();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  async function handleSubmit(event) {
    event.preventDefault();

    const Owner = await axios.get(`${BASE_URL}/profile/${id}`);

    try {
      const response = await axios.post(
        `${BASE_URL}/sendMail`,
        {
          customerName,
          customerEmail,
          messageBody,
          ownerEmail: Owner.data.email,
          ownerName: Owner.data.username,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("response: ", response);

      if (response.status === 200) {
        alert("Email sent successfully");
      } else {
        alert("Email sending failed");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Box
        p={3}
        borderRadius="10px"
        bgcolor="white"
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
        maxWidth="400px"
        width="100%"
      >
        <Typography
          variant="h4"
          align="center"
          mb={4}
          fontWeight="bold"
          color="#1976d2"
          fontFamily="Roboto, sans-serif"
        >
          Contact Owner
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box className="login">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  size="small"
                  value={customerName}
                  required={true}
                  onChange={(ev) => setCustomerName(ev.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  size="small"
                  value={customerEmail}
                  required={true}
                  onChange={(ev) => setCustomerEmail(ev.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-textarea"
                  label="Email Body"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={messageBody}
                  required={true}
                  onChange={(ev) => setMessageBody(ev.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  fullWidth
                  sx={{
                    mt: 2,
                    borderRadius: "8px",
                    backgroundColor: "#1976d2",
                    "&:hover": {
                      backgroundColor: "#1565c0",
                    },
                  }}
                >
                  Send Mail
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default SendMail;
