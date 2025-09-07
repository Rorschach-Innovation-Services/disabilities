/** Media Routes */
import { Router } from 'express';
import { verifyToken } from '../middleware/JWT';
import { checkRole, requireRole } from '../middleware/roles';
import { companyLogoUploadUrl, companyLogoGetUrl } from '../controllers/media/presign';

const router = Router();

router
  .post(
    '/company-logo-upload-url',
    verifyToken,
    checkRole,
    requireRole(['administrator', 'admin', 'pivot', 'client_super', 'client_user']),
    companyLogoUploadUrl,
  )
  .get(
    '/company-logo-get-url',
    verifyToken,
    checkRole,
    requireRole(['administrator', 'admin', 'pivot', 'client_super', 'client_user']),
    companyLogoGetUrl,
  );

export default router;

