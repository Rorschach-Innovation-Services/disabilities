// Containing helpers for the client files handler
import { AssessmentDocument } from "../models/assessment.model";
import { EmployeeDocument } from "../models/employee.model";
import { CompanyDocument } from "../models/company.model";
import { QuestionDocument } from "../models/question.model";
import { Options } from "json2csv";

interface TransformDataInput {
  employee: EmployeeDocument;
  assessment: AssessmentDocument;
  company: CompanyDocument;
}

export type TransformedResult = {
  Age: number;
  Gender: string;
  "Email address": string;
  Timestamp: string;
  "Name of organisation": string;
  "ID Number": string;
  [key: string]: string | number | undefined;
};

export const csvOptions: Options<[] | TransformedResult[]> = {
  escapedQuote: "",
  quote: "",
};

// Used to transform the data into a format that can be placed in a csv file
export const transformData = ({
  employee,
  assessment,
  company,
}: TransformDataInput): TransformedResult => {
  let result: TransformedResult = {
    Timestamp: assessment.created,
    "Email address": employee.email,
    Age: employee.age,
    Gender: employee.gender,
    "Name of organisation": company.name,
    "ID Number": employee.id_number.toString(),
  };

  (assessment.questionnaire as QuestionDocument[]).forEach((question) => {
    // Remove comma that will interfere with the delimiter
    if (question.content.includes(",")) {
      question.content = question.content.replace(",", "");
    }
    result[question.content] = question.response;
  });

  return result;
};
