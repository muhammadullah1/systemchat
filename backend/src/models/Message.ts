// src/models/Message.ts

import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import sequelize from "../database";
import { User } from "./User";
import { Room } from "./Room";

interface MessageAttributes {
  id: number;
  content: string;
  userId: number;
  roomId: number;
  senderName?: string; // Adicionando senderName
  createdAt?: Date;
}

interface MessageCreationAttributes extends Optional<MessageAttributes, "id" | "createdAt"> {}

class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
  public id!: number;
  public content!: string;
  public userId!: number;
  public roomId!: number;
  public senderName?: string; // Definindo senderName
  public readonly createdAt!: Date;
}

function initializeMessageModel(sequelize: Sequelize) {
  const MessageModel = Message.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: "id",
        },
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Room,
          key: "id",
        },
      },
      senderName: { // Definindo senderName
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      modelName: "Message",
      tableName: "Messages",
      timestamps: false,
    }
  );

  return MessageModel;
}

export default initializeMessageModel;
export { Message, MessageAttributes, MessageCreationAttributes };
