import { Entity, EntityNames, MasterTable } from '@repo/db-wrapper';

export type QuestionnaireQuestionItem = {
  id: string;
  question: string;
  helperText: string;
  label: string;
  category: string;
};

export type QuestionnaireAttributes = {
  id: string;
  name: string;
  creator: {
    name: string;
    id: string;
  };
  order: number; // The order in which the questiionaires are administered
  questions: QuestionnaireQuestionItem[];
  created: number;
  deleted: boolean;
  modified: number;
  _en?: EntityNames;
};

export const Questionnaire = new Entity<
  QuestionnaireAttributes,
  { id: string },
  { id: string },
  { _en: EntityNames },
  { id: string }
>({
  name: 'questionnaire',
  partitionKey: { order: ['id'] },
  sortKey: { order: ['id'] },
  gsPartitionKey: { order: ['_en'] },
  gsSortKey: { order: ['id'] },
  table: MasterTable,
});
