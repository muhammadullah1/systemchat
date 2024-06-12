import { Sequelize, Dialect } from 'sequelize';
import { dbConfig } from '../config';

const { host, dialect, username, password, database, port } = dbConfig;

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: dialect as Dialect, // Convertendo 'dialect' para o tipo 'Dialect'
});

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default sequelize;
