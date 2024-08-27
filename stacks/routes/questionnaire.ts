import { RoutesParameters } from './type';

export const questionnaireRoutes = ({
  api,
  table,
  bucket,
}: RoutesParameters) => {
  // api.route('GET /api/questionnaires', {
  //   handler:
  //     'apps/backend/src/controllers/questionnaire/getQuestionnaires.getQuestionnaires',
  //   link: [table, bucket],
  //   environment: {
  //     TABLE_NAME: table.name,
  //     BUCKET_NAME: bucket.name,
  //   },
  // });
  // api.route('GET /api/questionnaires/send/{departmentId}', {
  //   handler:
  //     'apps/backend/src/controllers/questionnaire/send.sendQuestionnaire',
  //   link: [table, bucket],
  //   environment: {
  //     TABLE_NAME: table.name,
  //     BUCKET_NAME: bucket.name,
  //   },
  // });
  // api.route('GET /api/questionnaires/{id}', {
  //   handler: 'apps/backend/src/controllers/questionnaire/get.getQuestionnaire',
  //   link: [table, bucket],
  //   environment: {
  //     TABLE_NAME: table.name,
  //     BUCKET_NAME: bucket.name,
  //   },
  // });
  // api.route('POST /api/questionnaires/createQuestionnaire', {
  //   handler:
  //     'apps/backend/src/controllers/questionnaire/create.createQuestionnaire',
  //   link: [table, bucket],
  //   environment: {
  //     TABLE_NAME: table.name,
  //     BUCKET_NAME: bucket.name,
  //   },
  // });
  // api.route('POST /api/questionnaires/updateQuestionnaire', {
  //   handler:
  //     'apps/backend/src/controllers/questionnaire/update.updateQuestionnaire',
  //   link: [table, bucket],
  //   environment: {
  //     TABLE_NAME: table.name,
  //     BUCKET_NAME: bucket.name,
  //   },
  // });
  // api.route('GET /api/questionnaires/deleteQuestionnaire/{id}', {
  //   handler:
  //     'apps/backend/src/controllers/questionnaire/delete.deleteQuestionnaire',
  //   link: [table, bucket],
  //   environment: {
  //     TABLE_NAME: table.name,
  //     BUCKET_NAME: bucket.name,
  //   },
  // });
};
