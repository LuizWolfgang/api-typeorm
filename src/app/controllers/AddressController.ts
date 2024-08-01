import { Request, Response, Router } from "express";
import AddressRepository from "../repositories/AddressRepository";

class AddressController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.getAllAddress);
    this.router.post("/", this.createAddress);
    this.router.delete("/:id", this.deleteAddress);
  }

  private async getAllAddress(req: Request, res: Response) {
    const address = await AddressRepository.getAddress();
    res.status(200).json(address);
  }

  private async createAddress(req: Request, res: Response) {
    const addressCreated = await AddressRepository.newAddress(req.body);
    res.status(201).json(addressCreated);
  }

  private async deleteAddress(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const addressDeleted = await AddressRepository.removeAddress(id);
    res.status(200).json({ message: addressDeleted });
  }
}

const addressRouter = new AddressController().router;

export default addressRouter;
