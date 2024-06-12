import { ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/global-styles.css";
import { AuthProvider, useAuth } from "./context/auth/AuthContext";
import AppRoutes from "./routes/index";
import { api } from "./services/api";
import theme from "./theme";

const useAxiosInterceptors = () => {
  const { logoutUser } = useAuth();

  React.useEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 400)
        ) {
          if (error.response.status === 400) {
            toast.error("Invalid token, please login again!");
            logoutUser();
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [logoutUser]);
};

const AppWithAxios = () => {
  useAxiosInterceptors();
  return <AppRoutes />;
};
const App = () => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <AppWithAxios />
    </AuthProvider>
    <ToastContainer />
  </ThemeProvider>
);

export default App;
