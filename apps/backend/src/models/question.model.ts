/**
 * Creating a Model for an Question
 */
import { Schema, Document, model } from "mongoose";

/**
 * Interface representing a Question Document in MongoDB
 */
export interface QuestionDocument extends Document {
  id: string,
  content: string,
  response?: string,
  created: string
}

/**
 * Question Schema corresponding to an Employee Document
 */
const QuestionSchema = new Schema<QuestionDocument>({
  id: {
    type: String,
    required: [true, "Question id Required"],
  },
  content: {
    type: String,
    required: [true, "Question Content Required!"],
  },
  response: {
    type: String,
  }
});

/**
 * Question Model
 */
const Question = model<QuestionDocument>("Question", QuestionSchema);

export default Question;
