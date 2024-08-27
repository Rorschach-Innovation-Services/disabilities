import { Entity, MasterTable, EntityNames } from '../utilities/entity';

export type QuestionAttributes = {
  id: string;
  givenId: string;
  content: string;
  response: string;
  created: number;
  modified: number;
  _en?: EntityNames;
};

export const Question = new Entity<
  QuestionAttributes,
  { id: string },
  { id: string },
  { _en: EntityNames },
  { givenId: string }
>({
  name: 'question',
  partitionKey: { order: ['id'] },
  sortKey: { order: ['id'] },
  gsPartitionKey: { order: ['_en'] },
  gsSortKey: { order: ['givenId'] },
  table: MasterTable,
});
