import "reflect-metadata";
import "express-async-errors";
import express from "express";
import cors from "cors";
import { AppDataSource, AppDataSourceMongoDB } from "./database/dataSource";
import { httpErrorMiddleware } from "./app/middlewares/ErrorMiddleware";
import routers from "./routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use(routers);

app.use(httpErrorMiddleware);

AppDataSourceMongoDB.initialize().then(async () => {
  console.log("Database MongoDB started!");
});

AppDataSource.initialize().then(async () => {
  console.log("Database started!");
  app.listen(process.env.PORT || 3333, () => {
    console.log("Server started!");
  });
});
