/**
 * Admin Routes
 */
import { Router } from 'express';
import { register, signIn, resetPassword } from '../controllers/admin';
import { sendResetLink } from '../controllers/admin/send-reset-password-link';
import { getAdmins } from '../controllers/admin/get-admins';
import { verifyToken } from '../middleware/JWT';
import { checkRole, requireRole, requireSelfOrAdmin } from '../middleware/roles';
import { getClients } from '../controllers/admin/clients';
import { getAdmin } from '../controllers/admin/get-admin';
import { updateProfile } from '../controllers/admin/update-profile';
import { updatePassword } from '../controllers/admin/update-password';
import { deleteAdmin } from '../controllers/admin/delete-admin';
import { updatePhoto } from '../controllers/admin/upload-photo';
import { updateEmail } from '../controllers/admin/update-emails';

const router = Router();

router
  .get('/all', verifyToken, checkRole, requireRole(['administrator', 'admin']), getAdmins)
  .get('/:id', verifyToken, checkRole, requireSelfOrAdmin, getAdmin)
  .post('/update-profile/:id', verifyToken, checkRole, requireSelfOrAdmin, updateProfile)
  .post('/update-password/:id', verifyToken, checkRole, requireSelfOrAdmin, updatePassword)
  .delete('/delete-account/:id', verifyToken, checkRole, requireRole(['administrator', 'admin']), deleteAdmin)
  // Public or pre-auth endpoints
  .post('/register', register)
  .post('/signin', signIn)
  .post('/:id/reset-password', resetPassword)
  .post('/forgot-password', sendResetLink)
  // Admin-only clients listing
  .get('/:id/clients', verifyToken, checkRole, requireRole(['administrator', 'admin']), getClients)
  .post('/:id/upload-photo', verifyToken, checkRole, requireRole(['administrator', 'admin']), updatePhoto)
  .post('/:id/update-emails', verifyToken, checkRole, requireRole(['administrator', 'admin']), updateEmail);

export default router;
