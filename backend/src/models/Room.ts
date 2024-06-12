// src/models/Room.ts

import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import sequelize from "../database";

interface RoomAttributes {
  id: number;
  name: string;
  createdAt?: Date;
}

interface RoomCreationAttributes extends Optional<RoomAttributes, "id" | "createdAt"> {}

class Room extends Model<RoomAttributes, RoomCreationAttributes> implements RoomAttributes {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
}

function initializeRoomModel(sequelize: Sequelize) {
  const RoomModel = Room.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
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
      modelName: "Room",
      tableName: "Rooms",
      timestamps: false,
    }
  );

  return RoomModel;
}

export default initializeRoomModel;
export { Room, RoomAttributes, RoomCreationAttributes };
