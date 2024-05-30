import { RoutesParameters } from './type';

export const adminRoutes = ({ api, table, bucket }: RoutesParameters) => {
  api.route('POST /api/admin/register', {
    handler: 'apps/backend/src/controllers/admin/register.register',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('POST /api/admin/signin', {
    handler: 'apps/backend/src/controllers/admin/signin.signIn',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('POST /api/admin/{id}/reset-password', {
    handler: 'apps/backend/src/controllers/admin/resetpassword.resetPassword',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('POST /api/admin/forgot-password', {
    handler:
      'apps/backend/src/controllers/admin/send-reset-password-link.sendResetLink',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('GET /api/admin/{id}/clients', {
    handler: 'apps/backend/src/controllers/admin/clients.getClients',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('GET /api/admin/all', {
    handler: 'apps/backend/src/controllers/admin/get-admins.getAdmins',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });

  api.route('GET /api/admin/{id}', {
    handler: 'apps/backend/src/controllers/admin/get-admin.getAdmin',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('POST /api/admin/update-profile/{id}', {
    handler: 'apps/backend/src/controllers/admin/update-profile.updateProfile',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('POST /api/admin/update-password/{id}', {
    handler:
      'apps/backend/src/controllers/admin/update-password.updatePassword',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('POST /api/admin/{id}/upload-photo', {
    handler: 'apps/backend/src/controllers/admin/upload-photo.updatePhoto',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('POST /api/admin/{id}/update-emails', {
    handler: 'apps/backend/src/controllers/admin/update-emails.updateEmail',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
  api.route('DELETE /api/admin/delete-account/{id}', {
    handler: 'apps/backend/src/controllers/admin/delete-admin.deleteAdmin',
    link: [table, bucket],
    environment: {
      TABLE_NAME: table.name,
      BUCKET_NAME: bucket.name,
    },
  });
};
