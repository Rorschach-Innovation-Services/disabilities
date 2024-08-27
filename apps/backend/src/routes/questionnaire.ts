/**
 * Questionnaire Routes
 */
import { Router } from 'express';
import { verifyToken } from '../middleware/JWT';
import { getQuestionnaires } from '../controllers/questionnaire/getQuestionnaires';
import { sendQuestionnaire } from '../controllers/questionnaire/send';
import { getQuestionnaire } from '../controllers/questionnaire/get';
import { createQuestionnaire } from '../controllers/questionnaire/create';
import { updateQuestionnaire } from '../controllers/questionnaire/update';
import { deleteQuestionnaire } from '../controllers/questionnaire/delete';

const router = Router();

router
  .get('/', getQuestionnaires)
  .get('/send/:departmentId', verifyToken, sendQuestionnaire)
  .get('/:id', verifyToken, getQuestionnaire)
  .post('/createQuestionnaire', verifyToken, createQuestionnaire)
  .post('/updateQuestionnaire', verifyToken, updateQuestionnaire)
  .post('/deleteQuestionnaire', verifyToken, deleteQuestionnaire);

export default router;
