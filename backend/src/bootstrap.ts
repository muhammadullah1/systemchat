// src/bootstrap.ts

import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { dbConfig } from './config';

const { host, dialect, username, password, database, port } = dbConfig;

export const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: dialect as 'postgres',
});

export default sequelize;
