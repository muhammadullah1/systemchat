import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Layout from "../layout";
import CreateUserPage from "../pages/CreateUser";
import Dashboard from "../pages/Dashboard";
import Groups from "../pages/GroupsAndSub";
import Instructions from "../pages/ProductionInstructions";
import Orders from "../pages/ProductionOrders";
import Products from "../pages/Products";

const AuthenticatedRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/users" element={<CreateUserPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/production-orders" element={<Orders />} />
          <Route path="/production-instructions" element={<Instructions />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AuthenticatedRoutes;
