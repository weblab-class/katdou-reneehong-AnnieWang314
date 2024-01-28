import { Schema, model, Document } from "mongoose";

const TermSchema = new Schema({
  term: String,
  definition: String,
  example: String,
});

export interface Term extends Document {
  term: String;
  definition: String;
  example: String;
}

const TermModel = model<Term>("Term", TermSchema);

export default TermModel;
