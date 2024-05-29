import {
  NextjsSite,
  StackContext,
  Bucket,
  Table,
  StaticSite,
  Function,
} from 'sst/constructs';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { v4 } from 'uuid';

export function Inclusivity({ stack }: StackContext) {
  const bucket = new Bucket(stack, 'Media', {
    cors: [
      {
        maxAge: '1 day',
        allowedOrigins: ['*'],
        allowedHeaders: ['*'],
        allowedMethods: ['GET', 'PUT', 'POST'],
      },
    ],
  });

  const masterTable = new Table(stack, 'MasterTable', {
    fields: {
      pk: 'string',
      sk: 'string',
      gspk: 'string',
      gssk: 'string',
    },
    primaryIndex: { partitionKey: 'pk', sortKey: 'sk' },
    globalIndexes: {
      gsIndex: { partitionKey: 'gspk', sortKey: 'gssk' },
    },
  });

  const site = new StaticSite(stack, 'react', {
    path: 'path/to/site',
    buildOutput: 'dist',
    buildCommand: 'npm run build',
    environment: {
      // Pass in the API endpoint to our app
      VITE_APP_API_URL: api.url,
    },
  });

  // Create a Next.js site
  const site = new StaticSite(stack, 'Site', {
    path: 'web',
    environment: {
      REGION: stack.region,
      // MASTER_TABLE_NAME: masterTable.tableName,
      // MASTER_TABLE_NAME: "carlton-medicoach-master",
      MASTER_TABLE_NAME: 'MedicoachProductionTable',
      BUCKET_NAME: bucket.bucketName,
      EMAIL: 'info@medicoach.co.za',
      SECRET: v4(),
      STAGE: stack.stage,
      QUEUE_URL:
        'https://sqs.af-south-1.amazonaws.com/433453514361/MedicoachPDFQueue',
    },
  });

  // Allow the Next.js API to access the tables
  // site.attachPermissions([masterTable]);

  // Show the site URL in the output
  stack.addOutputs({
    URL: site.url,
  });
}
