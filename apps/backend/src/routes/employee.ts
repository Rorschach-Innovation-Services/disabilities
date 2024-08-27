/**
 * Employee Routes
 */
import { Router } from 'express';
import { saveEmployee } from '../controllers/employee/employee';
import { getEmployee } from '../controllers/employee/getemployee';
import { updateEmployee } from '../controllers/employee/updateemployee';
import { deleteEmployees } from '../controllers/employee/deleteemployees';
import { createIndividualReport } from '../controllers/employee/report';
import { verifyToken } from '../middleware/JWT';
import { checkRole } from '../middleware/roles';

const router = Router();

router
  .post('/register', saveEmployee)
  .get('/:id', verifyToken, checkRole, getEmployee)
  .get(
    '/individual-report/:employeeId',
    verifyToken,
    checkRole,
    createIndividualReport,
  )
  .post('/delete', verifyToken, checkRole, deleteEmployees)
  .post('/:id', verifyToken, checkRole, updateEmployee);

export default router;
