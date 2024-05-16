import {
  CreateTableCommand,
  ScalarAttributeType,
  KeyType,
  CreateTableInput,
} from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export const createTable = (client: DynamoDBDocumentClient) => {
  const params: CreateTableInput = {
    TableName: process.env.TABLE_NAME as string,
    KeySchema: [
      { AttributeName: 'pk', KeyType: KeyType.HASH },
      { AttributeName: 'sk', KeyType: KeyType.RANGE },
    ],
    AttributeDefinitions: [
      { AttributeName: 'pk', AttributeType: ScalarAttributeType.S },
      { AttributeName: 'sk', AttributeType: ScalarAttributeType.S },
      { AttributeName: 'gspk', AttributeType: ScalarAttributeType.S },
      { AttributeName: 'gssk', AttributeType: ScalarAttributeType.S },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'gsIndex',
        KeySchema: [
          { AttributeName: 'gspk', KeyType: KeyType.HASH },
          { AttributeName: 'gssk', KeyType: KeyType.RANGE },
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };

  const command = new CreateTableCommand(params);

  client.send(command).then(
    (data) => {
      console.log(
        'Created table. Table description JSON:',
        JSON.stringify(data, null, 2)
      );
    },
    (err) => {
      console.error(
        'Unable to create table. Error JSON:',
        JSON.stringify(err, null, 2)
      );
    }
  );
};
