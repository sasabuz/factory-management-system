import express from 'express';
import { addExpenseController, deleteExpenseController, getExpensesController } from './expense.controller';
import { verifyToken } from '../../middlewares/auth.middleware';
import { verifyRoles } from '../../middlewares/verifyRoles.middleware';


export const expenseRouter = express.Router();

expenseRouter.post('/',verifyToken, verifyRoles("admin", "accountant"), addExpenseController);
expenseRouter.get('/',verifyToken, verifyRoles("admin", "accountant"), getExpensesController);
expenseRouter.delete('/:id',verifyToken, verifyRoles("admin", "accountant"), deleteExpenseController);
