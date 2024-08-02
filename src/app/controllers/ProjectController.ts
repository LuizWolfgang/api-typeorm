import { Request, Response, Router } from "express";
import { ProjectRepository } from "../repositories/ProjectRepository";

class ProjectController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.getAllProjects);
    this.router.post("/", this.createProject);
    this.router.get("/:id", this.getProject);
    this.router.delete("/:id", this.deleteProject);
  }

  private async getAllProjects(req: Request, res: Response) {
    const projects = await ProjectRepository.getProjects();
    res.status(200).json(projects);
  }

  private async createProject(req: Request, res: Response) {
    const projectCreated = await ProjectRepository.newProject(req.body);
    res.status(201).json(projectCreated);
  }

  private async getProject(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const project = await ProjectRepository.getProject(id);
    res.status(200).json(project);
  }

  private async deleteProject(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const projectDeleted = await ProjectRepository.removeProject(id);
    res.status(200).json({ message: projectDeleted });
  }
}

export const projectRouter = new ProjectController().router;

