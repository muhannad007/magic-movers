import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validattionMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/add_item/add_item.validation";
import AddItemService from "@/resources/add_item/add_item.service";

class AddItemController implements Controller {
  public path = "/add_item";
  public router = Router();
  private addItemService = new AddItemService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}`,
      validattionMiddleware(validate.create),
      this.create,
    );
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { item_name, item_weight } = req.body;
      const add = await this.addItemService.create(item_name, item_weight);
      res.status(201).json({ add });
    } catch (e) {
      next(new HttpException(400, "Cannot add magic item"));
    }
  };
}

export default AddItemController;
