import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff"; // Importe a instância 'api' corretamente
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/images/logo.png";
import { useAuth } from "../../context/auth/AuthContext";

const GreenOutlinedTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    "& fieldset": {
      borderColor: "#000802",
    },
    "&:hover fieldset": {
      borderColor: "green",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
  "& .MuiInputLabel-outlined.Mui-focused": {
    color: "green",
  },
});

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { token, error, isAuthenticated, loginUser } = useAuth();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username) toast.error("Please enter a username");
    if (!password) toast.error("Please enter a password");

    if (username && password) {
      let formData = {
        username,
        password,
      };
      loginUser(formData);
    }
  };

  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, #01380E 0%, #103F1B 50%, #032B0D 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container component="main" maxWidth="xs">
        <ToastContainer />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: 4,
              borderRadius: 8,
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              width: "150%",
              height: "150%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "25px",
                marginTop: "-80px",
                mb: 4,
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ width: "100%", maxWidth: "300px" }}
              />
            </Box>
            <Typography component="h3" variant="h4" sx={{ mb: 1 }}>
              Bem-vindo!
            </Typography>
            <Typography
              variant="h12"
              sx={{ mb: 3, fontStyle: "italic", color: "text.secondary" }}
            >
              Faça seu login para acessar o sistema.
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <GreenOutlinedTextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Usuário"
                name="email"
                autoComplete="email"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <GreenOutlinedTextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#034212",
                  "&:hover": {
                    backgroundColor: "#02300d",
                  },
                }}
              >
                Entrar
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
