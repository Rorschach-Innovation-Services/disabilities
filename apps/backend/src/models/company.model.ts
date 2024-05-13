import { Entity } from 'dynamodb-toolbox';
import { DatabaseTable } from '../utilities/table';
import { v4 } from 'uuid';

export const Company = new Entity({
  name: 'Company',
  table: DatabaseTable,
  timestamps: true,
  attributes: {
    all: {
      partitionKey: true,
      type: 'string',
      default: 'companies',
      hidden: true,
    },
    id: { sortKey: true, type: 'string', default: v4() },
    name: { type: 'string', required: true },
    employees: { type: 'list', itemType: 'string' },
    employeeSize: { type: 'number' },
    sector: { type: 'string', required: true },
    hrConsultantName: { type: 'string', required: true },
    hrConsultantEmail: { type: 'string', required: true },
    phone: { type: 'string' },
    logo: { type: 'string' },
    adminId: { type: 'string', required: true },
    adminEmail: { type: 'string', required: true },
    deleted: { type: 'boolean', default: false },
    status: { type: 'string' },
    departments: { type: 'list', itemType: 'string' },
  },
});
