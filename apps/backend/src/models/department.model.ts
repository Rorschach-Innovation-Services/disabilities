import mongoose, { Schema, Document, model } from "mongoose";
import { AssessmentDocument } from "./assessment.model";
import { CompanyDocument } from "./company.model";
import { EmployeeDb, EmployeeDocument } from "./employee.model";

/**
 * Interface representing a Department Document in MongoDB
 */
export interface DepartmentDocument extends Document, DepartmentDb {}

export interface DepartmentDb {
  created: string;
  name: string;
  employees: Schema.Types.ObjectId[] | EmployeeDocument[] | EmployeeDb[];
  employeeSize: number;
  company: Schema.Types.ObjectId | CompanyDocument;
  assessments: Schema.Types.ObjectId[] | AssessmentDocument[];
  deleted: boolean;
}

/**
 * Department Schema corresponding to an Assessment Document
 */
const DepartmentSchema = new Schema<DepartmentDocument>(
  {
    name: {
      type: String,
      required: [true, " name required"],
    },
    employees: [
      {
        type: Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
    employeeSize: {
      type: Number,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
    },
    assessments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Assessment",
      },
    ],
    created: {
      type: String,
      default: Date(),
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

/**
 * Department Model
 */
const Department = model<DepartmentDocument>("Department", DepartmentSchema);

export default Department;
