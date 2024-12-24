import { Schema, model, Document } from "mongoose";
import User from "./User";
import { IUser } from "./IUser";
import { Idevice } from "./Idevice";

const deviceSchema = new Schema<Idevice>({
  name: { type: String, require: true, uniq: true },
  deviceId: {
    type: Number,
    required: true,
    uniq: true,
  },
  deviceType: { type: String, required: true },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
});

// Instance method to get the assigned user's name
deviceSchema.methods.getAssignedUserName = async function (): Promise<string> {
  await this.populate("assignedTo").execPopulate();
  const user = this.assignedTo as IUser;
  return user.username;
};
const Device = model<Idevice>("Device", deviceSchema);

export default Device;
