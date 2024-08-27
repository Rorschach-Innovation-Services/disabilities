/**
 * Task Routes
 */
import { Router } from 'express';
import { verifyToken } from '../middleware/JWT';
import { getTasks } from '../controllers/tasks/get-tasks';
import { saveTask } from '../controllers/tasks/new-task';
import { deleteTask } from '../controllers/tasks/delete-task';
import { completeTask } from '../controllers/tasks/complete-task';
const router = Router();

router
  .get('/', verifyToken, getTasks)
  .post('/create-task', verifyToken, saveTask)
  .post('/:id/delete-task', verifyToken, deleteTask)
  .post('/:id/complete-task', verifyToken, completeTask);

export default router;
