import { Entity, EntityNames, MasterTable } from '@repo/db-wrapper';

export type QuestionnaireAttributes = {
  id: string;
  name: string;
  creator: string;
  order: number; // The order in which the questiionaires are administered
  date: string;
  questionnaire: {
    id: string;
    content: string;
  }[];
  created: number;
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
