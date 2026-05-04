import express from "express";
import { addSalaryController, getSalaryController } from "./salary.controller";
import { verifyToken } from "../../middlewares/auth.middleware";
import { verifyRoles } from "../../middlewares/verifyRoles.middleware";

const salaryRouter = express.Router();

salaryRouter.post("/", verifyToken, verifyRoles("admin", "accountant"), addSalaryController);
salaryRouter.get("/",  verifyToken, verifyRoles("admin", "accountant"), getSalaryController);


export default salaryRouter;
