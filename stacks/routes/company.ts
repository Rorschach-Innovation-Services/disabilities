import { RoutesParameters } from './type';

export const companyRoutes = ({ api, table, bucket }: RoutesParameters) => {
  api.route('GET /api/company', {
    handler: 'apps/backend/src/controllers/company/getcompanies.getCompanies',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('GET /api/company/{id}', {
    handler: 'apps/backend/src/controllers/company/get-company.getCompany',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('POST /api/company/register', {
    handler: 'apps/backend/src/controllers/company/savecompany.saveCompany',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('POST /api/company/{id}/update', {
    handler:
      'apps/backend/src/controllers/company/update-company.updateCompany',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('DELETE /api/company', {
    handler:
      'apps/backend/src/controllers/company/deletecompanies.deleteCompaies',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('DELETE /api/company/{id}', {
    handler:
      'apps/backend/src/controllers/company/delete-company.deleteCompany',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
};
