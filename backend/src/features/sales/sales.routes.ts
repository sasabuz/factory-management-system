import express from 'express';
import { addSalesController, deleteSalesController, getAllSalesController } from './sales.controller';
import { verifyToken } from '../../middlewares/auth.middleware';
import { verifyRoles } from '../../middlewares/verifyRoles.middleware';

const salesRouter = express.Router();


salesRouter.get('/',  verifyToken, verifyRoles("admin", "manager"), getAllSalesController);
salesRouter.post('/add', verifyToken, verifyRoles("admin", "manager"), addSalesController);
salesRouter.delete('/:id', verifyToken, verifyRoles("admin", "manager"), deleteSalesController);


export default salesRouter;