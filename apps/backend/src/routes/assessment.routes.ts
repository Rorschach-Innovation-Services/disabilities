/**
 * Assessment Routes
 */
import { Router } from "express";
import { getAssessment, getAssessments } from "../controllers/assessment/assessment.controller";
import saveAssessment from "../controllers/assessment/saveassessment.controller";
import averages from "../controllers/assessment/averages.controllers";
import { verifyToken } from "../middleware/JWT.middleware";
import { checkRole } from "../middleware/roles.middleware";
import { getClientFiles } from "../controllers/assessment/clientfiles.controller";
import { getClientAssessments } from "../controllers/assessment/clientassessments.controller";
import { deleteAssessments } from "../controllers/assessment/deleteassements.controller";
import sendLink from "../controllers/assessment/send-link";
import { createGroupReport } from "../controllers/department/groupreport.controller";

const router = Router();

router
  .get("/", verifyToken, checkRole, getAssessments)
  .post("/get-assessment", verifyToken, checkRole, getAssessment)
  .post("/save", saveAssessment)
  .get("/client-files", verifyToken, getClientFiles)
  .get(
    "/client-assessments/:companyID",
    verifyToken,
    checkRole,
    getClientAssessments
  )
  .get("/averages", verifyToken, checkRole, averages)
  .delete("/", verifyToken, checkRole, deleteAssessments)
  .post("/send-link", verifyToken, sendLink);

export default router;
