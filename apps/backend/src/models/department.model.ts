import { Entity } from 'dynamodb-toolbox';
import { DatabaseTable } from '../utilities/table';
import { v4 } from 'uuid';

export const Department = new Entity({
  name: 'Department',
  table: DatabaseTable,
  timestamps: true,
  attributes: {
    id: { sortKey: true, type: 'string', default: v4() },
    name: { type: 'string', required: true },
    employees: { type: 'list', itemType: 'string' },
    employeeSize: { type: 'number' },
    companyId: { partitionKey: true, type: 'string' },
    assessments: { type: 'list', itemType: 'string' },
    deleted: { type: 'boolean', default: false },
  },
});
