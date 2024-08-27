import { RoutesParameters } from './type';

export const employeeRoutes = ({ api, table, bucket }: RoutesParameters) => {
  // api.route('GET /api/employees/{id}', {
  //   handler: 'apps/backend/src/controllers/employee/getemployee.getEmployee',
  //   link: [table, bucket],
  //   environment: {
  //     TABLE_NAME: table.name,
  //     BUCKET_NAME: bucket.name,
  //   },
  // });
  // api.route('POST /api/employees/{id}', {
  //   handler:
  //     'apps/backend/src/controllers/employee/updateemployee.updateEmployee',
  //   link: [table, bucket],
  //   environment: {
  //     TABLE_NAME: table.name,
  //     BUCKET_NAME: bucket.name,
  //   },
  // });
  // api.route('GET /api/employees/register', {
  //   handler: 'apps/backend/src/controllers/employee/employee.saveEmployee',
  //   link: [table, bucket],
  //   environment: {
  //     TABLE_NAME: table.name,
  //     BUCKET_NAME: bucket.name,
  //   },
  // });
  // api.route('POST /api/employees/delete', {
  //   handler:
  //     'apps/backend/src/controllers/employee/deleteemployees.deleteEmployees',
  //   link: [table, bucket],
  //   environment: {
  //     TABLE_NAME: table.name,
  //     BUCKET_NAME: bucket.name,
  //   },
  // });
  // api.route('GET /api/employees/individual-report/{employeeId}', {
  //   handler:
  //     'apps/backend/src/controllers/employee/report.createIndividualReport',
  //   link: [table, bucket],
  //   environment: {
  //     TABLE_NAME: table.name,
  //     BUCKET_NAME: bucket.name,
  //   },
  // });
};
