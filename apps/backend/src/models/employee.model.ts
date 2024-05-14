import { Entity } from 'dynamodb-toolbox';
import { DatabaseTable } from '../utilities/table';
import { v4 } from 'uuid';

export const Employee = new Entity({
  name: 'Employee',
  table: DatabaseTable,
  timestamps: true,
  attributes: {
    id: { partitionKey: true, type: 'string', default: v4() },
    name: { type: 'string', required: true },
    gspk: {
      hidden: true,
      type: 'string',
      partitionKey: true,
      default: 'employees',
    },
    gssk: {
      hidden: true,
      type: 'string',
      sortKey: true,
      default: ({
        id,
        companyId,
        departmentId,
      }: {
        id: string;
        companyId: string;
        departmentId: string;
      }) => `${companyId}#${departmentId}#${id}`,
    },
    age: { type: 'number' },
    gender: { type: 'string' },
    email: { type: 'string', required: true },
    phone: { type: 'string' },
    companyId: { type: 'string' },
    id_number: { type: 'string' },
    assessment: { type: 'string' },
    departmentId: { type: 'string', required: true },
    deleted: { type: 'boolean', default: false },
  },
});
