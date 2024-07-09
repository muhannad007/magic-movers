import { Document } from "mongoose";

export default interface Load extends Document {
  items: object;
  mover_id: number;
  carry_weight: number;
  weight_limit: number;
}
