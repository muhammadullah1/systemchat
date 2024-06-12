// src/controllers/UserController.ts

import { Request, Response } from "express";
import CreateUserService from "../services/UserServices/CreateUserService";
import DeleteUserService from "../services/UserServices/DeleteUserService";
import EditUserService from "../services/UserServices/EditUserService";
import ListUserService from "../services/UserServices/ListUserService";
import LoginAuthService from "../services/UserServices/LoginAuthService";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { username, password, email } = req.body;
      const newUser = await CreateUserService.execute(
        username,
        password,
        email
      );
      return res.status(201).json(newUser);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async loginAuth(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const data = await LoginAuthService.execute(username, password);
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  async listUsers(req: Request, res: Response) {
    try {
      const users = await ListUserService.execute();
      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      await DeleteUserService.execute(parseInt(userId, 10));
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async editUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { username, password, email } = req.body;
      const updatedUser = await EditUserService.execute(
        parseInt(userId, 10),
        username,
        password,
        email
      );
      return res.status(200).json(updatedUser);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new UserController();
