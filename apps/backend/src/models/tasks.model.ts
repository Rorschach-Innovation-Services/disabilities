import { Entity } from 'dynamodb-toolbox';
import { DatabaseTable } from '../utilities/table';
import { v4 } from 'uuid';

export const Task = new Entity({
  name: 'Task',
  table: DatabaseTable,
  timestamps: true,
  attributes: {
    id: { partitionKey: true, type: 'string', default: v4() },
    title: { type: 'string', required: true },
    adminId: { type: 'string', required: true },
    adminEmail: { type: 'string' },
    content: { type: 'string', required: true },
    photo: { type: 'string' },
    complete: { type: 'boolean', default: false },
    deleted: { type: 'boolean', default: false },
    gspk: {
      hidden: true,
      type: 'string',
      partitionKey: true,
      default: 'tasks',
    },
    gssk: {
      hidden: true,
      type: 'string',
      sortKey: true,
      default: ({ id, adminId }: { id: string; adminId: string }) =>
        `${adminId}:${id}`,
    },
  },
});

