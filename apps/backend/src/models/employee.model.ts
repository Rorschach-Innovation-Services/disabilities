import { Entity } from 'dynamodb-toolbox';
import { DatabaseTable } from '../utilities/table';
import { v4 } from 'uuid';

export const Employee = new Entity({
  name: 'Employee',
  table: DatabaseTable,
  timestamps: true,
  attributes: {
    id: { sortKey: true, type: 'string', default: v4() },
    name: { type: 'string', required: true },
    age: { type: 'number' },
    gender: { type: 'string' },
    email: { type: 'string', required: true },
    phone: { type: 'string' },
    companyId: { partitionKey: true, type: 'string' },
    id_number: { type: 'string' },
    assessment: { type: 'string' },
    department: { type: 'string', required: true },
    deleted: { type: 'boolean', default: false },
  },
});
