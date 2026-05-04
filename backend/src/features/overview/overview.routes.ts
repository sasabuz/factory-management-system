import {Router} from 'express'
import { getExpensesController, getPresentEmployeesController, getProductsStockController, getSalaryStatusController, getSalesController, getTotalEmployeesController } from './overview.controller';
import { verifyToken } from '../../middlewares/auth.middleware';

const overviewRouter = Router();

overviewRouter.get('/totalEmployees', verifyToken,  getTotalEmployeesController); 
overviewRouter.get('/totalPresentEmployees/:date', verifyToken, getPresentEmployeesController);
overviewRouter.get('/salaryStatus/:month', verifyToken, getSalaryStatusController);
overviewRouter.get('/productsStock', verifyToken, getProductsStockController);
overviewRouter.get("/getSales", verifyToken, getSalesController);
overviewRouter.get("/expenses", verifyToken, getExpensesController);

export default overviewRouter;