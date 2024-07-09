import { Schema, model } from "mongoose";
import Load from "@/resources/magic_loads/add_load.interface";

const loadSchema = new Schema(
  {
    items: {
      type: Object,
      required: true,
    },
    mover_id: {
      type: Number,
      required: true,
    },
    carry_weight: {
      type: Number,
      required: true,
    },
    weight_limit: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export default model<Load>("Load", loadSchema);
