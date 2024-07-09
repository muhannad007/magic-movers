import { Router, Request, Response, NextFunction, response } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validattionMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/add_mover/add.validation";
import AddService from "@/resources/add_mover/add.service";
import addModel from "./add.model";

class AddController implements Controller {
  public path = "/add_mover";
  public pathToAll = "/get_movers";
  public loadMover = "/load_mover/:id";
  public stopLoading = "/stop_load/:id";
  public router = Router();
  public user_id: any = {};
  private AddService = new AddService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}`,
      validattionMiddleware(validate.create),
      this.create,
    );
    this.router.get(`${this.loadMover}`, this.load);
    this.router.get(`${this.stopLoading}`, this.stopLoad);
    this.router.get(`${this.pathToAll}`, this.getMover);
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const {
        first_name,
        last_name,
        email,
        password,
        weight_limit,
        energy,
        quest_state,
      } = req.body;
      const add = await this.AddService.create(
        first_name,
        last_name,
        email,
        password,
        weight_limit,
        energy,
        quest_state,
      );
      res.status(201).json({ add });
      this.user_id = add["_id"];
      console.log(this.user_id);
    } catch (e) {
      next(new HttpException(400, "Cannot add magic mover"));
    }
  };

  private getMover = async (req: Request, res: Response) => {
    await addModel
      .find()
      .sort({ createdAt: -1 })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  private load = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const filter = { first_name: req.params._id };
      const update = { quest_state: "loading" };

      const doc = await addModel.findOneAndUpdate(filter, update, {
        new: true,
      });
      doc!.first_name;
      doc!.quest_state;
      console.log("Updated successfully\n");
      res.send(doc);
    } catch (e) {
      next(new HttpException(400, "Cannot update magic status"));
    }
  };

  private stopLoad = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const filter = { first_name: req.params._id };
      const update = { quest_state: "Resting" };

      const doc = await addModel.findOneAndUpdate(filter, update, {
        new: true,
      });
      doc!.first_name;
      doc!.quest_state;
      console.log("Updated successfully\n");
      res.send(doc);
    } catch (e) {
      next(new HttpException(400, "Cannot update magic status"));
    }
  };
}

export default AddController;
