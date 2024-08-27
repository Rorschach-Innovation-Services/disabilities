import { RoutesParameters } from './type';

export const departmentRoutes = ({ api, table, bucket }: RoutesParameters) => {
  // api.route('GET /api/departments/spreadsheet/{departmentId}', {
  //   handler:
  //     'apps/backend/src/controllers/department/getspreadsheet.getSpreadsheet',
  //   link: [table, bucket],
  //   environment: {
  //     TABLE_NAME: table.name,
  //     BUCKET_NAME: bucket.name,
  //   },
  // });
  // api.route('GET /api/departments/{departmentId}', {
  //   handler:
  //     'apps/backend/src/controllers/department/getdepartment.getDepartment',
  //   link: [table, bucket],
  //   environment: {
  //     TABLE_NAME: table.name,
  //     BUCKET_NAME: bucket.name,
  //   },
  // });
  // api.route('GET /api/departments/company/{companyId}', {
  //   handler:
  //     'apps/backend/src/controllers/department/company.getCompanyDepartments',
  //   link: [table, bucket],
  //   environment: {
  //     TABLE_NAME: table.name,
  //     BUCKET_NAME: bucket.name,
  //   },
  // });
  // api.route('DELETE /api/departments', {
  //   handler:
  //     'apps/backend/src/controllers/department/deletedepartment.deleteDepartments',
  //   link: [table, bucket],
  //   environment: {
  //     TABLE_NAME: table.name,
  //     BUCKET_NAME: bucket.name,
  //   },
  // });
  // api.route('GET /api/departments/group-report/{departmentId}', {
  //   handler:
  //     'apps/backend/src/controllers/department/groupreport.createGroupReport',
  //   link: [table, bucket],
  //   environment: {
  //     TABLE_NAME: table.name,
  //     BUCKET_NAME: bucket.name,
  //   },
  // });
};
