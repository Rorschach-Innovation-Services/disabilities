/**
 * Task Routes
 */
import { Router } from 'express';
import { verifyToken } from '../middleware/JWT.middleware';
import tasks from "../controllers/tasks/get-tasks.controller";
import createTask from "../controllers/tasks/new-task.controller";
import deleteTask from "../controllers/tasks/delete-task.controller";
import completeTask from "../controllers/tasks/complete-task.controller";
const router = Router();

router
    .get('/', verifyToken, tasks)
    .post('/create-task', verifyToken, createTask)
    .post("/:id/delete-task", verifyToken, deleteTask)
    .post("/:id/complete-task", verifyToken, completeTask)

export default router;