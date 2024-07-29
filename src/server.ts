import "reflect-metadata";
import "express-async-errors";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./database/dataSource";
import { routers } from "./routes";
import { httpErrorMiddleware } from "./app/middlewares/ErrorMiddleware";


AppDataSource.initialize().then(async () => {
  const app = express();

    app.use(cors());

    app.use(express.json());

    app.use(routers)

    app.use(httpErrorMiddleware)

    console.log("Database started!");

    app.listen(process.env.PORT || 3333, () => {
      console.log("Server started! port:", process.env.PORT || 3333);
    });
    
  }).catch((err) => {
  console.log("Erro in server", err.message)
});
