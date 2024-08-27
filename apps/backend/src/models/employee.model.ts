import { Entity, MasterTable, EntityNames } from '../utilities/entity';

export type EmployeeAttributes = {
  id: string;
  name: string;
  email: string;
  companyId: string;
  departmentId: string;
  deleted: boolean;
  created: number;
  modified: number;
  _en?: EntityNames;
};

export const Employee = new Entity<
  EmployeeAttributes,
  { id: string },
  { id: string },
  { _en?: EntityNames },
  { companyId: string; id: string; departmentId: string }
>({
  name: 'employee',
  partitionKey: { order: ['id'] },
  sortKey: { order: ['id'] },
  gsPartitionKey: { order: ['_en'] },
  gsSortKey: { order: ['companyId', 'departmentId', 'id'] },
  table: MasterTable,
});
