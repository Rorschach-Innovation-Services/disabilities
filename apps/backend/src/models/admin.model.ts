import { Entity } from 'dynamodb-toolbox';
import { DatabaseTable } from '../utilities/table';
import { v4 } from 'uuid';

export const Administrator = new Entity({
  name: 'Administrator',
  table: DatabaseTable,
  timestamps: true,
  attributes: {
    id: { sortKey: true, type: 'string', default: v4() },
    name: { type: 'string' },
    email: { partitionKey: true, type: 'string' },
    password: { type: 'string', required: 'always', minLength: 8 },
    photo: 'string',
    location: 'string',
    bio: 'string',
    company: 'string',
    secondaryEmail: 'string',
    role: 'string',
    deleted: { type: 'boolean' },
  },
});

