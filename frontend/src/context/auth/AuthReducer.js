import { setAuthToken } from "../../Utils/axios";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER": {
      setAuthToken(action.payload);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        error: null,
      };
    }
    case "LOGOUT_USER": {
      localStorage.removeItem("user_data");
      localStorage.removeItem("token");
      setAuthToken(null);
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        error: null,
      };
    }
    case "AUTH_ERROR": {
      setAuthToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user_data");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default AuthReducer;
