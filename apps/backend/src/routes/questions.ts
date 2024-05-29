/**
 * Question Routes
 */
import { Router } from 'express';
import {
  createQuestion,
  sendQuestions,
} from '../controllers/assessment/question';
import { verifyToken } from '../middleware/JWT';
import { checkRole } from '../middleware/roles';

const router = Router();

router
  .post('/createQuestion', verifyToken, checkRole, createQuestion)
  .get('/', sendQuestions);

export default router;
