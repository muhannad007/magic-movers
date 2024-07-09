import { Document } from "mongoose";

export default interface Add extends Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  weight_limit: number;
  energy: number;
  quest_state: string;
}
