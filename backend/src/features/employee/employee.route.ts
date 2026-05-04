import express from 'express';
import {
  getAllEmployeeController,
  getSingleEmployeeController,
  deleteEmployeeController,
  updateEmployeeController,
} from './employee.controller';
import { verifyToken } from '../../middlewares/auth.middleware';
import { verifyRoles } from '../../middlewares/verifyRoles.middleware';

const router = express.Router();

router.get('/', verifyToken, verifyRoles("admin", "manager"), getAllEmployeeController);
router.get('/:id', verifyToken, verifyRoles("admin", "manager"), getSingleEmployeeController);
router.delete('/:id',verifyToken, verifyRoles("admin", "manager"), deleteEmployeeController);
router.put('/:id',verifyToken, verifyRoles("admin", "manager"), updateEmployeeController);

export default router;
