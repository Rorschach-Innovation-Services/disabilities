/**
 * Question Routes
 */
import { Router } from 'express';
import { createQuestion, sendQuestions } from '../controllers/assessment/question.controller';
import { verifyToken } from '../middleware/JWT.middleware';
import { checkRole } from '../middleware/roles.middleware';

const router = Router();

router
    .post('/createQuestion', verifyToken, checkRole, createQuestion)
    .get('/', sendQuestions)

export default router;
