import { Router } from "express";
import { getAttendanceController, updateAttendanceController } from "./attendance.controller";
import { verifyToken } from "../../middlewares/auth.middleware";
import { verifyRoles } from "../../middlewares/verifyRoles.middleware";

const attendanceRouter = Router();

attendanceRouter.get("/", verifyToken, verifyRoles("admin", "manager"), getAttendanceController);
attendanceRouter.post("/update",verifyToken, verifyRoles("admin", "manager"), updateAttendanceController);

export default attendanceRouter;