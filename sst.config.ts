/// <reference path="./.sst/platform/config.d.ts" />

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

    const bucket = new sst.aws.Bucket('FootballnurseBucket');
    const site = new sst.aws.StaticSite('FootballnurseSite', {
      path: 'apps/frontend',
      build: {
        command: 'yarn run build',
        output: 'dist',
      },
    });
    const table = new sst.aws.Dynamo('MyTable', {
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

    const api = new sst.aws.ApiGatewayV2('FootballnurseAPI');

    api.route('GET /admin/all', {
      handler: 'apps/backend/src/controllers/admin/get-admins.handler',
      link: [table, bucket],
      environment: {
        TABLE_NAME: table.name,
        BUCKET_NAME: bucket.name,
      },
    });

    const router = new sst.aws.Router('MyRouter', {
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
