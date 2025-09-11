/**
 * Admin Routes
 */
import { Router } from 'express';
import { register, signIn, resetPassword } from '../controllers/admin';
import { sendResetLink } from '../controllers/admin/send-reset-password-link';
import { getAdmins } from '../controllers/admin/get-admins';
import { verifyToken } from '../middleware/JWT';
import { checkRole, requireRole, requireSelfOrAdmin, requireSelfOrAdminOrManager } from '../middleware/roles';
import { getClients } from '../controllers/admin/clients';
import { getAdmin } from '../controllers/admin/get-admin';
import { updateProfile } from '../controllers/admin/update-profile';
import { updatePassword } from '../controllers/admin/update-password';
import { deleteAdmin } from '../controllers/admin/delete-admin';
import { updatePhoto } from '../controllers/admin/upload-photo';
import { updateEmail } from '../controllers/admin/update-emails';

const router = Router();

router
  .get('/all', verifyToken, checkRole, requireRole(['administrator', 'admin', 'pivot', 'client_super']), getAdmins)
  .get('/:id', verifyToken, checkRole, requireSelfOrAdminOrManager, getAdmin)
  .post('/update-profile/:id', verifyToken, checkRole, requireSelfOrAdminOrManager, updateProfile)
  .post('/update-password/:id', verifyToken, checkRole, requireSelfOrAdmin, updatePassword)
  .delete('/delete-account/:id', verifyToken, checkRole, requireRole(['administrator', 'admin']), deleteAdmin)
  // Registration (secured): Admin, Pivot and Client Super may create as per controller rules
  .post('/register', verifyToken, checkRole, requireRole(['administrator', 'admin', 'pivot', 'client_super']), register)
  .post('/signin', signIn)
  .post('/:id/reset-password', resetPassword)
  .post('/forgot-password', sendResetLink)
  // Admin-only clients listing
  .get('/:id/clients', verifyToken, checkRole, requireRole(['administrator', 'admin']), getClients)
  .post('/:id/upload-photo', verifyToken, checkRole, requireRole(['administrator', 'admin']), updatePhoto)
  .post('/:id/update-emails', verifyToken, checkRole, requireRole(['administrator', 'admin']), updateEmail);

export default router;
