import { RoutesParameters } from './type';

export const assessmentRoutes = ({ api, table, bucket }: RoutesParameters) => {
  api.route('GET /api/assessments', {
    handler:
      'apps/backend/src/controllers/assessment/assessment.getAssessments',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('GET /api/assessments/departments/{departmentId}', {
    handler:
      'apps/backend/src/controllers/assessment/assessment.getDepartmentAssessments',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('POST /api/assessments/send-link', {
    handler: 'apps/backend/src/controllers/assessment/send-link.sendLink',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('DELETE /api/assessments', {
    handler:
      'apps/backend/src/controllers/assessment/deleteassements.deleteAssessments',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('POST /api/assessments/get-assessment', {
    handler: 'apps/backend/src/controllers/assessment/assessment.getAssessment',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('POST /api/assessments/save', {
    handler:
      'apps/backend/src/controllers/assessment/saveassessment.saveAssessment',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('GET /api/assessments/client-files', {
    handler:
      'apps/backend/src/controllers/assessment/clientfiles.getClientFiles',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('GET /api/assessments/client-assessments/{companyID}', {
    handler:
      'apps/backend/src/controllers/assessment/clientassessments.getClientAssessments',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('GET /api/assessments/averages', {
    handler: 'apps/backend/src/controllers/assessment/averages.getAverages',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
};
