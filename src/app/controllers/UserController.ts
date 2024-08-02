import { Request, Response, Router } from "express";
import { authenticateMiddleware } from "../middlewares/AuthMiddleware";
import { UserRepository } from "../repositories/UserRepository";


class UserController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes(); //inicializa as rotas
    }

    private initializeRoutes() {
    this.router.get("/", this.getAllUsers);
    this.router.post("/", this.createUser);
    this.router.get("/:id", authenticateMiddleware, this.getUser);
    this.router.put("/:id", this.updateUser);
    this.router.delete("/:id", this.deleteUser);
    this.router.post("/auth", this.authenticationUser);
    }

    private async getAllUsers(req: Request, res: Response) {
        
        const pageNumber = parseInt(req.query.pageNumber as string) || 1;
        const itemsPerPage = parseInt(req.query.itemsPerPage as string) || 10;
        const orderBy = (req.query.orderBy as string) || "name";
        const orderDirection =
          (req.query.orderDirection as "ASC" | "DESC") || "ASC";
    
        const options = {
          pageNumber,
          itemsPerPage,
          orderBy,
          orderDirection,
        };

        const users = await UserRepository.getUsers(options);
        res.status(200).json(users);
    }

    private async createUser(req: Request, res: Response) {
        const usersCreated = await UserRepository.newUser(req.body);
        res.status(201).json(usersCreated);
    }

    private async getUser(req: Request, res: Response) {
        const id = parseInt(req.params.id)
        const user = await UserRepository.getUser(id);
        res.status(200).json(user);
    }

    private async updateUser(req: Request, res: Response) {
        const id = parseInt(req.params.id)
        const userUpdated = await UserRepository.updateUser(id, req.body);

        res.status(200).json(userUpdated);
    }

    private async deleteUser(req: Request, res: Response) {
        const id = parseInt(req.params.id)
        const userDeleted = await UserRepository.deleteUser(id);

        res.status(200).json({ message: userDeleted });
    }

    private async authenticationUser(req: Request, res: Response) {
        const token = await UserRepository.auth(req.body);
        res.status(200).json(token);
      }
}

export const userRouter = new UserController().router