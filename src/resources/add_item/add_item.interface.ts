import { Document } from "mongoose";

export default interface AddItem extends Document {
  item_name: string;
  item_weight: number;
}
