import { RoutesParameters } from './type';

export const departmentRoutes = ({ api, table, bucket }: RoutesParameters) => {
  api.route('GET /api/department/spreadsheet/{departmentId}', {
    handler:
      'apps/backend/src/controllers/department/getspreadsheet.getSpreadsheet',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('GET /api/department/{departmentId}', {
    handler:
      'apps/backend/src/controllers/department/getdepartment.getDepartment',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('DELETE /api/department', {
    handler:
      'apps/backend/src/controllers/department/deletedepartment.deleteDepartments',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('GET /api/department/group-report/{departmentId}', {
    handler:
      'apps/backend/src/controllers/department/groupreport.createGroupReport',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
};
