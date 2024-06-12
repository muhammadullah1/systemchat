// src/app.ts

import cors from "cors"; // Importando o pacote cors
import dotenv from "dotenv";
import express from "express";
import envTokenAuth from "./middleware/envTokenAuth";
import isAuth from "./middleware/isAuth";
import tokenAuth from "./middleware/tokenAuth";
import routes from "./routes";

dotenv.config();
const app = express();

// Configurando CORS
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

// Middlewares
app.use(express.json()); // Para o body parser
app.use(express.urlencoded({ extended: true }));

// Rotas públicas (que não precisam de autenticação)
app.use("/api", routes);

// Middlewares de autenticação aplicados apenas após as rotas públicas
app.use(envTokenAuth);
app.use(isAuth);
app.use(tokenAuth);

export default app;
