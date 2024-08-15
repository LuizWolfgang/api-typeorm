import { Router } from "express";
import { addressRouter } from "../app/controllers/AddressController";
import { projectRouter } from "../app/controllers/ProjectController";
import { userRouter } from "../app/controllers/UserController";
import { userProjectRouter } from "../app/controllers/UserProjectController";
import profileRouter from "../app/controllers/ProfileController";
;

const routers = Router();

routers.use("/users", userRouter);
routers.use("/address", addressRouter);
routers.use("/projects", projectRouter);
routers.use("/usersprojects", userProjectRouter);
routers.use("/profiles", profileRouter);

export default routers;
