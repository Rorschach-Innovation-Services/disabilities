import { Entity } from 'dynamodb-toolbox';
import { DatabaseTable } from '../utilities/table';
import { v4 } from 'uuid';

export const Question = new Entity({
  name: 'Question',
  table: DatabaseTable,
  timestamps: true,
  attributes: {
    id: { partitionKey: true, type: 'string', default: v4() },
    // sk: {
    //   hidden: true,
    //   sortKey: true,
    //   default: (data: { id: string }) => data.id,
    // },
    content: { type: 'string', required: true },
    response: { type: 'string' },
  },
});
