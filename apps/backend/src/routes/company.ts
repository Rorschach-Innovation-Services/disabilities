/** Company Routes */
import { Router } from 'express';
import { saveCompany, getCompanies } from '../controllers/company';
import { verifyToken } from '../middleware/JWT';
import { checkRole } from '../middleware/roles';
import { deleteCompanies } from '../controllers/company/deletecompanies';
import getCompany from '../controllers/company/get-company';
import { deleteCompany } from '../controllers/company/delete-company';
import updateCompanyController from '../controllers/company/update-company';

const router = Router();

router
  .post('/register', verifyToken, checkRole, saveCompany)
  .get('/', verifyToken, checkRole, getCompanies)
  .get('/:id', verifyToken, checkRole, getCompany)
  .post('/:id/update', verifyToken, checkRole, updateCompanyController)
  .delete('/', verifyToken, checkRole, deleteCompanies)
  .delete('/:id', verifyToken, checkRole, deleteCompany);

export default router;
