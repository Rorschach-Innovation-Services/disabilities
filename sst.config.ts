/// <reference path="./.sst/platform/config.d.ts" />



export default $config({
  app(input) {
    return {
      name: 'inclusivity',
      // removal: input?.stage === 'production' ? 'retain' : 'remove',
      removal: 'retain',
      home: 'aws',
      providers: {
        aws: {
          region: 'us-east-1',
          profile: 'default',
        },
      },
    };
  },
  async run() {

const { adminRoutes } = await import("./stacks/routes/admin");
const { assessmentRoutes } = await import("./stacks/routes/assessment");
const  { companyRoutes } = await import("./stacks/routes/company");
const  { departmentRoutes } = await import("./stacks/routes/department");
const  { employeeRoutes } = await import("./stacks/routes/employee");
const  { questionRoutes } = await import("./stacks/routes/questions");
const  { taskRoutes } = await import("./stacks/routes/tasks");
const  { questionnaireRoutes } = await import("./stacks/routes/questionnaire");
    // const email = new sst.aws.Email('FootballnurseEmail', {
    //   sender: 'info@footballnurse.com',
    // });

    const bucket = new sst.aws.Bucket('InclusivityBucket');
    // const table = new sst.aws.Dynamo('InclusivityTable', {
    //   fields: {
    //     pk: 'string',
    //     sk: 'string',
    //     gspk: 'string',
    //     gssk: 'string',
    //   },
    //   primaryIndex: { hashKey: 'pk', rangeKey: 'sk' },
    //   globalIndexes: {
    //     gsIndex: { hashKey: 'gspk', rangeKey: 'gssk' },
    //   },
    // });
    const tableName = 'InclusivityTableTable';
    const tableARN =
      'arn:aws:dynamodb:us-east-1:471112623249:table/inclusivity-carlton-InclusivityTableTable';
    const table = aws.dynamodb.Table.get(tableName, tableARN);

    const api = new sst.aws.ApiGatewayV2('InclusivityAPI');

    adminRoutes({ api, table, bucket });
    assessmentRoutes({ api, table, bucket });
    companyRoutes({ api, table, bucket });
    departmentRoutes({ api, table, bucket });
    employeeRoutes({ api, table, bucket });
    questionRoutes({ api, table, bucket });
    taskRoutes({ api, table, bucket });
    questionnaireRoutes({ api, table, bucket });

    const site = new sst.aws.StaticSite('InclusivitySite', {
      path: 'apps/frontend',
      build: {
        command: 'yarn run build',
        output: 'dist',
      },
      environment: {
        VITE_API_ENDPOINT: api.url.apply((url) => `${url}/api`),
      },
    });

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
