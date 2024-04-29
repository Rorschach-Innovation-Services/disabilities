/** Company Routes */
import { Router } from "express";
import { saveCompany, getCompanies } from "../controllers/company";
import { verifyToken } from "../middleware/JWT.middleware";
import { checkRole } from "../middleware/roles.middleware";
import { deleteCompanies } from "../controllers/company/deletecompanies.controller";
import getCompany from "../controllers/company/get-company.controller";
import { deleteCompany } from "../controllers/company/delete-company.controller";
import updateCompanyController from "../controllers/company/update-company.controller";

const router = Router();

router
  .post("/register", verifyToken, checkRole, saveCompany)
  .get("/", verifyToken, checkRole, getCompanies)
  .get("/:id", verifyToken, checkRole, getCompany)
  .post("/:id/update", verifyToken, checkRole, updateCompanyController)
  .delete("/", verifyToken, checkRole, deleteCompanies)
  .delete("/:id", verifyToken, checkRole, deleteCompany)

export default router;
