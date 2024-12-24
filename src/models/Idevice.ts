import { Schema, Document } from "mongoose";

export interface Idevice extends Document {
  name: string;
  deviceId: number;
  deviceType: string;
  assignedTo: Schema.Types.ObjectId;
  getAssignedUserName(): Promise<string>;
}
