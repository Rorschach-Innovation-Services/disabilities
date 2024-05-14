import { Entity } from 'dynamodb-toolbox';
import { DatabaseTable } from '../utilities/table';
import { v4 } from 'uuid';

export const Administrator = new Entity({
  name: 'Administrator',
  table: DatabaseTable,
  timestamps: true,
  attributes: {
    id: { partitionKey: true, type: 'string', default: v4() },
    name: { type: 'string' },
    email: { type: 'string' },
    gspk: {
      hidden: true,
      type: 'string',
      partitionKey: true,
      default: 'administrators',
    },
    gssk: {
      hidden: true,
      type: 'string',
      sortKey: true,
      default: ({ id, email }: { id: string; email: string }) =>
        `${email}#${id}`,
    },
    password: { type: 'string', minLength: 8 },
    photo: 'string',
    location: 'string',
    bio: 'string',
    company: 'string',
    secondaryEmail: 'string',
    role: 'string',
    deleted: { type: 'boolean', default: false },
  },
});

