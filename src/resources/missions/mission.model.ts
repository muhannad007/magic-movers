import { Schema, model } from "mongoose";
import mission from "@/resources/missions/mission.interface";

const missionSchema = new Schema(
  {
    title: {
      type: String,
      reruired: true,
    },
    state: {
      type: String,
      required: true,
    },
    mover_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default model<mission>("Mission", missionSchema);
