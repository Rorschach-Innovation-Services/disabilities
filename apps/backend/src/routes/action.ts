import { Router } from 'express';
import { verifyToken } from '../middleware/JWT';
import { getActionPlans } from '../controllers/action-plan/get';
import { createActionPlan } from '../controllers/action-plan/create';

const router = Router();

router.get("/All",getActionPlans)
// .get("/all",verifyToken,getActionPlans)
router.post("/create",verifyToken,createActionPlan);

export default router;