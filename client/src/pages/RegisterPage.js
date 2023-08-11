import { TextField, Button, Box, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  async function register(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/register`,
        { username, email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setUserInfo(response.data);
        setRedirect(true);
        alert("User created successfully");
      } else {
        alert("User creation failed");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  }

  if (redirect) {
    navigate("/");
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
          mb={3}
          fontWeight="bold"
          color="#1976d2"
          fontFamily="Roboto, sans-serif"
        >
          Create an Account
        </Typography>
        <form onSubmit={register}>
          <TextField
            fullWidth
            margin="dense"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
            sx={{
              mt: 3,
              borderRadius: "8px",
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            Register
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default RegisterPage;
