// src/services/SendPrivateService.ts
import { Message } from "../../models/Message";
import { UserRoom } from "../../models/UserRoom"; // Importe o modelo de associação entre usuários e salas

class SendPrivateService {
  async sendPrivateMessage(content: string, userId: number, roomId: number, senderName: string) {
    try {
      const message = await Message.create({ content, userId, roomId, senderName });
      return message;
    } catch (error) {
      console.error("Error sending private message in SendPrivateService:", error);
      throw new Error("Failed to send private message");
    }
  }

  async addUserToRoom(userId: number, roomId: number) {
    try {
      // Verifique se o usuário já está na sala
      const userInRoom = await UserRoom.findOne({ where: { userId, roomId } });
      if (userInRoom) {
        throw new Error("User already in the room");
      }

      // Adicione o usuário à sala
      await UserRoom.create({ userId, roomId });
    } catch (error) {
      console.error("Error adding user to room:", error);
      throw new Error("Failed to add user to room");
    }
  }
}

export default new SendPrivateService();
