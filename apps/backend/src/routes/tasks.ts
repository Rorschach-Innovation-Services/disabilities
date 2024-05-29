/**
 * Task Routes
 */
import { Router } from 'express';
import { verifyToken } from '../middleware/JWT';
import tasks from '../controllers/tasks/get-tasks';
import createTask from '../controllers/tasks/new-task';
import deleteTask from '../controllers/tasks/delete-task';
import completeTask from '../controllers/tasks/complete-task';
const router = Router();

router
  .get('/', verifyToken, tasks)
  .post('/create-task', verifyToken, createTask)
  .post('/:id/delete-task', verifyToken, deleteTask)
  .post('/:id/complete-task', verifyToken, completeTask);

export default router;
