import { Schema, model, Document, Types } from "mongoose";
import { Term } from "./Term";

const UserProgressSchema = new Schema({
  level: Number,
  words: [
    {
      type: Schema.Types.ObjectId,
      ref: "Term",
    },
  ],
  questionsOrder: [Number],
  totalQuestionsAnswered: { type: Number, default: 0 },
});

const UserSchema = new Schema({
  name: String,
  googleid: String,
  aboutme: { type: String, default: "" },
  color: { type: String, default: "#d5d1ff" },
  date: { type: Date, default: Date.now },
  progress: [UserProgressSchema],
  flashcardsOrder: [
    {
      type: Schema.Types.Mixed,
      default: [],
    },
  ],
  currentIndex: {
    type: Number,
    default: 0,
  },
  completedWords: [
    {
      type: Schema.Types.Mixed,
      default: [],
    },
  ],
});

export interface UserProgress extends Document {
  level: number;
  words: Types.ObjectId[];
  questionsOrder: number[];
  totalQuestionsAnswered: number;
}

export interface User extends Document {
  name: string;
  googleid: string;
  _id: string;
  aboutme: { type: String; default: "" };
  color: { type: String; default: "#d5d1ff" };
  date: String;
  progress: UserProgress[];
  flashcardsOrder: Term[];
  currentIndex: number;
  completedWords: Term[];
}

const UserModel = model<User>("User", UserSchema);

export default UserModel;
