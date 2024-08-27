/**
 * Admin Routes
 */
import { Router } from 'express';
import { register, signIn, resetPassword } from '../controllers/admin';
import { sendResetLink } from '../controllers/admin/send-reset-password-link';
import { getAdmins } from '../controllers/admin/get-admins';
import { verifyToken } from '../middleware/JWT';
import { getClients } from '../controllers/admin/clients';
import { getAdmin } from '../controllers/admin/get-admin';
import { updateProfile } from '../controllers/admin/update-profile';
import { updatePassword } from '../controllers/admin/update-password';
import { deleteAdmin } from '../controllers/admin/delete-admin';
import { updatePhoto } from '../controllers/admin/upload-photo';
import { updateEmail } from '../controllers/admin/update-emails';

const router = Router();

router
  .get('/all', verifyToken, getAdmins)
  .get('/:id', verifyToken, getAdmin)
  .post('/update-profile/:id', verifyToken, updateProfile)
  .post('/update-password/:id', verifyToken, updatePassword)
  .delete('/delete-account/:id', verifyToken, deleteAdmin)
  .post('/register', register)
  .post('/signin', signIn)
  .post('/:id/reset-password', resetPassword)
  .post('/forgot-password', sendResetLink)
  .get('/:id/clients', verifyToken, getClients)
  .post('/:id/upload-photo', verifyToken, updatePhoto)
  .post('/:id/update-emails', verifyToken, updateEmail);

export default router;
