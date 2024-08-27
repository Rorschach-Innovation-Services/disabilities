import { RoutesParameters } from './type';

export const taskRoutes = ({ api, table, bucket }: RoutesParameters) => {
  // api.route('GET /api/tasks', {
  //   handler: 'apps/backend/src/controllers/tasks/get-tasks.getTasks',
  //   link: [table, bucket],
  //   environment: {
  //     TABLE_NAME: table.name,
  //     BUCKET_NAME: bucket.name,
  //   },
  // });
  // api.route('POST /api/tasks/create-task', {
  //   handler: 'apps/backend/src/controllers/tasks/new-task.saveTask',
  //   link: [table, bucket],
  //   environment: {
  //     TABLE_NAME: table.name,
  //     BUCKET_NAME: bucket.name,
  //   },
  // });
  // api.route('POST /api/tasks/{id}/delete-task', {
  //   handler: 'apps/backend/src/controllers/tasks/delete-task.deleteTask',
  //   link: [table, bucket],
  //   environment: {
  //     TABLE_NAME: table.name,
  //     BUCKET_NAME: bucket.name,
  //   },
  // });
  // api.route('POST /api/tasks/{id}/complete-task', {
  //   handler: 'apps/backend/src/controllers/tasks/complete-task.completeTask',
  //   link: [table, bucket],
  //   environment: {
  //     TABLE_NAME: table.name,
  //     BUCKET_NAME: bucket.name,
  //   },
  // });
};
