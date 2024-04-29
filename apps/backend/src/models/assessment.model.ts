/**
 * Model for an Assessment
 */

import { model, Schema, Document } from "mongoose";
import { EmployeeDocument } from "./employee.model";
import Questionnaire from "./questionnaire.model";

export interface Questionnaire {
  id: string,
  content: string,
  response: string,
}

const QuestionnaireSchema = new Schema({
  id: String,
  content: String,
  response: String
});

/**
 * Interface representing an Assessment Document in MongoDB
 */
export interface AssessmentDb {
  employee: Schema.Types.ObjectId | EmployeeDocument;
  questionnaire: Questionnaire[];
  score: Object;
  created: string;
  company: Schema.Types.ObjectId;
  department: Schema.Types.ObjectId;
  deleted: boolean;
}

export interface AssessmentDocument extends AssessmentDb, Document {}

export interface Score {
  TIB: number;
  TIBValue: number;
  TST: number;
  TSTValue: number;
  SE: number;
  SEValue: number;
  Quality: number;
  DayTimeFunction: number;
  DayTimeFunctionValue: number;
  Disorder: string;
  DisorderValue: number;
  DisorderManagement: string;
  DisorderManagementValue: number;
  DisorderModifiedValue: number;
  MedToSleep: string;
  MedToSleepValue: number;
  TotalValue: number;
  MedModifiedTotalValue: number;
  SleepHealthScore: number;
  SleepHealthScorePercentage: number;
}

/**
 * Assessment Schema corresponding to an Assessment Document
 */
const AssessmentSchema = new Schema<AssessmentDocument>(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "Employee Required!"],
    },
    questionnaire: [
      {
        type: QuestionnaireSchema,
      },
    ],
    score: {
      type: Object,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company Required!"],
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: [true, "Department Required!"],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: "created" } }
);

/**
 * Assessment Model
 */
const Assessment = model<AssessmentDocument>("Assessment", AssessmentSchema);

export default Assessment;
