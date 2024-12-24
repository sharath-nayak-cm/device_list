import { Schema, model, Document } from "mongoose";
import { IUser } from "./IUser";
import bcrypt from "bcrypt";

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
});

UserSchema.methods.validatePassword = async function (
  password: string
): Promise<boolean> {
  const isValid = bcrypt.compare(password, this.password);
  return isValid;
};

const User = model<IUser>("User", UserSchema);
export default User;
