import { Document } from "mongoose";

export default interface mission extends Document {
  title: string;
  state: string;
  mover_id: string;
}
