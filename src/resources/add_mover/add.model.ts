import { Schema, model } from "mongoose";
import Add from "@/resources/add_mover/add.interface";

const AddSchema = new Schema(
  {
    first_name: {
      type: String,
      require: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    weight_limit: {
      type: Number,
      required: true,
    },
    energy: {
      type: Number,
      required: true,
    },
    quest_state: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default model<Add>("Mover", AddSchema);
