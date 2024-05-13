import { Table } from 'dynamodb-toolbox';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const marshallOptions = {
  convertEmptyValues: false,
};

const translateConfig = { marshallOptions };

export const DocumentClient = DynamoDBDocumentClient.from(
  new DynamoDBClient(),
  translateConfig
);

// Instantiate a table
export const DatabaseTable = new Table({
  // Specify table name (used by DynamoDB)
  name: process.env.TABLE_NAME as string,

  // Define partition and sort keys
  partitionKey: 'pk',
  sortKey: 'sk',

  // Add the DocumentClient
  DocumentClient,
});
