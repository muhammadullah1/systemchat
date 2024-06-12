// src/services/MessageService.ts
import { Message } from "../../models/Message";

class MessageService {
  async getMessages(roomId: number) {
    try {
      const messages = await Message.findAll({ where: { roomId } });
      return messages;
    } catch (error) {
      console.error("Error fetching messages in MessageService:", error);
      throw new Error("Failed to fetch messages");
    }
  }
}

export default new MessageService();
