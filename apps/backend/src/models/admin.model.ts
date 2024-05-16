import { Entity, MasterTable, EntityNames } from '@repo/db-wrapper';

export type AdministratorAttributes = {
  id: string;
  name: string;
  email: string;
  password: string;
  photo: string;
  location: string;
  bio: string;
  companyId: string;
  secondaryEmail: string;
  role: string;
  deleted: boolean;
  created: number;
  modified: number;
  _en?: EntityNames;
};

export const Administrator = new Entity<
  AdministratorAttributes,
  { id: string },
  { id: string },
  { _en?: EntityNames },
  { email: string; id: string }
>({
  name: 'administrator',
  partitionKey: { order: ['id'] },
  sortKey: { order: ['id'] },
  gsPartitionKey: { order: ['_en'] },
  gsSortKey: { order: ['email', 'id'] },
  table: MasterTable,
});
