/**
 * Assessment Routes
 */
import { Router } from 'express';
import { verifyToken } from '../middleware/JWT';
import { checkRole } from '../middleware/roles';
import { createGroupReport } from '../controllers/department/groupreport';
import { getSpreadsheet } from '../controllers/department/getspreadsheet';
import { deleteDepartments } from '../controllers/department/deletedepartment';
import { getDepartment } from '../controllers/department/getdepartment';

const router = Router();

router
  .get('/spreadsheet/:departmentId', verifyToken, checkRole, getSpreadsheet)
  .get('/:departmentId', verifyToken, checkRole, getDepartment)
  .get('/company/:companyId', verifyToken, checkRole, getDepartment)
  .delete('/', verifyToken, checkRole, deleteDepartments)
  // .get("/group-report/:companyID", createGroupReport); // For testing purposes
  .get(
    '/group-report/:departmentId',
    verifyToken,
    checkRole,
    createGroupReport,
  );

export default router;
