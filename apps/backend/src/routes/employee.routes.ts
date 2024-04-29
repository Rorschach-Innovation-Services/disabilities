/**
 * Employee Routes
 */
import { Router } from "express";
import { saveEmployee } from "../controllers/employee/employee.controllers";
import { getEmployee } from "../controllers/employee/getemployee.controller";
import { updateEmployee } from "../controllers/employee/updateemployee.controller";
import {  deleteEmployees} from "../controllers/employee/deleteemployees.controller";
import { createIndividualReport } from "../controllers/employee/report.controller";
import { verifyToken } from "../middleware/JWT.middleware";
import { checkRole } from "../middleware/roles.middleware";

const router = Router();

router
  .post("/register", saveEmployee)
  .get("/:id", verifyToken, checkRole, getEmployee)
  .get(
    "/individual-report/:employeeId",
    verifyToken,
    checkRole,
    createIndividualReport
  )
  .post("/delete", verifyToken, checkRole, deleteEmployees)
  .post("/:id", verifyToken, checkRole, updateEmployee);

export default router;
