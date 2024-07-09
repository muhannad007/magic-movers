import "dotenv/config";
import "module-alias/register";
import validateEnv from "@/utils/validateEnv";
import App from "./app";
import AddController from "@/resources/add_mover/add.controller";
import AddItemController from "@/resources/add_item/add_item.controller";
import AddLoadController from "./resources/magic_loads/add_load.controller";
import MissionController from "./resources/missions/mission.controller";

validateEnv();

const app = new App(
  [
    new AddController(),
    new AddItemController(),
    new AddLoadController(),
    new MissionController(),
  ],
  Number(process.env.PORT),
);

app.listen();
