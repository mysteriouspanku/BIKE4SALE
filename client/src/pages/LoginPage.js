import { TextField, Button, Box, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  async function login(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setUserInfo(response.data);
        setRedirect(true);
      } else {
        alert("Wrong credentials");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
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
          Login
        </Typography>
        <form onSubmit={login} autoComplete="off">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Username"
            variant="outlined"
            margin="dense"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
            autoFocus
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
            Log In
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default LoginPage;
