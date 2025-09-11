/**
 * Assessment Routes
 */
import { Router } from 'express';
import {
  getAssessment,
  getAssessments,
  getDepartmentAssessments,
} from '../controllers/assessment/assessment';
import { saveAssessment } from '../controllers/assessment/saveassessment';
import { getAverages } from '../controllers/assessment/averages';
import { verifyToken } from '../middleware/JWT';
import { checkRole } from '../middleware/roles';
import { getClientFiles } from '../controllers/assessment/clientfiles';
import { getClientAssessments } from '../controllers/assessment/clientassessments';
import { deleteAssessments } from '../controllers/assessment/deleteassements';
import { sendLink } from '../controllers/assessment/send-link';
import { createGroupReport } from '../controllers/department/groupreport';

const router = Router();

router
  .get('/', verifyToken, checkRole, getAssessments)
  .get('/departments/:departmentId', verifyToken, checkRole, getDepartmentAssessments)
  .post('/get-assessment', verifyToken, checkRole, getAssessment)
  .post('/save', saveAssessment)
  .get('/client-files', verifyToken, checkRole, getClientFiles)
  .get(
    '/client-assessments/:companyID',
    verifyToken,
    checkRole,
    getClientAssessments,
  )
  .get('/averages', verifyToken, checkRole, getAverages)
  .delete('/', verifyToken, checkRole, deleteAssessments)
  .post('/send-link', verifyToken, checkRole, sendLink);

export default router;
