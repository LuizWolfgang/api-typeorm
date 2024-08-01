import { Router } from "express";
import { userRouter } from "../app/controllers/UserController";
import addressRouter from "../app/controllers/AddressController";

const routers = Router();

routers.use("/users", userRouter);
routers.use("/address", addressRouter);

export default routers;
