// src/models/User.ts

import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import sequelize from "../database";

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email: string;
  createdAt?: Date;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "createdAt"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public readonly createdAt!: Date;
}

function initializeUserModel(sequelize: Sequelize) {
  const UserModel = User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      modelName: "User", // Nome do modelo
      tableName: "Users", // Nome da tabela no banco de dados
      timestamps: false,
    }
  );

  return UserModel;
}

export default initializeUserModel;
export { User, UserAttributes, UserCreationAttributes, sequelize };
