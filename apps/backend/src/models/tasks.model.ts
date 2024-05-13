import { Entity } from 'dynamodb-toolbox';
import { DatabaseTable } from '../utilities/table';
import { v4 } from 'uuid';

export const Task = new Entity({
  name: 'Task',
  table: DatabaseTable,
  timestamps: true,
  attributes: {
    id: { sortKey: true, type: 'string', default: v4() },
    title: { type: 'string', required: true },
    adminId: { type: 'string', required: true },
    adminEmail: { partitionKey: true, type: 'string' },
    content: { type: 'string', required: true },
    photo: { type: 'string' },
    complete: { type: 'boolean', default: false },
  },
});

