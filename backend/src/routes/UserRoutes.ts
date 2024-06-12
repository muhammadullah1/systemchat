// src/routes/UserRoutes.ts

import express from "express";
import UserController from "../controllers/UserController";
import tokenAuth from "../middleware/tokenAuth";

const router = express.Router();

router.post("/create", UserController.createUser);
router.post("/login", UserController.loginAuth);
router.get("/list", tokenAuth, UserController.listUsers);
router.delete("/:userId", tokenAuth, UserController.deleteUser);
router.put("/edit/:userId", tokenAuth, UserController.editUser);
export default router;
