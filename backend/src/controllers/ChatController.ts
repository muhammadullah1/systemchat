// src/controllers/ChatController.ts

import { Request, Response } from "express";
import SendPrivateService from "../services/ChatServices/SendChatService";
import MessageService from "../services/ChatServices/MessageService";
import RoomService from "../services/ChatServices/RoomService"; // Importe o RoomService

class ChatController {
  async sendPrivateMessage(req: Request, res: Response) {
    const { content, userId, roomId, senderName } = req.body;

    try {
      const message = await SendPrivateService.sendPrivateMessage(content, userId, roomId, senderName);
      res.json(message);
    } catch (error) {
      console.error("Error sending private message:", error);
      res.status(500).json({ error: "Failed to send private message" });
    }
  }

  async getMessages(req: Request, res: Response) {
    const { roomId } = req.params;

    try {
      const messages = await MessageService.getMessages(parseInt(roomId)); 
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  }

  async addUserToRoom(req: Request, res: Response) {
    const { userId, roomId } = req.body;

    try {
      await SendPrivateService.addUserToRoom(userId, roomId);
      res.json({ message: "User added to room successfully" });
    } catch (error) {
      console.error("Error adding user to room:", error);
      res.status(500).json({ error: "Failed to add user to room" });
    }
  }

  async createRoom(req: Request, res: Response) {
    const { name } = req.body;

    try {
      const room = await RoomService.createRoom(name); // Chame o método correto do RoomService
      res.json(room);
    } catch (error) {
      console.error("Error creating room:", error);
      res.status(500).json({ error: "Failed to create room" });
    }
  }

  async getRooms(req: Request, res: Response) {
    try {
      const rooms = await RoomService.getRooms(); // Chame o método correto do RoomService
      res.json(rooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      res.status(500).json({ error: "Failed to fetch rooms" });
    }
  }

  async getUserRooms(req: Request, res: Response) {
    const userId = parseInt(req.params.userId);

    try {
      const rooms = await RoomService.getRoomsForUser(userId);
      res.json(rooms);
    } catch (error) {
      console.error("Error fetching rooms for user:", error);
      res.status(500).json({ error: "Failed to fetch rooms for user" });
    }
  }
}

export default new ChatController();
