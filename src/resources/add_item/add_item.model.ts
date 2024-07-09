import { Schema, model } from "mongoose";
import AddItem from "@/resources/add_item/add_item.interface";

const AddSchema = new Schema(
  {
    item_name: {
      type: String,
      require: true,
    },
    item_weight: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export default model<AddItem>("Item", AddSchema);
