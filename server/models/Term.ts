import { Schema, model, Document } from "mongoose";

const TermSchema = new Schema({
  term: String,
  meaning: String,
  example: String,
});

export interface Term extends Document {
  term: string;
  meaning: string;
  example: string;
}

const TermModel = model<Term>("Term", TermSchema);

export default TermModel;
