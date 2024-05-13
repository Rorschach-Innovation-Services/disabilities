import { Entity } from 'dynamodb-toolbox';
import { DatabaseTable } from '../utilities/table';
import { v4 } from 'uuid';

export const Questionnaire = new Entity({
  name: 'Questionnaire',
  table: DatabaseTable,
  timestamps: true,
  attributes: {
    id: { partitionKey: true, type: 'string', default: v4() },
    // sk: {
    //   hidden: true,
    //   sortKey: true,
    //   default: (data: { id: string }) => data.id,
    // },
    name: { type: 'string', required: true },
    creator: { type: 'string', required: true },
    date: { type: 'string' },
    questionnaire: {
      type: 'list',
      required: true,
      itemType: 'map',
      mapAttributes: {
        id: { type: 'string', required: true },
        content: { type: 'string', required: true },
        response: { type: 'string' },
      },
    },
  },
});

