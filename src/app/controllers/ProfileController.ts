import { Request, Response, Router } from "express";
import { ProfileRepository } from "../repositories/ProfileRepository";

class ProfileController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.getAllProfiles);
    this.router.post("/", this.createProfile);
  }

  private async getAllProfiles(req: Request, res: Response) {
    const profiles = await ProfileRepository.getProfile();
    res.status(200).json(profiles);
  }

  private async createProfile(req: Request, res: Response) {
    const profileCreated = await ProfileRepository.createProfile(req.body);
    res.status(201).json(profileCreated);
  }
}

const profileRouter = new ProfileController().router;

export default profileRouter;
