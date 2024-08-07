import { Request, Response, Router } from "express";
import UserProjectRepository from "../repositories/UserProjectRepository";

class UserProjectController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.getAllUserProjects);
    this.router.post("/", this.createUserProject);
    this.router.get("/:id", this.getUserProject);
    this.router.put("/:id", this.updateUserProject);
    this.router.delete("/:id", this.deleteUserProject);
    this.router.post("/createall", this.createAll);
  }

  private async getAllUserProjects(req: Request, res: Response) {
    const userProjects = await UserProjectRepository.getUsersProjects();
    res.status(200).json(userProjects);
  }

  private async createUserProject(req: Request, res: Response) {
    const userProjectCreated = await UserProjectRepository.newUserProject(
      req.body,
    );
    res.status(201).json(userProjectCreated);
  }

  private async getUserProject(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const userProject = await UserProjectRepository.getUserProject(id);
    res.status(200).json(userProject);
  }

  private async updateUserProject(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const userProjectUpdated = await UserProjectRepository.updateUserProject(
      id,
      req.body,
    );
    res.status(200).json({ message: userProjectUpdated });
  }

  private async deleteUserProject(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const userProjectDeleted =
      await UserProjectRepository.removeUserProject(id);
    res.status(200).json({ message: userProjectDeleted });
  }


  private async createAll(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const userProjectCreated =
      await UserProjectRepository.createAll(req.body);
    res.status(200).json(userProjectCreated);
  }
}

export const userProjectRouter = new UserProjectController().router;


