import { Entity, MasterTable, EntityNames } from '@repo/db-wrapper';

export type CompanyAttributes = {
  id: string;
  name: string;
  employeeSize: number;
  sector: string;
  hrConsultantName: string;
  hrConsultantEmail: string;
  phone: string;
  logo: string;
  adminId: string;
  adminEmail: string;
  deleted: boolean;
  status: string;
  created: number;
  modified: number;
  _en?: EntityNames;
};

export const Company = new Entity<
  CompanyAttributes,
  { id: string },
  { id: string },
  { _en?: EntityNames },
  { id: string }
>({
  name: 'company',
  partitionKey: { order: ['id'] },
  sortKey: { order: ['id'] },
  gsPartitionKey: { order: ['_en'] },
  gsSortKey: { order: ['id'] },
  table: MasterTable,
});
