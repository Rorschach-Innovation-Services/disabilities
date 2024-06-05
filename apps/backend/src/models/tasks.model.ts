import { Entity, EntityNames, MasterTable } from '@repo/db-wrapper';

export type TaskAttributes = {
  id: string;
  title: string;
  adminId: string;
  adminEmail: string;
  content: string;
  photo: string;
  complete: boolean;
  deleted: boolean;
  created: number;
  modified: number;
  _en?: EntityNames;
};

export const Task = new Entity<
  TaskAttributes,
  { id: string },
  { id: string },
  { _en: EntityNames },
  { id: string; adminId: string }
>({
  name: 'task',
  partitionKey: { order: ['id'] },
  sortKey: { order: ['id'] },
  gsPartitionKey: { order: ['_en'] },
  gsSortKey: { order: ['adminId', 'id'] },
  table: MasterTable,
});
