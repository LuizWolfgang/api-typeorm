import { Router } from "express";
import { addressRouter } from "../app/controllers/AddressController";
import { projectRouter } from "../app/controllers/ProjectController";
import { userRouter } from "../app/controllers/UserController";
import { userProjectRouter } from "../app/controllers/UserProjectController";
;

const routers = Router();

routers.use("/users", userRouter);
routers.use("/address", addressRouter);
routers.use("/projects", projectRouter);
routers.use("/usersprojects", userProjectRouter);

export default routers;
