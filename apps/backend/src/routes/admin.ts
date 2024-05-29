/**
 * Admin Routes
 */
import { Router } from 'express';
import { register, signin, resetpassword } from '../controllers/admin';
import forgotPassword from '../controllers/admin/send-reset-password-link';
import getAdmins from '../controllers/admin/get-admins';
import { verifyToken } from '../middleware/JWT';
import getAdminClients from '../controllers/admin/clients';
import getAdmin from '../controllers/admin/get-admin';
import updateProfile from '../controllers/admin/update-profile';
import updatePassword from '../controllers/admin/update-password';
import deleteAdmin from '../controllers/admin/delete-admin';
import uploadPhoto from '../controllers/admin/upload-photo';
import updateEmailsController from '../controllers/admin/update-emails';

const router = Router();

router
  .get('/all', verifyToken, getAdmins)
  .get('/:id', verifyToken, getAdmin)
  .post('/update-profile/:id', verifyToken, updateProfile)
  .post('/update-password/:id', verifyToken, updatePassword)
  .delete('/delete-account/:id', verifyToken, deleteAdmin)
  .post('/register', register)
  .post('/signin', signin)
  .post('/:id/reset-password', resetpassword)
  .post('/forgot-password', forgotPassword)
  .get('/:id/clients', verifyToken, getAdminClients)
  .post('/:id/upload-photo', verifyToken, uploadPhoto)
  .post('/:id/update-emails', verifyToken, updateEmailsController);

export default router;
