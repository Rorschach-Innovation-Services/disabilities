import { Entity, EntityNames, MasterTable } from '@repo/db-wrapper';

export type DepartmentAttributes = {
  id: string;
  name: string;
  employeeSize: number;
  companyId: string;
  deleted: boolean;
  created: number;
  modified: number;
  _en?: EntityNames;
};

export const Department = new Entity<
  DepartmentAttributes,
  { id: string },
  { id: string },
  { companyId: string },
  { id: string }
>({
  name: 'department',
  partitionKey: { order: ['id'] },
  sortKey: { order: ['id'] },
  gsPartitionKey: { order: ['companyId'] },
  gsSortKey: { order: ['id'] },
  table: MasterTable,
});
