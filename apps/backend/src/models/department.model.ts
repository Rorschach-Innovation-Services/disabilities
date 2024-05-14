import { Entity } from 'dynamodb-toolbox';
import { DatabaseTable } from '../utilities/table';
import { v4 } from 'uuid';

export const Department = new Entity({
  name: 'Department',
  table: DatabaseTable,
  timestamps: true,
  attributes: {
    id: { partitionKey: true, type: 'string', default: v4() },
    name: { type: 'string', required: true },
    employeeSize: { type: 'number' },
    companyId: { type: 'string' },
    deleted: { type: 'boolean', default: false },
    gspk: {
      hidden: true,
      type: 'string',
      partitionKey: true,
      default: ({ companyId }: { companyId: string }) => companyId,
    },
    gssk: {
      hidden: true,
      type: 'string',
      sortKey: true,
      default: ({ id }: { id: string }) => id,
    },
  },
});
