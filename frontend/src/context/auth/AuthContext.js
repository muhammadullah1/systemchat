import React, { createContext, useContext, useReducer } from "react";
import { ToastContainer, toast } from "react-toastify"; // Importando toastify e ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Importando o estilo padrão do toastify
import { api } from "../../services/api";
import AuthReducer from "./AuthReducer";

let token = JSON.parse(localStorage.getItem("token"));

let InitialState = {
  token: token ? token : null,
  isAuthenticated: token ? true : false,
  error: null,
};

const AuthContext = createContext();

const getAuth = () => {
  if (!localStorage) {
    return null;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  return token;
};

export const AuthProvider = ({ children }) => {
  let [state, dispatch] = useReducer(AuthReducer, InitialState);

  // Login User
  const loginUser = async (formData) => {
    try {
      const response = await api.post("/api/users/login", formData);
      localStorage.setItem("token", JSON.stringify(response?.data.token));
      localStorage.setItem("user_data", JSON.stringify(response?.data.user));
      dispatch({
        type: "LOGIN_USER",
        payload: response?.data.token,
      });
      // Exibindo toastify de sucesso após o login
      toast.success("Login efetuado com sucesso!");
    } catch (error) {
      let message = error?.response?.data?.message || error?.message;
      toast.error(message);
    }
  };

  //Logout User
  const logoutUser = () => {
    dispatch({
      type: "LOGOUT_USER",
    });
  };

  let contextValues = { loginUser, logoutUser, ...state };
  return (
    <AuthContext.Provider value={contextValues}>
      {children}
      <ToastContainer />{" "}
      {/* Renderizando o ToastContainer no componente raiz */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
