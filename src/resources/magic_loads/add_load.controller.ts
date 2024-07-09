import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/magic_loads/add_load.validation";
import LoadService from "@/resources/magic_loads/add_load.service";
// import loadModel from "./add_load.model";
import addModel from "@/resources/add_mover/add.model";
import add_itemModel from "@/resources/add_item/add_item.model";
import add_loadModel from "./add_load.model";

export var mover_data: any;

class AddLoadController implements Controller {
  public path = "/add_load";
  public pathToMover = "/get_mover/:_id";
  public pathToitem = "/get_item/:_id";
  public updateMover = "/update_mover/:id";
  public router = Router();
  public items: any = {};
  private loadService = new LoadService();
  public load_id: any = "66897a2d338b73bdc89d3501";
  public item_list: any[] = [];
  public total_carry: number = 0;

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}`,
      validationMiddleware(validate.create),
      this.create,
    );
    // this.router.get(`${this.pickMover}`, this.picking); // session
    // this.router.post(`${this.path}`, this.create);
    this.router.get(`${this.pathToMover}`, this.getMover);
    this.router.get(`${this.pathToitem}`, this.getItem);
    this.router.get(`${this.updateMover}`, this.update);
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { items, mover_id, carry_weight, weight_limit } = req.body;
      const add = await this.loadService.create(
        items,
        mover_id,
        carry_weight,
        weight_limit,
      );
      res.status(201).json({ add });
      this.load_id = add["_id"];
      console.log(this.load_id);
      // this.items = ;
      // console.log(this.user_id);
    } catch (e) {
      next(new HttpException(400, "Cannot add magic mover"));
      console.log(e);
    }
  };

  // "_id": "668326796c70fcacdab56265",

  private getItem = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    await add_itemModel
      .findOne({ _id: req.params._id })
      .exec()
      .then((result) => {
        // let item_data = result;
        if (mover_data["state"] == "Loading") {
          this.total_carry += result!["item_weight"];
          if (this.total_carry <= mover_data["weight_limit"]) {
            res.send(result);
            this.item_list.push(result);
            this.updateLoad(this.load_id, this.item_list);
          } else {
            res.send("Weight limit exceeded, can not add this item");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  private getMover = async (req: Request, res: Response) => {
    // const data = req.body;
    // res.send(data);
    await addModel
      .findOne({ first_name: req.params.first_name })
      .exec()
      .then((result) => {
        mover_data = result;
        res.send(mover_data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  private updateLoad = async (_id: any, body: object[]): Promise<void> => {
    try {
      const filter = { _id: _id };
      const update = {
        items: body,
        mover_id: 111,
        weight_limit: 33,
      };

      const doc = await add_loadModel.findOneAndUpdate(filter, update, {
        new: true,
      });
      console.log("Updated successfully\n");
      console.log(doc);
    } catch (e) {
      // next(new HttpException(400, "Cannot update magic status"));
      console.log(e);
    }
  };

  private update = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const filter = { first_name: req.params.first_name };
      const update = { quest_state: "Loading" };

      const doc = await addModel.findOneAndUpdate(filter, update, {
        new: true,
      });
      console.log("Updated successfully\n");
      res.send(doc);
    } catch (e) {
      next(new HttpException(400, "Cannot update magic status"));
    }
  };
}

export default AddLoadController;
