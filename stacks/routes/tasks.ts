import { RoutesParameters } from './type';

export const taskRoutes = ({ api, table, bucket }: RoutesParameters) => {
  api.route('GET /api/task', {
    handler: 'apps/backend/src/controllers/task/get-tasks.getTasks',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('POST /api/task/create-task', {
    handler: 'apps/backend/src/controllers/task/new-task.saveTask',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('POST /api/task/{id}/delete-task', {
    handler: 'apps/backend/src/controllers/task/delete-task.deleteTask',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('POST /api/task/{id}/complete-task', {
    handler: 'apps/backend/src/controllers/task/complete-task.completeTask',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
};
