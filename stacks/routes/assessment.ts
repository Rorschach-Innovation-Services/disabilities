import { RoutesParameters } from './type';

export const assessmentRoutes = ({ api, table, bucket }: RoutesParameters) => {
  api.route('GET /api/assessment', {
    handler:
      'apps/backend/src/controllers/assessment/assessment.getAssessments',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('POST /api/assessment/send-link', {
    handler: 'apps/backend/src/controllers/assessment/send-link.sendLink',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('DELETE /api/assessment', {
    handler:
      'apps/backend/src/controllers/assessment/deleteassements.deleteAssessments',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('POST /api/assessment/get-assessment', {
    handler: 'apps/backend/src/controllers/assessment/assessment.getAssessment',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('POST /api/assessment/save', {
    handler:
      'apps/backend/src/controllers/assessment/saveassessment.saveAssessment',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('GET /api/assessment/client-files', {
    handler:
      'apps/backend/src/controllers/assessment/clientfiles.getClientFiles',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('GET /api/assessment/client-assessments/{companyID}', {
    handler:
      'apps/backend/src/controllers/assessment/clientassessments.getClientAssessments',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('GET /api/assessment/averages', {
    handler: 'apps/backend/src/controllers/assessment/averages.getAverages',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
};
