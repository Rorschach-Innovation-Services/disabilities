import { Entity } from 'dynamodb-toolbox';
import { DatabaseTable } from '../utilities/table';
import { v4 } from 'uuid';

export const Question = new Entity({
  name: 'Question',
  table: DatabaseTable,
  timestamps: true,
  attributes: {
    id: { partitionKey: true, type: 'string', default: v4() },
    gspk: {
      hidden: true,
      type: 'string',
      partitionKey: true,
      default: 'questions',
    },
    gssk: {
      hidden: true,
      type: 'string',
      sortKey: true,
      default: ({ id }: { id: string }) => id,
    },
    // sk: {
    //   hidden: true,
    //   sortKey: true,
    //   default: (data: { id: string }) => data.id,
    // },
    content: { type: 'string', required: true },
    response: { type: 'string' },
  },
});
