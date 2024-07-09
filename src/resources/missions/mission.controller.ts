import { Request, Response, NextFunction, Router } from "express";
import missionService from "@/resources/missions/mission.service";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/missions/mission.validation";
import { mover_data } from "@/resources/magic_loads/add_load.controller";
import missionModel from "@/resources/missions/mission.model";
import addModel from "@/resources/add_mover/add.model";

// mover_id: 668328536e6d1d042b03ebf5

class MissionController implements Controller {
  public router = Router();
  public path = "/add_mission";
  public mover: any = "668328536e6d1d042b03ebf5";
  private service = new missionService();
  public mission_id: any = "668bdf32aad21de68fc04681";
  public updatePath = "/end_mission";
  public listPath = "/list";
  public bestDrivers = new Map<string, number>();
  // num: number = 0;

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes() {
    this.router.post(
      `${this.path}`,
      validationMiddleware(validate.create),
      this.create,
    );
    this.router.post(`${this.updatePath}`, this.updateMission);
    this.router.get(`${this.listPath}`, this.topScorers);
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { title, state, mover_id } = req.body;
      const createMision = await this.service.create(title, state, mover_id);
      res.status(201).json({ createMision });
      this.mission_id = createMision["_id"];
      this.updateMoverState(mover_id, "On a mission");
    } catch (e) {
      next(new HttpException(400, "Cannot add new mission"));
      console.log(e);
    }
  };

  private updateMission = async (
    req: Request,
    res: Response,
  ): Promise<Response | void> => {
    try {
      const filter = req.body;
      const update = { state: "Done" };

      const doc = await missionModel.findOneAndUpdate(filter, update, {
        new: true,
      });
      res.send(doc);
      console.log("Mission updated sucessfully");
    } catch (e) {
      console.log(e);
    }
  };

  private updateMoverState = async (id: any, state: string): Promise<void> => {
    try {
      const filter = { _id: id };
      const update = { state: state };

      const doc = await addModel.findOneAndUpdate(filter, update, {
        new: true,
      });

      console.log(doc);
    } catch (e) {
      console.log(e);
    }
  };

  private topScorers = async (
    req: Request,
    res: Response,
  ): Promise<Response | void> => {
    missionModel
      .find()
      .sort({ createdAt: -1 })
      .then((result) => {
        result.forEach((mission) => {
          if (mission["state"] == "Done") {
            // let obj = { mover_id: mission["mover_id"] };
            if (this.bestDrivers.has(mission["mover_id"])) {
              let num: any = this.bestDrivers.get(mission["mover_id"]);
              this.bestDrivers.set(mission["mover_id"], num++);
            } else {
              this.bestDrivers.set(mission["mover_id"], 1);
            }
          }
        });
        res.send(JSON.stringify(Array.from(this.bestDrivers)));
        console.log(this.bestDrivers);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export default MissionController;
