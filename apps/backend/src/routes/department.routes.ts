/**
 * Assessment Routes
 */
import { Router } from "express";
import { verifyToken } from "../middleware/JWT.middleware";
import { checkRole } from "../middleware/roles.middleware";
import { createGroupReport } from "../controllers/department/groupreport.controller";
import { getSpreadsheet } from "../controllers/department/getspreadsheet.controller";
import { deleteDepartments } from "../controllers/department/deletedepartment.controller";
import { getDepartment } from "../controllers/department/getdepartment.controller";

const router = Router();

router
  .get("/spreadsheet/:departmentId", verifyToken, checkRole, getSpreadsheet)
  .get("/:departmentId", verifyToken, checkRole, getDepartment)
  .delete("/", verifyToken, checkRole, deleteDepartments)
  // .get("/group-report/:companyID", createGroupReport); // For testing purposes
  .get(
    "/group-report/:departmentId",
    verifyToken,
    checkRole,
    createGroupReport
  );

export default router;
