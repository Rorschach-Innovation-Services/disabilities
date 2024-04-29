/**
 * Creating a Model for an Question
 */
import { Schema, Document, model } from "mongoose";

/**
 * Interface representing a Question Document in MongoDB
 */
export interface QuestionnaireDocument extends Document {
    name: string,
    creator: string,
    date: Date,
    questionnaire: {
        id: string,
        content: string,
        response?: string
    }[]
}

/**
 * Question Schema corresponding to an Employee Document
 */
const QuestionnaireSchema = new Schema<QuestionnaireDocument>({
    name: {
        type: String,
        required: [true, "Questionnaire Name Required"],
    },
    creator: {
        type: String,
        required: [true, "Questionnaire Creator Name Required!"],
    },
    date: {
        type: Date,
        default: new Date()
    },
    questionnaire: [{
        type: {
            id: String,
            content: String,
            response: String
        },
        required: [true, "Questionnaire required!"]
    }]
});

/**
 * Question Model
 */
const Questionnaire = model<QuestionnaireDocument>("Questionnaire", QuestionnaireSchema);

export default Questionnaire;
 