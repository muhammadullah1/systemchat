// src/config/index.ts

import dotenv from 'dotenv';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const backend_url = process.env.backend_url || 'http://localhost:3000';
export const frontend_url = process.env.frontend_url || 'http://localhost:3001';
export const proxy_port = parseInt(process.env.proxy_port || '3000');

export const dbConfig = {
  host: process.env.DB_host || 'localhost',
  dialect: process.env.DB_dialect || 'postgres', // Aqui está definido como DB_dialect
  username: process.env.DB_user || 'root',
  password: process.env.DB_pass || '123',
  database: process.env.DB_name || 'postgres',
  port: parseInt(process.env.DB_port || '5432'),
};

export const jwtSecret = process.env.jwt_secret || 'myjwtsecret';
