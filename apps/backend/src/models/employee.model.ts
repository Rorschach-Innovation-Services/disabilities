/**
 * Creating a Model for an Employee
 */

import mongoose, { Schema, Document, model } from "mongoose";

/**
 * Interface representing an Employee Document in MongoDB
 */
export interface EmployeeDocument extends Document {
  name: string,
  age: number,
  gender: string,
  email: string,
  phone: string,
  company: Schema.Types.ObjectId,
  id_number: string,
  assessment?: Schema.Types.ObjectId,
  department: Schema.Types.ObjectId,
  createdAt: Date,
  deleted: boolean;
}

export interface EmployeeDb extends EmployeeDocument, Document { }

/**
 * Employee Schema corresponding to an Employee Document
 */
const EmployeeSchema: Schema = new Schema<EmployeeDocument>({
  name: {
    type: String,
    required: [true, "Name Required!"],
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email Required"],
    unique: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    required: [true, "Company Required!"],
    ref: "Company",
  },
  id_number: {
    type: String,
  },
  assessment: {
    type: Schema.Types.ObjectId,
    ref: "Assessment",
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  deleted: {
      type: Boolean,
      default: false,
  },
});

/**
 * Employee Model
 */
const Employee = model<EmployeeDocument>("Employee", EmployeeSchema);

export default Employee;
