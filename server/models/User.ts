import { Schema, model, Document } from "mongoose";

const UserSchema = new Schema({
  name: String,
  googleid: String,
  aboutme: { type: String, default: "" },
  color: { type: String, default: "#d5d1ff" },
  date: String,
});

export interface User extends Document {
  name: string;
  googleid: string;
  _id: string;
  aboutme: { type: String; default: "" };
  color: { type: String; default: "#d5d1ff" };
  date: String;
}

const UserModel = model<User>("User", UserSchema);

export default UserModel;
