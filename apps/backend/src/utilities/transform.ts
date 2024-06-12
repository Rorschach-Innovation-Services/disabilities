// Containing helpers for the client files handler
import { Options } from 'json2csv';

interface TransformDataInput {
  employee: any;
  assessment: any;
  company: any;
}

export type TransformedResult = {
  [key: string]: string | number | undefined;
};

export const csvOptions: Options<[] | TransformedResult[]> = {
  escapedQuote: '',
  quote: '',
};

// Used to transform the data into a format that can be placed in a csv file
export const transformData = ({
  employee,
  assessment,
  company,
}: TransformDataInput): TransformedResult => {
  const result = {};
  (assessment.questionnaire as any[]).forEach((question) => {
    // Remove comma that will interfere with the delimiter
    if (question.question.includes(',')) {
      question.question = question.question.replace(',', '');
    }
    result[question.question] = question.response;
  });

  return result;
};
