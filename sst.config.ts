/// <reference path="./.sst/platform/config.d.ts" />

import { adminRoutes } from './stacks/routes/admin';
import { assessmentRoutes } from './stacks/routes/assessment';
import { companyRoutes } from './stacks/routes/company';
import { departmentRoutes } from './stacks/routes/department';
import { employeeRoutes } from './stacks/routes/employee';
import { questionRoutes } from './stacks/routes/questions';
import { taskRoutes } from './stacks/routes/tasks';

export default $config({
  app(input) {
    return {
      name: 'inclusivity',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
      providers: {
        aws: {
          region: 'us-east-1',
          profile: 'inclusivity-admin',
        },
      },
    };
  },
  async run() {
    // const email = new sst.aws.Email('FootballnurseEmail', {
    //   sender: 'info@footballnurse.com',
    // });

    const bucket = new sst.aws.Bucket('InclusivityBucket');
    const site = new sst.aws.StaticSite('InclusivitySite', {
      path: 'apps/frontend',
      build: {
        command: 'yarn run build',
        output: 'dist',
      },
    });
    const table = new sst.aws.Dynamo('InclusivityTable', {
      fields: {
        pk: 'string',
        sk: 'string',
        gspk: 'string',
        gssk: 'string',
      },
      primaryIndex: { hashKey: 'pk', rangeKey: 'sk' },
      globalIndexes: {
        gsIndex: { hashKey: 'gspk', rangeKey: 'gssk' },
      },
    });

    const api = new sst.aws.ApiGatewayV2('InclusivityAPI');

    adminRoutes({ api, table, bucket });
    assessmentRoutes({ api, table, bucket });
    companyRoutes({ api, table, bucket });
    departmentRoutes({ api, table, bucket });
    employeeRoutes({ api, table, bucket });
    questionRoutes({ api, table, bucket });
    taskRoutes({ api, table, bucket });

    const router = new sst.aws.Router('InclusivityRouter', {
      routes: {
        '/*': site.url,
        '/api/*': api.url,
      },
    });
    return {
      siteUrl: site.url,
      apiEndpoint: api.url,
      distributionUrl: router.url,
    };
  },
});
