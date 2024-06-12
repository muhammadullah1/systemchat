// src/models/UserRoom.ts

import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import sequelize from "../database";
import { User } from "./User";
import { Room } from "./Room";

interface UserRoomAttributes {
  id: number;
  userId: number;
  roomId: number;
}

interface UserRoomCreationAttributes extends Optional<UserRoomAttributes, "id"> {}

class UserRoom extends Model<UserRoomAttributes, UserRoomCreationAttributes> implements UserRoomAttributes {
  public id!: number;
  public userId!: number;
  public roomId!: number;
}

function initializeUserRoomModel(sequelize: Sequelize) {
  const UserRoomModel = UserRoom.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
    },
    {
      sequelize,
      modelName: "UserRoom",
      tableName: "UserRooms",
      timestamps: false,
    }
  );

  return UserRoomModel;
}

export default initializeUserRoomModel;
export { UserRoom, UserRoomAttributes, UserRoomCreationAttributes };
