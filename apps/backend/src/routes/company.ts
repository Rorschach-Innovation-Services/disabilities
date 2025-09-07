/** Company Routes */
import { Router } from 'express';
import { getCompanies, getCompanyUsers } from '../controllers/company';
import { saveCompany } from '../controllers/company/savecompany';
import { verifyToken } from '../middleware/JWT';
import { checkRole } from '../middleware/roles';
import { deleteCompanies } from '../controllers/company/deletecompanies';
import { getCompany } from '../controllers/company/get-company';
import { deleteCompany } from '../controllers/company/delete-company';
import { updateCompany } from '../controllers/company/update-company';

const router = Router();

router
  .post('/register', verifyToken, checkRole, saveCompany)
  .get('/', verifyToken, checkRole, getCompanies)
  .get('/:id', verifyToken, checkRole, getCompany)
  .get('/:id/users', verifyToken, checkRole, getCompanyUsers)
  .post('/:id/update', verifyToken, checkRole, updateCompany)
  .delete('/', verifyToken, checkRole, deleteCompanies)
  .delete('/:id', verifyToken, checkRole, deleteCompany);

export default router;
