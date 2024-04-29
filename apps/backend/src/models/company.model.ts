import { Schema, Document, model, Types } from "mongoose";
import { AdminDocument } from "./admin.model";
import { DepartmentDb, DepartmentDocument } from "./department.model";

/**
 * Interface representing a Company Document in MongoDB
 */
export interface CompanyDocument extends Document {
  name: string;
  employees: [Schema.Types.ObjectId];
  employeeSize: number;
  sector: string;
  hrConsultantName: string;
  hrConsultantEmail: string;
  phone: string;
  logo?: string;
  created: Date;
  admin: Types.ObjectId;
  deleted: boolean;
  status?: string;
  departments: Schema.Types.ObjectId[] | DepartmentDocument[] | DepartmentDb[];
}


/**
 * Company Schema corresponding to an Assessment Document
 */
const CompanySchema = new Schema<CompanyDocument>({
  name: {
    type: String,
    required: [true, "Company name required"],
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
  sector: {
    type: String,
    required: [true, "Company sector name required"],
  },
  departments: [{
    type: Schema.Types.ObjectId,
    ref: "Department"
  }],
  hrConsultantName: {
    type: String,
    required: [true, "HR consultant name required"],
  },
  hrConsultantEmail: {
    type: String,
    required: [true, "Consultant email address required"],
  },
  phone: {
    type: String,
  },
  logo: {
    type: String,
  },
  created: {
    type: Date,
    default: new Date(),
  },
  admin: {
    type: Schema.Types.ObjectId,
    required: true
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  status: String
});

/**
 * Company Model
 */
const Company = model<CompanyDocument>("Company", CompanySchema);

export default Company;
