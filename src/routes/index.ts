import { Router } from "express";
import { userRouter } from "../app/controllers/UserController";

export const routers = Router();

routers.use("/users", userRouter);

