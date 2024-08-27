import { RoutesParameters } from './type';

export const questionRoutes = ({ api, table, bucket }: RoutesParameters) => {
  // api.route('GET /api/question', {
  //   handler: 'apps/backend/src/controllers/assessment/question.sendQuestions',
  //   link: [table, bucket],
  //   environment: {
  //     TABLE_NAME: table.name,
  //     BUCKET_NAME: bucket.name,
  //   },
  // });
  // api.route('POST /api/question/createQuestion', {
  //   handler: 'apps/backend/src/controllers/assessment/question.createQuestion',
  //   link: [table, bucket],
  //   environment: {
  //     TABLE_NAME: table.name,
  //     BUCKET_NAME: bucket.name,
  //   },
  // });
};
